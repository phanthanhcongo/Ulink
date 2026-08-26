import { NextResponse } from 'next/server';
import { getCurrentUser, proxyToDirectus, getRequestCookieHeader } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    const cookieHeader = getRequestCookieHeader(req);

    // 1. Fetch customer details for the current user (filter by user_id to avoid
    //    returning another user's record when role permissions are broad, e.g. "sale")
    let customerData = [];
    if (user) {
      const customerRes = await proxyToDirectus(
        `/items/customers?fields=*&filter[user][_eq]=${encodeURIComponent(user.id)}`,
        { method: 'GET', cookieHeader }
      );
      const customerPayload = customerRes.ok ? await customerRes.json() : null;
      customerData = customerPayload?.data || [];
    }

    // 2. Fetch regional hubs
    const hubsRes = await proxyToDirectus(
      '/items/regional_hubs?fields=id,name,slug&filter[status][_eq]=published',
      {
        method: 'GET',
        cookieHeader
      }
    );
    const hubsPayload = hubsRes.ok ? await hubsRes.json() : null;
    const hubsData = hubsPayload?.data || [];

    // 3. Fetch industries
    const industriesRes = await proxyToDirectus(
      '/items/industries?fields=id,name,slug&filter[status][_eq]=published',
      {
        method: 'GET',
        cookieHeader
      }
    );
    const industriesPayload = industriesRes.ok ? await industriesRes.json() : null;
    const industriesData = industriesPayload?.data || [];

    // 4. Fetch product SKUs
    const skusRes = await proxyToDirectus(
      '/items/product_skus?fields=id,sku_code,unit,pack_size,product.name,product.hero,product.translations.languages_code,product.translations.name&filter[status][_eq]=published&limit=-1',
      {
        method: 'GET',
        cookieHeader
      }
    );
    const skusPayload = skusRes.ok ? await skusRes.json() : null;
    const skusRaw = skusPayload?.data || [];
    const skusData = skusRaw.map((sku: any) => {
      const p = sku.product;
      let name = 'Sản phẩm ULink';
      if (p) {
        const trans = p.translations?.find(
          (t: any) => t.languages_code === 'vi' || t.languages_code.startsWith('vi')
        );
        name = trans?.name || p.name || 'Sản phẩm ULink';
      }
      return {
        id: sku.id,
        sku_code: sku.sku_code,
        product_name: name,
        unit: sku.unit || 'cái',
        pack_size: sku.pack_size || 'Hộp',
        hero: p?.hero || null
      };
    });

    // 5. Fetch published products for suggestion cards
    const productsRes = await proxyToDirectus(
      '/items/products?fields=id,slug,name,hero,translations.languages_code,translations.name,skus.unit&filter[status][_eq]=published&limit=8',
      {
        method: 'GET',
        cookieHeader
      }
    );
    const productsPayload = productsRes.ok ? await productsRes.json() : null;
    const productsData = productsPayload?.data || [];

    return NextResponse.json({
      customer: customerData[0] || null,
      hubs: hubsData,
      industries: industriesData,
      skus: skusData,
      products: productsData
    });
  } catch (err) {
    console.error('Customer metadata fetch failed:', err);
    return NextResponse.json(
      { error: 'internal_server_error', message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
