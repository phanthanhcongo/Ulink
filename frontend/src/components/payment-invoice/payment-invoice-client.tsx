'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  FileText,
  CreditCard,
  Download,
  Printer,
  Copy,
  ArrowLeft,
  ChevronRight,
  Package
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import type { AuthUser } from '@/lib/auth-helpers';

interface PaymentInvoiceClientProps {
  user: AuthUser | null;
  locale: string;
  dbProductMap?: Record<string, { hero: string | null; slug: string }>;
}

export default function PaymentInvoiceClient({
  user,
  locale,
  dbProductMap = {}
}: PaymentInvoiceClientProps) {
  const t = useTranslations('paymentInvoicePage');
  const DIRECTUS_URL = getDirectusUrlClient();

  const [copiedField, setCopiedField] = useState<string | null>(null);

  function getDirectusUrlClient() {
    return process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
  }

  const formatPrice = (amount: number) => {
    if (locale === 'vi') {
      return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    }
    return (
      '$' +
      new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        amount / 25000
      )
    );
  };

  const handleCopyText = (textToCopy: string, fieldId: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="page-container flex flex-col gap-4 sm:gap-6 text-left text-slate-800">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-caption-responsive text-slate-400 font-medium overflow-x-auto"
      >
        <Link href="/" className="hover:text-brand transition-colors shrink-0">
          Trang chủ
        </Link>
        <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-60 shrink-0" />
        <Link href="/order-tracking" className="hover:text-brand transition-colors shrink-0">
          Đơn hàng
        </Link>
        <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-60 shrink-0" />
        <span className="hover:text-brand transition-colors cursor-pointer shrink-0 truncate">
          Chi tiết
        </span>
        <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-60 shrink-0" />
        <span className="text-slate-600 font-semibold truncate">Thanh toán</span>
      </nav>

      {/* Header Row */}
      <div className="flex flex-col gap-3 sm:gap-4 border-b border-slate-100 pb-4 sm:pb-5">
        <div className="space-y-1.5 sm:space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 flex-wrap">
            <h2 className="text-base sm:text-card-title font-bold text-slate-900 tracking-tight truncate">
              Thanh toán hóa đơn #INV-2026-08974
            </h2>
            <span className="inline-flex items-center bg-[#FEF3C7] text-[#D97706] text-[9px] sm:text-[10.5px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-amber-200 shrink-0">
              Chờ thanh toán
            </span>
          </div>
          <p className="text-[10px] sm:text-caption-responsive text-slate-400 font-medium">
            Đơn hàng: ULK-2026-98745 • Hạn: 30 ngày
          </p>
        </div>
        <Link
          href="/order-confirmation"
          className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-caption-responsive font-bold text-slate-600 hover:text-brand transition-all w-fit sm:self-auto"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden sm:inline">Quay lại chi tiết</span>
          <span className="sm:hidden">Quay lại</span>
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 pt-2">
        {/* LEFT COLUMN: VAT Invoice details, Bank details, Invoice items list */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* VAT Invoice Details Card */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 border-b border-slate-100 pb-2 sm:pb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" />
              <span>Thông tin hóa đơn</span>
            </h4>

            <div className="text-[10px] sm:text-caption-responsive space-y-2.5 sm:space-y-3.5 pt-1">
              <div className="flex justify-between items-center py-0.5 gap-2">
                <span className="text-slate-500 font-medium shrink-0">Mã số:</span>
                <span className="font-bold text-slate-800 text-right">INV-2026-08974</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-500 font-medium">Ngày phát hành:</span>
                <span className="font-semibold text-slate-700">14/03/2026</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-500 font-medium">Hạn thanh toán hóa đơn:</span>
                <span className="font-bold text-[#E11D48]">13/04/2026 (Trong vòng 30 ngày)</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-500 font-medium">Mã số thuế bên mua:</span>
                <span className="font-semibold text-slate-800">0110286665</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-500 font-medium">Phương thức giao dịch:</span>
                <span className="font-bold text-slate-800">Hạn mức công nợ doanh nghiệp</span>
              </div>
            </div>
          </div>

          {/* B2B Bank Transfer Instructions Card */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 border-b border-slate-100 pb-2 sm:pb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" />
              <span>Chuyển khoản ngân hàng</span>
            </h4>

            <div className="text-[10px] sm:text-caption-responsive space-y-2.5 sm:space-y-3.5 pt-1">
              {/* Row 1 */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 py-0.5">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-slate-400 font-medium">Ngân hàng:</span>
                  <p className="font-bold text-slate-800 text-[11px] sm:text-[12.5px] line-clamp-2">
                    Vietcombank
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopyText('NHTMCP Ngoại Thương Việt Nam (Vietcombank)', 'bank')
                  }
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[3px] text-[9px] sm:text-caption-responsive font-bold hover:bg-blue-100 transition-colors border border-blue-100 shrink-0 w-fit"
                >
                  <Copy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span className="hidden sm:inline">{copiedField === 'bank' ? 'Đã sao chép!' : 'Sao chép'}</span>
                  <span className="sm:hidden">Sao chép</span>
                </button>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between items-start gap-4 py-0.5">
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium">Số tài khoản doanh nghiệp:</span>
                  <p className="font-mono font-bold text-slate-800 text-body-regular">1028 666 5999</p>
                </div>
                <button
                  onClick={() => handleCopyText('1028 666 5999', 'account')}
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-[3px] text-caption-responsive font-bold hover:bg-blue-100 transition-colors border border-blue-100 shrink-0"
                >
                  {copiedField === 'account' ? 'Đã sao chép!' : 'Sao chép'}
                  <Copy className="h-3 w-3" />
                </button>
              </div>

              {/* Row 3 */}
              <div className="space-y-0.5 py-0.5">
                <span className="text-slate-400 font-medium">Tên đơn vị thụ hưởng:</span>
                <p className="font-bold text-slate-800 uppercase text-[12.5px]">
                  CÔNG TY CỔ PHẦN CÔNG NGHỆ LOGISTICS ULINK
                </p>
              </div>

              {/* Required Memo Gray Block */}
              <div className="bg-card border border-slate-100 p-4 rounded-[3px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 text-left">
                  <span className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wider">
                    Nội dung chuyển khoản (bắt buộc):
                  </span>
                  <p className="font-mono font-black text-[#006AA7] text-caption-responsive tracking-wide break-all">
                    THANH TOAN HOA DON INV-2026-08974
                  </p>
                </div>
                <button
                  onClick={() => handleCopyText('THANH TOAN HOA DON INV-2026-08974', 'memo')}
                  className="inline-flex items-center justify-center gap-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-[3px] text-caption-responsive font-bold hover:bg-blue-100 transition-colors border border-blue-100 shrink-0 w-full sm:w-auto"
                >
                  {copiedField === 'memo' ? 'Đã sao chép!' : 'Sao chép'}
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Line Items Card */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 border-b border-slate-100 pb-2 sm:pb-3">
              <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 uppercase tracking-wider">
                Chi tiết mặt hàng (02)
              </h4>
              <span className="text-[9px] sm:text-caption-responsive text-slate-400 font-semibold font-mono shrink-0">
                Mã: ULK-PK-921
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Product 1 */}
              <div className="flex flex-col gap-3 sm:gap-4 py-3 sm:py-3.5 first:pt-0 last:pb-0 sm:items-start sm:flex-row sm:justify-between">
                <div className="flex gap-3.5 items-start flex-1 min-w-0">
                  <Link
                    href="/solutions/mang-quan-pallet-stretch-film"
                    className="relative h-14 w-14 shrink-0 rounded-[3px] border border-slate-200 bg-white flex items-center justify-center overflow-hidden hover:opacity-95 transition-opacity block"
                  >
                    {dbProductMap['UL-PF-2002']?.hero ? (
                      <Image
                        src={`${DIRECTUS_URL}/assets/${dbProductMap['UL-PF-2002'].hero}`}
                        alt="Màng quấn Pallet"
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    ) : (
                      <Package className="h-5 w-5 text-slate-300" />
                    )}
                  </Link>
                  <div className="min-w-0 flex-1 space-y-1 text-left">
                    <Link
                      href="/solutions/mang-quan-pallet-stretch-film"
                      className="font-bold text-slate-900 text-caption-responsive hover:text-brand transition-all block leading-tight"
                    >
                      Màng quấn Pallet - Stretch Film (Bản rộng 50cm, 2.4kg)
                    </Link>
                    <p className="text-caption-responsive text-slate-400 font-medium">
                      Số lượng: 500 kg x 39.500đ / kg
                    </p>
                  </div>
                </div>
                <span className="text-body-regular font-bold text-slate-800 shrink-0 self-end sm:self-start">
                  {formatPrice(19750000)}
                </span>
              </div>

              {/* Product 2 */}
              <div className="flex flex-col sm:flex-row gap-4 py-3.5 first:pt-1 last:pb-1 sm:items-start justify-between">
                <div className="flex gap-3.5 items-start flex-1 min-w-0">
                  <Link
                    href="/solutions/tui-pe-trong-suot-dung-thuc-pham"
                    className="relative h-14 w-14 shrink-0 rounded-[3px] border border-slate-200 bg-white flex items-center justify-center overflow-hidden hover:opacity-95 transition-opacity block"
                  >
                    {dbProductMap['UL-PE-1008']?.hero ? (
                      <Image
                        src={`${DIRECTUS_URL}/assets/${dbProductMap['UL-PE-1008'].hero}`}
                        alt="Túi PE"
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    ) : (
                      <Package className="h-5 w-5 text-slate-300" />
                    )}
                  </Link>
                  <div className="min-w-0 flex-1 space-y-1 text-left">
                    <Link
                      href="/solutions/tui-pe-trong-suot-dung-thuc-pham"
                      className="font-bold text-slate-900 text-caption-responsive hover:text-brand transition-all block leading-tight"
                    >
                      Túi PE trong suốt siêu dai - Đóng kiện hàng công nghiệp
                    </Link>
                    <p className="text-caption-responsive text-slate-400 font-medium">
                      Số lượng: 200 kg x 28.000đ / kg
                    </p>
                  </div>
                </div>
                <span className="text-body-regular font-bold text-slate-800 shrink-0 self-end sm:self-start">
                  {formatPrice(5600000)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Summary and action triggers */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-5">
          {/* Invoice Summary */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 border-b border-slate-100 pb-2 sm:pb-3 uppercase tracking-wider">
              Tổng cộng
            </h4>

            <div className="space-y-2 sm:space-y-3 text-[10px] sm:text-caption-responsive">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Tạm tính</span>
                <span className="font-bold text-slate-800 text-right">{formatPrice(25350000)}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Thuế VAT (8%)</span>
                <span className="font-bold text-slate-800 text-right">{formatPrice(2028000)}</span>
              </div>
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-slate-500">Vận tải</span>
                <span className="font-bold text-emerald-600 text-right">Miễn phí</span>
              </div>

              <hr className="border-slate-200" />

              <div className="flex items-baseline justify-between pt-1 gap-2">
                <span className="text-sm sm:text-body-regular font-bold text-slate-900">Tổng</span>
                <span className="text-base sm:text-card-title font-bold text-[#006AA7] leading-none">
                  {formatPrice(27378000)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 sm:space-y-3.5">
            <button
              onClick={() =>
                toast.success('Đang tạo PDF hóa đơn...', { duration: 4000 })
              }
              className="w-full inline-flex items-center justify-center gap-2 rounded-[3px] border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 py-2 sm:py-3 text-[10px] sm:text-body-regular font-bold shadow-sm transition-all text-center"
            >
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden sm:inline">Tải PDF</span>
              <span className="sm:hidden">Tải</span>
            </button>

            <button
              onClick={() => window.print()}
              className="w-full inline-flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 py-2 sm:py-2.5 text-[10px] sm:text-caption-responsive font-bold transition-all text-center"
            >
              <Printer className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden sm:inline">In hóa đơn</span>
              <span className="sm:hidden">In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


