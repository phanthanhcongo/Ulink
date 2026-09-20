import { NextResponse } from 'next/server';
import { validateVoucherCode } from '@/lib/vouchers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, subtotal } = body || {};

    if (typeof code !== 'string') {
      return NextResponse.json(
        { valid: false, discountAmount: 0, message: 'Vui lòng nhập mã giảm giá hợp lệ.' },
        { status: 400 }
      );
    }

    const subtotalNum = typeof subtotal === 'number' && subtotal > 0 ? subtotal : 0;
    const result = validateVoucherCode(code, subtotalNum);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { valid: false, discountAmount: 0, message: 'Đã xảy ra lỗi khi kiểm tra mã giảm giá.' },
      { status: 500 }
    );
  }
}
