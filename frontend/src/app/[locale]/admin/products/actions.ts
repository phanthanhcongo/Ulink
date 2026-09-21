'use server';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, updateItem, createItem, deleteItem, readItems } from '@directus/sdk';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { cookies } from 'next/headers';
import { extractErrorMessage } from '@/lib/api-error';

function formatError(err: any): string {
  if (err && typeof err === 'object') {
    if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
      const firstError = err.errors[0];
      const code = firstError.code || firstError.extensions?.code;
      const field = firstError.extensions?.field || '';
      const message = firstError.message || '';
      
      if (code === 'RECORD_NOT_UNIQUE') {
        if (field.includes('sku_code') || message.includes('sku_code') || message.includes('product_skus')) {
          return 'Mã SKU này đã tồn tại trên hệ thống. Vui lòng nhập một mã SKU khác.';
        }
        if (field.includes('slug') || message.includes('slug')) {
          return 'Đường dẫn (slug) này đã tồn tại. Vui lòng chọn đường dẫn khác.';
        }
        if (field.includes('email') || message.includes('email')) {
          return 'Địa chỉ email này đã tồn tại trên hệ thống.';
        }
        return `Dữ liệu bị trùng lặp ở cột ${field || 'duy nhất'}. Vui lòng kiểm tra lại.`;
      }
      
      if (firstError.message) {
        return firstError.message;
      }
    }
    if (err.message) {
      return err.message;
    }
  }
  return extractErrorMessage(err);
}

/**
 * Helper: Khởi tạo Directus client sử dụng trực tiếp session cookie của
 * người dùng đang đăng nhập. Directus sẽ xác thực và phân quyền theo đúng
 * vai trò thực tế của tài khoản đó (Admin, Editor, Sales...).
 * Fallback về static token Frontend Service nếu không có session.
 */
async function getSessionClient() {
  const store = await cookies();
  const sessionToken = store.get('directus_session_token')?.value;
  const refreshToken = store.get('directus_refresh_token')?.value;

  if (sessionToken) {
    const cookieHeader = [
      `directus_session_token=${sessionToken}`,
      refreshToken ? `directus_refresh_token=${refreshToken}` : null
    ]
      .filter(Boolean)
      .join('; ');

    const cookieFetch: typeof globalThis.fetch = (input, init) => {
      const headers = new Headers(init?.headers);
      headers.set('cookie', cookieHeader);
      return globalThis.fetch(input, { ...init, headers });
    };

    const url = getDirectusUrl();
    return createDirectus<Schema>(url, { globals: { fetch: cookieFetch } }).with(rest());
  }

  return createWriteDirectusClient();
}

/**
 * Verifies that the current user is logged in before executing actions.
 */
async function checkAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized. You must log in first.');
  }
}

/**
 * Action: Update the stock status of a specific SKU.
 */
