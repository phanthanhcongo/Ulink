import { NextResponse } from 'next/server';
import { getCurrentUser, proxyToDirectus, getRequestCookieHeader } from '@/lib/auth-helpers';
import { createWriteDirectusClient } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export const dynamic = 'force-dynamic';

const RFQ_FIELDS = [
  'id',
  'company',
  'contact_name',
  'email',
  'phone',
  'hub.id',
  'hub.name',
  'industry',
  'message',
  'line_items',
  'status',
  'source',
  'scheduled_delivery',
  'requested_delivery_date',
  'created_at',
  'approval_note',
  'reject_reason'
].join(',');

/**
 * GET /api/rfq/mine
 * List RFQ requests belonging to the currently authenticated user.
 * Tries user's session cookie first, falls back to admin token if needed.
 */
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'unauthorized', message: 'Authentication required.' },
        { status: 401 }
      );
    }

    // Try with user's session cookie first
    const cookieHeader = getRequestCookieHeader(req);
    const response = await proxyToDirectus(
      `/items/rfq_requests?fields=${RFQ_FIELDS}&filter[user][_eq]=${user.id}&sort=-created_at,-id`,
      { method: 'GET', cookieHeader }
    );

    if (response.ok) {
      const payload = await response.json();
      return NextResponse.json({ data: payload?.data || [] });
    }

    // Fallback to static admin token if user session lacks permissions
    console.warn('RFQ /mine - session cookie returned', response.status, '- falling back to admin token');
    const writeDirectus = createWriteDirectusClient();
    const data = await writeDirectus.request(
      readItems('rfq_requests', {
        fields: [
          'id',
          'company',
          'contact_name',
          'email',
          'phone',
          { hub: ['id', 'name'] },
          'industry',
          'message',
          'line_items',
          'status',
          'source',
          'scheduled_delivery',
          'requested_delivery_date',
          'created_at',
          'approval_note',
          'reject_reason'
        ],
        filter: {
          user: { _eq: user.id }
        },
        sort: ['-created_at', '-id']
      })
    );

    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error('RFQ /mine GET handler failed:', err);
    return NextResponse.json(
      { error: 'internal_server_error', message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
