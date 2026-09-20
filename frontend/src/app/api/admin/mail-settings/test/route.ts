'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdminUser } from '@/lib/auth-helpers';
import { sendMail } from '@/lib/smtp.mjs';

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isAdminUser(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { to } = await req.json();
  if (!to) {
    return NextResponse.json({ error: 'Thiếu email nhận' }, { status: 400 });
  }

  try {
    await sendMail({
      to,
      subject: '[ULINK] Test Email - Cấu hình SMTP',
      text: 'Đây là email test từ hệ thống ULINK. Nếu bạn nhận được email này, cấu hình SMTP đã hoạt động chính xác.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #2563eb;">ULINK - Test Email</h2>
          <p>Đây là email test từ hệ thống ULINK.</p>
          <p style="color: #16a34a; font-weight: bold;">✅ Cấu hình SMTP đã hoạt động chính xác!</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #6b7280; font-size: 12px;">Email được gửi tự động, vui lòng không trả lời.</p>
        </div>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gửi mail thất bại';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