export async function updateSkuStock(
  skuId: number,
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock'
) {
  await checkAuth();

  try {
    const client = await getSessionClient();
    await client.request(
      updateItem('product_skus', skuId, {
        stock_status: stockStatus
      })
    );

    revalidatePath('/[locale]/products', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to update SKU stock status:', err);
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Delete/Archive a product.
 */
export async function deleteProduct(productId: number) {
  await checkAuth();

  try {
    const client = await getSessionClient();
    // Instead of deleting from DB, we transition status to archived for safety.
    await client.request(
      updateItem('products', productId, {
        status: 'archived'
      })
    );

    revalidatePath('/[locale]/products', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to archive product:', err);
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Save (Create or Update) a Product.
 */
export async function saveProduct(data: {
  id?: number;
  name: string;
  slug: string;
  brand?: string;
  categoryId?: number;
  short_description?: string;
  description?: string;
  specifications?: Record<string, string>;
  status?: 'published' | 'draft' | 'archived';
  assignedAttributeIds?: number[];
  meta_title?: string;
  meta_description?: string;
  hero?: string;
  features?: string[];
  industryIds?: number[];
  standardIds?: number[];
}) {
  await checkAuth();

  try {
    const client = await getSessionClient();
    const payload: Record<string, unknown> = {
      name: data.name,
      slug: data.slug,
      brand: data.brand || null,
      category: data.categoryId || null,
      short_description: data.short_description || null,
      description: data.description ?? null,
      specifications: data.specifications || null,
      status: data.status || 'draft',
      meta_title: data.meta_title ?? null,
      meta_description: data.meta_description ?? null
    };
    if (data.hero !== undefined) payload.hero = data.hero || null;
    if (data.features !== undefined) payload.features = data.features.length > 0 ? data.features : null;

    let productId: number;

    if (data.id) {
      await client.request(updateItem('products', data.id, payload));
      productId = data.id;
    } else {
      const created = await client.request(createItem('products', payload));
      productId = (created as any).id;
    }

    // Sync M2M attribute assignments if provided
    if (data.assignedAttributeIds !== undefined) {
      // 1. Fetch current assignments with attribute slug
      const { readItems } = await import('@directus/sdk');
      const existing = (await client.request(
        readItems(
          'products_product_attributes' as any,
          {
            filter: { products_id: { _eq: productId } },
            fields: ['id', 'product_attributes_id'],
            limit: -1
          } as any
        )
      )) as any[];

      const existingAttrIds = new Set(existing.map((e: any) => e.product_attributes_id));
      const desiredAttrIds = new Set(data.assignedAttributeIds);

      // 2. Check if any attributes being removed are in use by existing SKUs
      const toDelete = existing.filter((e: any) => !desiredAttrIds.has(e.product_attributes_id));

      if (toDelete.length > 0) {
        // Fetch attribute slugs for the ones being removed
        const removedAttrIds = toDelete.map((e: any) => e.product_attributes_id);
        const attrs = (await client.request(
          readItems(
            'product_attributes' as any,
            {
              filter: { id: { _in: removedAttrIds } },
              fields: ['id', 'name', 'slug'],
              limit: -1
            } as any
          )
        )) as any[];
        const attrSlugMap = new Map(attrs.map((a: any) => [a.id, { name: a.name, slug: a.slug }]));

        // Fetch SKUs of this product that have attributes JSON
        const skus = (await client.request(
          readItems(
            'product_skus' as any,
            {
              filter: {
                product: { _eq: productId },
                status: { _in: ['published', 'draft'] }
              },
              fields: ['id', 'sku_code', 'attributes'],
              limit: -1
            } as any
          )
        )) as any[];

        // Check which removed attributes are still referenced in SKU attributes JSON
        const conflicting: string[] = [];
        for (const delItem of toDelete) {
          const attrInfo = attrSlugMap.get(delItem.product_attributes_id);
          if (!attrInfo) continue;

          const inUse = skus.some((sku: any) => {
            if (!sku.attributes || typeof sku.attributes !== 'object') return false;
            return Object.prototype.hasOwnProperty.call(sku.attributes, attrInfo.slug);
          });

          if (inUse) {
            conflicting.push(attrInfo.name);
          }
        }

        if (conflicting.length > 0) {
          return {
            success: false,
            error: `Không thể bỏ thuộc tính "${conflicting.join('", "')}" vì đang được sử dụng bởi các SKU. Hãy xóa các SKU liên quan trước.`
          };
        }

        // Safe to delete — no SKUs reference these attributes
        for (const item of toDelete) {
          await client.request(deleteItem('products_product_attributes' as any, item.id));
        }
      }

      // 3. Create new assignments
      const toCreate = data.assignedAttributeIds.filter((id) => !existingAttrIds.has(id));
      for (const attrId of toCreate) {
        await client.request(
          createItem('products_product_attributes' as any, {
            products_id: productId,
            product_attributes_id: attrId
          })
        );
      }
    }

    // Sync M2M industries
    if (data.industryIds !== undefined) {
      const existingInd = (await client.request(
        readItems('products_industries' as any, {
          filter: { products_id: { _eq: productId } },
          fields: ['id', 'industries_id'],
          limit: -1
        } as any)
      )) as any[];

      const existingIndIds = new Set(existingInd.map((e: any) => e.industries_id));
      const desiredIndIds = new Set(data.industryIds);

      for (const item of existingInd) {
        if (!desiredIndIds.has(item.industries_id)) {
          await client.request(deleteItem('products_industries' as any, item.id));
        }
      }
      for (const indId of data.industryIds) {
        if (!existingIndIds.has(indId)) {
          await client.request(
            createItem('products_industries' as any, {
              products_id: productId,
              industries_id: indId
            })
          );
        }
      }
    }

    // Sync M2M standards
    if (data.standardIds !== undefined) {
      const existingStd = (await client.request(
        readItems('products_standards' as any, {
          filter: { products_id: { _eq: productId } },
          fields: ['id', 'standards_id'],
          limit: -1
        } as any)
      )) as any[];

      const existingStdIds = new Set(existingStd.map((e: any) => e.standards_id));
      const desiredStdIds = new Set(data.standardIds);

      for (const item of existingStd) {
        if (!desiredStdIds.has(item.standards_id)) {
          await client.request(deleteItem('products_standards' as any, item.id));
        }
      }
      for (const stdId of data.standardIds) {
        if (!existingStdIds.has(stdId)) {
          await client.request(
            createItem('products_standards' as any, {
              products_id: productId,
              standards_id: stdId
            })
          );
        }
      }
    }

    revalidatePath('/[locale]/products', 'layout');
    revalidatePath('/[locale]/admin/skus', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to save product:', err);
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Save (Create or Update) a SKU.
 */
export async function saveSku(data: {
  id?: number;
  sku_code: string;
  productId: number;
  unit?: string;
  pack_size?: string;
  price?: number | null;
  attributes?: Record<string, string>;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock';
  status?: 'published' | 'draft' | 'archived';
}) {
  await checkAuth();

  try {
    const client = await getSessionClient();
    const productLookup = (await client.request(
      readItems('products', {
        filter: { id: { _eq: data.productId } },
        fields: ['id', 'slug', 'assigned_attributes.id'],
        limit: 1
      } as any)
    )) as any[];
    const product = productLookup[0];
    const assignedAttributes = Array.isArray(product?.assigned_attributes)
      ? product.assigned_attributes
      : [];

    if (assignedAttributes.length === 0) {
      return {
        success: false,
        error: 'Sản phẩm phải có ít nhất 1 thuộc tính trước khi tạo SKU.'
      };
    }

    const payload = {
      sku_code: data.sku_code,
      product: data.productId,
      unit: data.unit || null,
      pack_size: data.pack_size || null,
      price: data.price || null,
      attributes: data.attributes || null,
      stock_status: data.stock_status || 'in_stock',
      status: data.status || 'published'
    };

    if (data.id) {
      await client.request(updateItem('product_skus', data.id, payload));
    } else {
      await client.request(createItem('product_skus', payload));
    }

    revalidatePath('/[locale]/products', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to save SKU:', err);
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Upload a product image to frontend public folder.
 * Returns the public path (e.g. /images/products/abc123.png).
 */
export async function uploadProductImage(formData: FormData): Promise<{ success: boolean; path?: string; error?: string }> {
  await checkAuth();

  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const { writeFile, mkdir } = await import('fs/promises');
    const nodePath = await import('path');

    const ext = nodePath.extname(file.name) || '.png';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const dir = nodePath.join(process.cwd(), 'public', 'images', 'products');
    await mkdir(dir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(nodePath.join(dir, safeName), buffer);

    return { success: true, path: `/images/products/${safeName}` };
  } catch (err) {
    console.error('Failed to upload product image:', err);
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Delete a product image from frontend public folder.
 */
export async function deleteProductImage(imagePath: string): Promise<{ success: boolean; error?: string }> {
  await checkAuth();

  try {
    if (!imagePath.startsWith('/images/products/')) {
      return { success: true };
    }
    const { unlink } = await import('fs/promises');
    const nodePath = await import('path');
    const fullPath = nodePath.join(process.cwd(), 'public', imagePath);
    await unlink(fullPath).catch(() => {});
    return { success: true };
  } catch (err) {
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Upload a file to Directus and return the file ID.
 */
export async function uploadFileToDirectus(formData: FormData): Promise<{ success: boolean; fileId?: string; error?: string }> {
  await checkAuth();

  try {
    const store = await cookies();
    const sessionToken = store.get('directus_session_token')?.value;
    const refreshToken = store.get('directus_refresh_token')?.value;

    const url = getDirectusUrl();
    const headers: Record<string, string> = {};
    if (sessionToken) {
      headers['cookie'] = `directus_session_token=${sessionToken}${refreshToken ? `; directus_refresh_token=${refreshToken}` : ''}`;
    }

    const res = await globalThis.fetch(`${url}/files`, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.errors?.[0]?.message || `Upload failed: ${res.status}`);
    }

    const result = await res.json();
    return { success: true, fileId: result.data.id };
  } catch (err) {
    console.error('Failed to upload file:', err);
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Update product hero image.
 */
export async function updateProductHero(productId: number, heroFileId: string | null) {
  await checkAuth();
  try {
    const client = await getSessionClient();
    await client.request(updateItem('products', productId, { hero: heroFileId }));
    revalidatePath('/[locale]/products', 'layout');
    return { success: true };
  } catch (err) {
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Add image to product gallery (M2M products_files junction).
 */
export async function addProductGalleryImage(productId: number, fileId: string) {
  await checkAuth();
  try {
    const client = await getSessionClient();
    await client.request(
      createItem('products_files' as any, {
        products_id: productId,
        directus_files_id: fileId
      })
    );
    revalidatePath('/[locale]/products', 'layout');
    return { success: true };
  } catch (err) {
    return { success: false, error: formatError(err) };
  }
}

/**
 * Action: Remove image from product gallery.
 */
export async function removeProductGalleryImage(junctionId: number) {
  await checkAuth();
  try {
    const client = await getSessionClient();
    await client.request(deleteItem('products_files' as any, junctionId));
    revalidatePath('/[locale]/products', 'layout');
    return { success: true };
  } catch (err) {
    return { success: false, error: formatError(err) };
  }
}
