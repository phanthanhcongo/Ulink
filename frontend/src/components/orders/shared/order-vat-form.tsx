'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactRequest } from '@/lib/contact-submit';

interface OrderVatFormProps {
  orderCode: string;
  defaultCompanyName?: string;
  defaultTaxCode?: string;
  defaultCompanyAddress?: string;
  defaultInvoiceEmail?: string;
  phone?: string;
}

export function OrderVatForm({
  orderCode,
  defaultCompanyName = '',
  defaultTaxCode = '',
  defaultCompanyAddress = '',
  defaultInvoiceEmail = '',
  phone = ''
}: OrderVatFormProps) {
  const [vatSubmitting, setVatSubmitting] = useState(false);
  const [vatSubmitted, setVatSubmitted] = useState(false);
  const [vatError, setVatError] = useState<string | null>(null);

  const [vatFormData, setVatFormData] = useState({
    companyName: defaultCompanyName,
    taxCode: defaultTaxCode,
    companyAddress: defaultCompanyAddress,
    invoiceEmail: defaultInvoiceEmail,
    agreeTerms: true
  });

  const handleVatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vatFormData.agreeTerms) return;

    setVatSubmitting(true);
    setVatError(null);

    const payload = {
      name: vatFormData.companyName,
      email: vatFormData.invoiceEmail,
      phone: vatFormData.taxCode ? `MST:${vatFormData.taxCode}` : phone,
      subject: `[Đăng ký nhận Hóa đơn VAT] Đơn hàng ${orderCode} - ${vatFormData.companyName}`,
      message: `Yêu cầu xuất hóa đơn VAT điện tử B2B:\n- Mã đơn hàng: ${orderCode}\n- Tên doanh nghiệp: ${vatFormData.companyName}\n- Mã số thuế: ${vatFormData.taxCode}\n- Địa chỉ công ty: ${vatFormData.companyAddress}\n- Email nhận hóa đơn: ${vatFormData.invoiceEmail}`
    };

    const res = await submitContactRequest(payload);
    setVatSubmitting(false);

    if (res.ok) {
      setVatSubmitted(true);
    } else {
      setVatError(res.message);
    }
  };

  return (
    <div className="bg-white border border-[#DCE0E5] rounded-xl p-6 sm:p-10 space-y-6 shadow-2xs font-sans">
      <div className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#162233] uppercase tracking-wide">
          ĐĂNG KÝ NHẬN HÓA ĐƠN VAT
        </h2>
        <p className="text-sm text-[#617084]">
          Vui lòng điền đầy đủ thông tin dưới đây để nhận hóa đơn VAT điện tử. Chúng tôi sẽ liên hệ lại trong vòng 24 giờ làm việc.
        </p>
      </div>

      {vatSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">Đã gửi yêu cầu nhận hóa đơn VAT thành công!</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              Hóa đơn VAT điện tử sẽ được khởi tạo và gửi tới email <strong className="font-semibold">{vatFormData.invoiceEmail}</strong> sau khi xác minh đơn hàng.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleVatSubmit} className="space-y-5">
          {vatError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{vatError}</span>
            </div>
          )}

          {/* Grid Row 1: Tên công ty & Mã số thuế */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#162233]">
                Tên công ty
              </label>
              <input
                type="text"
                required
                value={vatFormData.companyName}
                onChange={(e) => setVatFormData({ ...vatFormData, companyName: e.target.value })}
                placeholder="Nhập tên công ty"
                className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#162233]">
                Mã số thuế
              </label>
              <input
                type="text"
                required
                value={vatFormData.taxCode}
                onChange={(e) => setVatFormData({ ...vatFormData, taxCode: e.target.value })}
                placeholder="Nhập mã số thuế"
                className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors font-mono"
              />
            </div>
          </div>

          {/* Row 2: Địa chỉ công ty */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#162233]">
              Địa chỉ công ty
            </label>
            <input
              type="text"
              required
              value={vatFormData.companyAddress}
              onChange={(e) => setVatFormData({ ...vatFormData, companyAddress: e.target.value })}
              placeholder="Nhập địa chỉ công ty"
              className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors"
            />
          </div>

          {/* Row 3: Email nhận hóa đơn */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#162233]">
              Email nhận hóa đơn
            </label>
            <input
              type="email"
              required
              value={vatFormData.invoiceEmail}
              onChange={(e) => setVatFormData({ ...vatFormData, invoiceEmail: e.target.value })}
              placeholder="Nhập email nhận hóa đơn"
              className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors"
            />
          </div>

          {/* Row 4: Checkbox terms */}
          <div className="pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={vatFormData.agreeTerms}
                onChange={(e) => setVatFormData({ ...vatFormData, agreeTerms: e.target.checked })}
                className="w-4 h-4 rounded text-[#1769E2] focus:ring-[#1769E2] accent-[#1769E2] border-[#DCE0E5] cursor-pointer"
              />
              <span className="text-sm font-semibold text-[#162233]">
                Tôi đồng ý với điều khoản đăng ký
              </span>
            </label>
          </div>

          {/* Row 5: Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!vatFormData.agreeTerms || vatSubmitting}
              className="bg-[#1769E2] hover:bg-[#1257C0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              {vatSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {vatSubmitting ? 'Đang gửi...' : 'Gửi đi'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
