'use client';

import { useState } from 'react';
import {
  Check,
  Building2,
  Truck,
  Package,
  MapPin,
  Clock,
  Copy,
  ArrowLeft,
  Search,
  AlertCircle,
  ChevronRight,
  FileText
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import type { AuthUser } from '@/lib/auth-helpers';

interface OrderTrackingClientProps {
  user: AuthUser | null;
  locale: string;
  dbProductMap?: Record<string, { hero: string | null; slug: string }>;
}

export default function OrderTrackingClient({
  user,
  locale,
  dbProductMap = {}
}: OrderTrackingClientProps) {
  const t = useTranslations('orderTrackingPage');
  const DIRECTUS_URL = getDirectusUrlClient();

  const [inputCode, setInputCode] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

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

  const handleCopyTracking = () => {
    navigator.clipboard.writeText('TRK-HA-9817245');
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanCode = inputCode.trim().toUpperCase();
    const cleanEmail = inputEmail.trim().toLowerCase();

    if (!cleanCode || !cleanEmail) {
      setErrorMsg(
        locale === 'vi' ? 'Vui lòng nhập đầy đủ thông tin.' : 'Please fill in all fields.'
      );
      return;
    }

    if (cleanCode === 'ULK-2026-98745' && cleanEmail === 'purchasing@ulink-partner.vn') {
      setTrackedOrder({
        code: 'ULK-2026-98745',
        date: '14/03/2026'
      });
    } else {
      setErrorMsg(t('invalidCode'));
    }
  };

  const handleBackSearch = () => {
    setTrackedOrder(null);
    setInputCode('');
    setInputEmail('');
    setErrorMsg(null);
  };

  // State 1: Form search
  if (!trackedOrder) {
    return (
      <div className="mx-auto max-w-md w-full px-3 sm:px-4 text-slate-800 my-6 sm:my-8">
        <div className="bg-white border border-slate-200 p-4 sm:p-6 md:p-8 rounded-[3px] shadow-sm space-y-4 sm:space-y-6 text-left">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h2 className="text-base sm:text-card-title font-bold text-slate-900 tracking-tight">
              {t('searchTitle')}
            </h2>
            <p className="text-[10px] sm:text-caption-responsive text-slate-400 leading-relaxed max-w-sm">{t('searchDesc')}</p>
          </div>

          {/* Test suggestion alert */}
          <div className="bg-blue-50 border border-blue-100 p-2.5 sm:p-3.5 rounded-[3px] text-[10px] sm:text-caption-responsive leading-relaxed text-blue-800 flex gap-2">
            <AlertCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-blue-500 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-bold">Gợi ý tra cứu:</p>
              <p className="mt-0.5 sm:mt-1 truncate">
                Mã: <strong className="font-mono bg-blue-100 px-1 py-0.5 rounded text-[9px]">ULK-2026-98745</strong>
              </p>
              <p className="mt-0.5 truncate">
                Email: <strong className="font-mono bg-blue-100 px-1 py-0.5 rounded text-[9px]">purchasing@...</strong>
              </p>
            </div>
          </div>

          <form onSubmit={handleTrackSubmit} className="space-y-3 sm:space-y-4 pt-2">
            <div className="space-y-1 sm:space-y-1.5">
              <label className="text-[10px] sm:text-caption-responsive font-bold text-slate-500" htmlFor="trackCode">
                {t('orderCodeLabel')}
              </label>
              <input
                type="text"
                id="trackCode"
                placeholder="ULK-2026-98745"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full rounded-[3px] border border-slate-200 bg-white px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-body-regular outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand font-semibold"
              />
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <label className="text-[10px] sm:text-caption-responsive font-bold text-slate-500" htmlFor="trackEmail">
                {t('emailLabel')}
              </label>
              <input
                type="email"
                id="trackEmail"
                placeholder="email@company.vn"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="w-full rounded-[3px] border border-slate-200 bg-white px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-body-regular outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-100 p-2 sm:p-3 rounded-[3px] text-[10px] sm:text-caption-responsive text-rose-600 leading-relaxed font-medium">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-[3px] bg-brand text-white hover:bg-brand/95 py-2.5 sm:py-3 text-sm sm:text-body-regular font-bold shadow transition-all text-center"
            >
              {t('btnSubmit')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // State 2: Tracking journey details (matches confirmation dashboard perfectly!)
  return (
    <div className="page-container flex flex-col gap-4 sm:gap-6 text-left text-slate-800">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-caption-responsive text-slate-400 font-medium overflow-x-auto"
      >
        <span
          className="hover:text-brand transition-colors cursor-pointer shrink-0"
          onClick={handleBackSearch}
        >
          Trang chủ
        </span>
        <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-60 shrink-0" />
        <span
          className="hover:text-brand transition-colors cursor-pointer shrink-0"
          onClick={handleBackSearch}
        >
          Đơn hàng
        </span>
        <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-60 shrink-0" />
        <span className="text-slate-600 font-semibold truncate">Chi tiết {trackedOrder.code}</span>
      </nav>

      {/* Header Row */}
      <div className="flex flex-col gap-3 sm:gap-4 border-b border-slate-100 pb-4 sm:pb-5">
        <div className="space-y-1.5 sm:space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 flex-wrap">
            <h2 className="text-lg sm:text-card-title font-bold text-slate-900 tracking-tight truncate">
              Đơn hàng {trackedOrder.code}
            </h2>
            <span className="inline-flex items-center bg-blue-50 text-blue-600 text-[9px] sm:text-[10.5px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-blue-100 shrink-0">
              Đang vận chuyển
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <p className="text-[10px] sm:text-caption-responsive text-slate-400 font-medium">
              Đặt ngày {trackedOrder.date} • 15:20 | Cập nhật: 5 phút trước
            </p>
            <Link
              href="/order-tracking/payment-invoice"
              className="inline-flex items-center gap-1 text-[10px] sm:text-caption-responsive font-bold text-blue-600 hover:text-brand hover:underline transition-colors shrink-0"
            >
              <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
              <span className="hidden sm:inline">Xem Hóa đơn</span>
              <span className="sm:hidden">Hóa đơn</span>
            </Link>
          </div>
        </div>
        <button
          onClick={handleBackSearch}
          className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-caption-responsive font-bold text-slate-600 hover:text-brand transition-all w-fit sm:self-auto"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden sm:inline">{t('backSearch')}</span>
          <span className="sm:hidden">Quay lại</span>
        </button>
      </div>

      {/* Progress Timeline Header */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-body-regular font-bold text-slate-800 uppercase tracking-wider">
          Hành trình đơn hàng
        </h3>

        {/* Step Progress Bar - Checkout styled */}
        <div className="flex w-full overflow-hidden text-[10px] sm:text-caption-responsive font-semibold rounded-[3px] border border-slate-100">
          {/* Step 1: Giỏ hàng */}
          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 bg-blue-50/75 text-brand min-w-0">
            <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-brand text-[8px] sm:text-caption-responsive font-bold text-white shrink-0">
              ✓
            </span>
            <span className="font-bold tracking-wide hidden sm:inline truncate">Giỏ hàng</span>
          </div>

          {/* Step 2: Thanh toán */}
          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 bg-brand text-white min-w-0">
            <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white text-[8px] sm:text-caption-responsive font-bold text-brand shrink-0">
              2
            </span>
            <span className="font-bold tracking-wide hidden sm:inline truncate">Thanh toán</span>
          </div>

          {/* Step 3: Vận chuyển */}
          <Link
            href="/order-tracking/delivery-confirmation"
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 bg-slate-100 text-slate-400 hover:bg-slate-200/80 hover:text-slate-600 transition-colors cursor-pointer min-w-0"
          >
            <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white text-[8px] sm:text-caption-responsive font-bold text-slate-300 shrink-0">
              3
            </span>
            <span className="font-bold tracking-wide hidden sm:inline truncate">Vận chuyển</span>
          </Link>

          {/* Step 4: Hoàn tất */}
          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 bg-slate-50 text-slate-300 min-w-0">
            <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white border border-border/40 text-[8px] sm:text-caption-responsive font-bold text-slate-200 shrink-0">
              4
            </span>
            <span className="font-bold tracking-wide hidden sm:inline truncate">Hoàn tất</span>
          </div>
        </div>
      </div>

      {/* Grid Columns */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 pt-2">
        {/* LEFT COLUMN: Shipping details, journey log, items list */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Carrier Info Card */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 border-b border-slate-100 pb-2 sm:pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-body-regular">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" />
                Đơn vị vận chuyển B2B
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-caption-responsive font-bold text-blue-600">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="hidden sm:inline">Dự kiến nhận: 16/03/2026</span>
                <span className="sm:hidden">16/03/2026</span>
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 text-[10px] sm:text-caption-responsive">
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Phương thức giao hàng:</span>
                <p className="font-bold text-slate-800">ULink Fleet (Giao hàng hỏa tốc B2B)</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">Mã vận đơn B2B:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-bold text-slate-800 text-caption-responsive">
                    TRK-HA-9817245
                  </span>
                  <button
                    onClick={handleCopyTracking}
                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-[3px] text-caption-responsive font-bold hover:bg-blue-100 transition-colors border border-blue-100"
                  >
                    {copiedTracking ? 'Đã sao chép!' : 'Sao chép'}
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Log Timeline Card */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-6 rounded-[3px] shadow-sm space-y-4 sm:space-y-5">
            <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 border-b border-slate-100 pb-2 sm:pb-3 uppercase tracking-wider">
              Lịch sử hành trình
            </h4>

            {/* Vertical timeline items */}
            <div className="relative pl-4 sm:pl-6 border-l border-slate-200 space-y-4 sm:space-y-6 text-[10px] sm:text-caption-responsive">
              {/* Event 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 h-4.5 w-4.5 rounded-full bg-blue-100 border border-brand flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-brand" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-blue-600">14:30 - 15/03/2026</span>
                  <p className="font-bold text-slate-800 text-body-regular">HUB Đồng Văn IV, Hà Nam</p>
                  <p className="text-slate-500 leading-relaxed">
                    Đang xếp dỡ lên xe tải trung chuyển liên tỉnh (ULink Fleet #29H-882.15)
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-0 h-4 w-4 rounded-full bg-white border border-slate-300 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                </div>
                <div className="space-y-1">
                  <span className="font-medium text-slate-400">09:15 - 15/03/2026</span>
                  <p className="font-bold text-slate-800 text-body-regular">
                    Nhà máy bao bì ULink, Kim Bảng, Hà Nam
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    Hoàn tất kiểm định xuất xưởng (QA/QC Đạt), niêm phong Pallet thành công.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-0 h-4 w-4 rounded-full bg-white border border-slate-300 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                </div>
                <div className="space-y-1">
                  <span className="font-medium text-slate-400">16:45 - 14/03/2026</span>
                  <p className="font-bold text-slate-800 text-body-regular">Hệ thống B2B ULink</p>
                  <p className="text-slate-500 leading-relaxed">
                    Xác nhận thanh toán công nợ thành công. Đơn hàng chuyển sang bộ phận điều vận.
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative">
                <div className="absolute -left-[30px] top-0 h-4 w-4 rounded-full bg-white border border-slate-300 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                </div>
                <div className="space-y-1">
                  <span className="font-medium text-slate-400">15:20 - 14/03/2026</span>
                  <p className="font-bold text-slate-800 text-body-regular">Cổng thanh toán Doanh nghiệp</p>
                  <p className="text-slate-500 leading-relaxed">
                    Tiếp nhận yêu cầu mua hàng & hồ sơ RFQ tự động.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Products Card */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 border-b border-slate-100 pb-2 sm:pb-3">
              <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 uppercase tracking-wider">
                Sản phẩm đã đặt (02)
              </h4>
              <span className="text-[9px] sm:text-caption-responsive text-slate-400 font-semibold font-mono shrink-0">
                Mã: ULK-PK-921
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Product 1 */}
              <div className="flex flex-col gap-3 sm:gap-4 py-3 sm:py-3.5 first:pt-0 last:pb-0 sm:items-start sm:flex-row sm:justify-between">
                <div className="flex gap-2.5 sm:gap-3.5 items-start flex-1 min-w-0">
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
                      Số lượng: 500 kg x 39.500đ
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
                      Số lượng: 200 kg x 28.000đ
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

        {/* RIGHT COLUMN: Recipient Information & Totals Summary */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* Business Recipient Info */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 border-b border-slate-100 pb-2 sm:pb-3 uppercase tracking-wider">
              Thông tin nhận hàng
            </h4>
            <div className="space-y-2 sm:space-y-3.5 text-[10px] sm:text-caption-responsive text-left">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-slate-400 font-medium">Tên doanh nghiệp:</span>
                <p className="font-bold text-slate-800 text-[10px] sm:text-caption-responsive line-clamp-2">
                  CÔNG TY TNHH ULINK PARTNER
                </p>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-slate-400 font-medium">Mã số thuế:</span>
                <p className="font-bold text-slate-800 text-[10px] sm:text-caption-responsive font-mono">0110286665</p>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-slate-400 font-medium">Người nhận:</span>
                <p className="font-bold text-slate-800 text-[10px] sm:text-caption-responsive">
                  Nguyễn Văn A - 0912345678
                </p>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-slate-400 font-medium">Địa chỉ:</span>
                <p className="font-bold text-slate-700 leading-snug text-[10px] sm:text-caption-responsive">
                  Lô CN05 KCN Đồng Văn IV, Hà Nam
                </p>
              </div>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-card border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4 text-left">
            <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 border-b border-slate-200/60 pb-2 sm:pb-3 uppercase tracking-wider">
              Tổng cộng
            </h4>

            <div className="space-y-2 sm:space-y-3 text-[10px] sm:text-caption-responsive">
              <div className="flex justify-between">
                <span className="text-slate-500">Tạm tính mặt hàng</span>
                <span className="font-bold text-slate-800">{formatPrice(25350000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Thuế VAT B2B (8%)</span>
                <span className="font-bold text-slate-800">{formatPrice(2028000)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-500">Phí vận tải ULink Fleet</span>
                <span className="font-bold text-emerald-600 text-right">Miễn phí (Ưu đãi B2B)</span>
              </div>

              <hr className="border-slate-200" />

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-body-regular font-bold text-slate-900">Tổng thanh toán</span>
                <div className="text-right">
                  <span className="text-card-title font-bold text-[#006AA7] block leading-none">
                    {formatPrice(27378000)}
                  </span>
                  <span className="text-caption-responsive text-slate-400 font-medium block mt-1.5">
                    Đã thanh toán qua công nợ doanh nghiệp thời hạn 30 ngày.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


