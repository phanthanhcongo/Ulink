'use server';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createWriteDirectusClient, Schema } from '@/lib/directus';
import { createDirectus, rest, updateItem, createItem } from '@directus/sdk';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { cookies } from 'next/headers';
import { extractErrorMessage } from '@/lib/api-error';

/**
 * Helper: Khởi tạo Directus client với session cookie
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
 * Check if the user is authenticated
 */
async function checkAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized. You must log in first.');
  }
}

/**
 * Action: Save (Create or Update) a Blog Post (Article).
 */
export async function saveArticle(data: {
  id?: number;
  title: string;
  description?: string;
  slug: string;
  body?: string;
  cover?: string | null;
  author?: string;
  author_role?: string;
  author_avatar?: string | null;
  category?: string;
  published_at?: string | null;
  status?: 'published' | 'draft' | 'archived';
  is_featured?: boolean;
  meta_title?: string;
  meta_description?: string;
  locale: string;
}) {
  await checkAuth();

  try {
    const client = await getSessionClient();

    // Check if updating or creating
    if (data.id) {
      // 1. Fetch existing translations of this blog post
      const { readItems } = await import('@directus/sdk');
      const existingTranslations = (await client.request(
        readItems(
          'blog_posts_translations' as any,
          {
            filter: { blog_posts_id: { _eq: data.id } },
            fields: ['id', 'languages_code'],
            limit: -1
          } as any
        )
      )) as any[];

      const translationForLocale = existingTranslations.find(
        (t) => t.languages_code === data.locale
      );

      const translationFields = {
        title: data.title,
        description: data.description || null,
        body: data.body || null,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null
      };

      // Use Directus { create, update } M2M syntax so we don't wipe
      // sibling-language translations by sending a plain replacement array.
      const translationsPayload = translationForLocale
        ? {
            update: [{ id: translationForLocale.id, ...translationFields }],
            create: [],
            delete: []
          }
        : {
            create: [{ languages_code: data.locale, ...translationFields }],
            update: [],
            delete: []
          };

      const payload = {
        slug: data.slug,
        cover: data.cover || null,
        author: data.author || null,
        author_role: data.author_role || null,
        author_avatar: data.author_avatar || null,
        category: data.category || null,
        published_at: data.published_at || null,
        status: data.status || 'draft',
        is_featured: !!data.is_featured,
        translations: translationsPayload
      };

      await client.request(updateItem('blog_posts' as any, data.id, payload));
    } else {
      // Create new blog post with translation
      const payload = {
        slug: data.slug,
        cover: data.cover || null,
        author: data.author || null,
        author_role: data.author_role || null,
        author_avatar: data.author_avatar || null,
        category: data.category || null,
        published_at: data.published_at || null,
        status: data.status || 'draft',
        is_featured: !!data.is_featured,
        translations: [
          {
            languages_code: data.locale,
            title: data.title,
            description: data.description || null,
            body: data.body || null,
            meta_title: data.meta_title || null,
            meta_description: data.meta_description || null
          }
        ]
      };

      await client.request(createItem('blog_posts' as any, payload));
    }

    revalidatePath('/[locale]/admin/articles', 'layout');
    revalidatePath('/[locale]/resources', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to save article:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}

/**
 * Action: Archive (Soft Delete) a Blog Post.
 */
export async function deleteArticle(id: number) {
  await checkAuth();

  try {
    const client = await getSessionClient();

    // Set status to archived
    await client.request(
      updateItem('blog_posts' as any, id, {
        status: 'archived'
      })
    );

    revalidatePath('/[locale]/admin/articles', 'layout');
    revalidatePath('/[locale]/resources', 'layout');
    return { success: true };
  } catch (err) {
    console.error('Failed to delete article:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}

/**
 * Action: Upload an image file to Directus storage
 */
export async function uploadImage(formData: FormData) {
  await checkAuth();

  try {
    const store = await cookies();
    const sessionToken = store.get('directus_session_token')?.value;
    const refreshToken = store.get('directus_refresh_token')?.value;

    const cookieHeader = [
      sessionToken ? `directus_session_token=${sessionToken}` : null,
      refreshToken ? `directus_refresh_token=${refreshToken}` : null
    ]
      .filter(Boolean)
      .join('; ');

    const url = getDirectusUrl();
    const res = await fetch(`${url}/files`, {
      method: 'POST',
      headers: {
        cookie: cookieHeader
      },
      body: formData
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || 'Upload failed');
    }

    const json = await res.json();
    return { success: true, id: json.data.id };
  } catch (err) {
    console.error('Failed to upload image file:', err);
    return { success: false, error: extractErrorMessage(err) };
  }
}
