import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdminUser, proxyToDirectus, getRequestCookieHeader } from '@/lib/auth-helpers';

async function checkAdmin(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isAdminUser(user)) return null;
  return getRequestCookieHeader(req);
}

export async function GET(req: NextRequest) {
  const cookie = await checkAdmin(req);
  if (!cookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') ?? 'permissions';

  let path: string;
  if (type === 'roles') {
    path = '/roles?fields=id,name,icon,description,admin_access&limit=-1&sort=name';
  } else if (type === 'collections') {
    path = '/collections';
  } else {
    // Directus v10: permissions have `role` field (not policy)
    path = '/permissions?fields=id,role,collection,action,fields,permissions&limit=-1';
  }

  const res = await proxyToDirectus(path, { cookieHeader: cookie });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const cookie = await checkAdmin(req);
  if (!cookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const res = await proxyToDirectus('/permissions', {
    method: 'POST',
    cookieHeader: cookie,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const cookie = await checkAdmin(req);
  if (!cookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const res = await proxyToDirectus(`/permissions/${id}`, {
    method: 'PATCH',
    cookieHeader: cookie,
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: NextRequest) {
  const cookie = await checkAdmin(req);
  if (!cookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const res = await proxyToDirectus(`/permissions/${id}`, {
    method: 'DELETE',
    cookieHeader: cookie,
  });
  if (res.status === 204) return NextResponse.json({ success: true });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
