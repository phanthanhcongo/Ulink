export interface VoucherUsageLog {
  id: string | number;
  voucher_code: string;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  discount_amount: number;
  used_at: string;
}

export interface Voucher {
  id?: number | string;
  code: string;
  name: string;
  description?: string;
  discount_type: 'percent' | 'fixed';
  discount_value: number; // e.g. 10 for 10%, 50000 for 50,000 VND
  min_order_amount?: number; // Minimum subtotal required
  max_discount_amount?: number; // Cap for percentage discount
  usage_limit?: number | null; // Total available vouchers (e.g. 100 uses, null = unlimited)
  usage_count?: number; // Number of times used
  is_active: boolean;
  expires_at?: string;
  usage_history?: VoucherUsageLog[];
}

export const SAMPLE_VOUCHERS: Voucher[] = [
  {
    id: 1,
    code: 'ULINKB2B',
    name: 'Chiết khấu B2B Doanh nghiệp',
    description: 'Giảm 10% cho toàn bộ đơn hàng B2B đối tác',
    discount_type: 'percent',
    discount_value: 10,
    min_order_amount: 0,
    max_discount_amount: 50000000,
    usage_limit: 100,
    usage_count: 14,
    is_active: true,
    usage_history: [
      {
        id: 'log-1',
        voucher_code: 'ULINKB2B',
        order_code: 'UL-MU9K4GRX',
        customer_name: 'Nguyễn Văn A (Công ty ULINK Partner)',
        customer_email: 'purchasing@ulink-partner.vn',
        customer_phone: '0988 123 456',
        discount_amount: 3888000,
        used_at: '2026-09-20 14:30'
      },
      {
        id: 'log-2',
        voucher_code: 'ULINKB2B',
        order_code: 'UL-8827361A',
        customer_name: 'Trần Thị B (Cổ phần Nhựa Hà Nam)',
        customer_email: 'b.tran@nhuahanam.vn',
        customer_phone: '0912 345 678',
        discount_amount: 5400000,
        used_at: '2026-09-19 10:15'
      },
      {
        id: 'log-3',
        voucher_code: 'ULINKB2B',
        order_code: 'UL-1029384B',
        customer_name: 'Phạm Minh C (TNHH Logistics Đồng Văn IV)',
        customer_email: 'purchasing@dongvan-logistics.com',
        customer_phone: '0977 888 999',
        discount_amount: 1200000,
        used_at: '2026-09-18 16:45'
      }
    ]
  },
  {
    id: 2,
    code: 'ULINK10',
    name: 'Mã giảm giá 10% Đơn hàng đầu',
    description: 'Giảm 10% cho khách hàng mới đặt đơn từ 1 triệu',
    discount_type: 'percent',
    discount_value: 10,
    min_order_amount: 1000000,
    max_discount_amount: 10000000,
    usage_limit: 50,
    usage_count: 8,
    is_active: true,
    usage_history: [
      {
        id: 'log-4',
        voucher_code: 'ULINK10',
        order_code: 'UL-9928172X',
        customer_name: 'Lê Hoàng D (Cty Thiết bị Phòng sạch)',
        customer_email: 'hoangd@cleanroom.vn',
        customer_phone: '0903 111 222',
        discount_amount: 850000,
        used_at: '2026-09-17 09:20'
      }
    ]
  },
  {
    id: 3,
    code: 'ULINK50K',
    name: 'Giảm 50.000đ vận chuyển',
    description: 'Giảm trực tiếp 50.000đ vào tổng đơn hàng',
    discount_type: 'fixed',
    discount_value: 50000,
    min_order_amount: 500000,
    usage_limit: 200,
    usage_count: 42,
    is_active: true,
    usage_history: [
      {
        id: 'log-5',
        voucher_code: 'ULINK50K',
        order_code: 'UL-4482910M',
        customer_name: 'Vũ Đức E (Nhà máy Bao bì Phố Nối)',
        customer_email: 'duce@phonoi-pack.com',
        customer_phone: '0944 555 666',
        discount_amount: 50000,
        used_at: '2026-09-16 11:00'
      }
    ]
  },
  {
    id: 4,
    code: 'B2BVIP',
    name: 'Chiết khấu B2B VIP Partner',
    description: 'Giảm 15% cho doanh nghiệp đối tác lớn',
    discount_type: 'percent',
    discount_value: 15,
    min_order_amount: 5000000,
    max_discount_amount: 100000000,
    usage_limit: 20,
    usage_count: 3,
    is_active: true,
    usage_history: [
      {
        id: 'log-6',
        voucher_code: 'B2BVIP',
        order_code: 'UL-7738291V',
        customer_name: 'Đoàn Văn F (Tổng Cty Linh kiện Điện tử)',
        customer_email: 'f.doan@viet-electronics.vn',
        customer_phone: '0966 777 888',
        discount_amount: 14500000,
        used_at: '2026-09-15 15:10'
      }
    ]
  }
];

export function validateVoucherCode(
  inputCode: string,
  subtotal: number,
  dbVouchers: Voucher[] = SAMPLE_VOUCHERS
): {
  valid: boolean;
  voucher?: Voucher;
  discountAmount: number;
  message: string;
} {
  const cleanCode = (inputCode || '').trim().toUpperCase();
  if (!cleanCode) {
    return {
      valid: false,
      discountAmount: 0,
      message: 'Vui lòng nhập mã giảm giá.'
    };
  }

  // Look up voucher in active list
  const found = dbVouchers.find(
    (v) => v.code.toUpperCase() === cleanCode && v.is_active !== false
  );

  if (!found) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Mã giảm giá "${cleanCode}" không hợp lệ hoặc đã hết hạn.`
    };
  }

  // Check usage limit
  if (found.usage_limit && (found.usage_count || 0) >= found.usage_limit) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Mã giảm giá "${cleanCode}" đã hết lượt sử dụng.`
    };
  }

  // Check minimum order amount requirement
  if (found.min_order_amount && subtotal < found.min_order_amount) {
    const formattedMin = new Intl.NumberFormat('vi-VN').format(found.min_order_amount) + 'đ';
    return {
      valid: false,
      discountAmount: 0,
      message: `Mã "${cleanCode}" chỉ áp dụng cho đơn hàng từ ${formattedMin}.`
    };
  }

  // Calculate discount amount
  let discountAmount = 0;
  if (found.discount_type === 'percent') {
    discountAmount = Math.round((subtotal * found.discount_value) / 100);
    if (found.max_discount_amount && discountAmount > found.max_discount_amount) {
      discountAmount = found.max_discount_amount;
    }
  } else {
    discountAmount = Math.min(subtotal, found.discount_value);
  }

  return {
    valid: true,
    voucher: found,
    discountAmount,
    message: `Áp dụng thành công mã "${found.code}" (${found.name})!`
  };
}
