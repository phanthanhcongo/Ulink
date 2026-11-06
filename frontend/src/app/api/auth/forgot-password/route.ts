import { ApiError } from '@/lib/api-error';
import { handleRoute, jsonOk } from '@/lib/route-helpers';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validators';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/forgot-password
 *
 * Body: { email }
 *
 * Checks if the user email exists. If not, returns 404. Otherwise, triggers reset.
 */
export async function POST(req: Request) {
  return handleRoute<ForgotPasswordInput>(req, { schema: forgotPasswordSchema }, async (data) => {
    const directusUrl = getDirectusUrl();
    // 1. Check if user exists in the backend
    try {
      const statusRes = await fetch(`${directusUrl}/password-reset-request/user-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
        cache: 'no-store'
      });

      if (statusRes.ok) {
        const statusData = await statusRes.json();
        if (!statusData.data?.exists) {
          throw new ApiError(404, 'email_not_found', 'Email không tồn tại trong hệ thống.');
        }
      }
    } catch (err) {
      if (err instanceof ApiError) throw err;
      console.warn('[forgot-password] existence check failed:', (err as Error).message);
    }

    // 2. Trigger send reset email
    try {
      await fetch(`${directusUrl}/password-reset-request/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, purpose: 'forgot' }),
        cache: 'no-store'
      });
    } catch (err) {
      console.warn('[forgot-password] send request failed:', (err as Error).message);
      throw new ApiError(500, 'send_failed', 'Gửi email khôi phục thất bại.');
    }

    return jsonOk({ sent: true }, 200);
  });
}
