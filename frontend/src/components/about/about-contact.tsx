'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { submitContactRequest } from '@/lib/contact-submit';

export function AboutContact() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    setSubmitting(true);
    setError(null);

    const formData = new FormData(form);
    try {
      const result = await submitContactRequest({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        subject: String(formData.get('subject') ?? 'Yêu cầu liên hệ trực tuyến'),
        message: String(formData.get('message') ?? '')
      });

      if (result.ok) {
        form.reset();
        router.push('/about/contact-success');
        return;
      }

      setError(result.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header (ĐỒNG BỘ NGUYÊN BẢN HỆ THỐNG) */}
        <div className="text-center max-w-3xl mx-auto space-y-1 sm:space-y-2 mb-10 sm:mb-12">
          <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold tracking-tight text-blue-600 leading-tight block">
            LIÊN HỆ VỚI CHÚNG TÔI
          </span>
          <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold tracking-tight text-slate-900 leading-tight">
            Kết nối với ULink Industries ngay hôm nay
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Form trực tuyến */}
          <div className="lg:col-span-7 rounded-[3px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="mb-6 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900">
              Gửi yêu cầu trực tuyến
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="subject" value="Yêu cầu liên hệ trực tuyến từ Trang chủ" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-[12px] sm:text-[13px] font-semibold text-slate-700">
                    Họ và tên
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full rounded-[3px] border border-slate-300 bg-white px-4 py-3 text-[13px] sm:text-[14px] outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] sm:text-[13px] font-semibold text-slate-700">
                    Số điện thoại
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Ví dụ: 0912 345 678"
                    className="w-full rounded-[3px] border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] sm:text-[13px] font-semibold text-slate-700">
                  Địa chỉ Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Ví dụ: NguyenVana@ulink.com"
                  className="w-full rounded-[3px] border border-slate-300 bg-white px-4 py-3 text-[13px] sm:text-[14px] outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] sm:text-[13px] font-semibold text-slate-700">
                  Nội dung tin nhắn
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Nhập yêu cầu chi tiết về vật tư, quy cách kỹ thuật hoặc câu hỏi của bạn tại đây..."
                  className="w-full resize-none rounded-[3px] border border-slate-300 bg-white px-4 py-3 text-[13px] sm:text-[14px] outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {error && (
                <p className="rounded-[3px] bg-rose-50 px-3 py-2 text-[13px] sm:text-[14px] font-medium text-rose-700">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-4 pt-2">
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-[3px] bg-[#1769E2] px-8 py-3 text-[13px] sm:text-[14px] font-bold text-white shadow-sm transition-all hover:bg-[#1257BD] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? 'Đang gửi...' : 'Gửi đi'}
                  </button>
                </div>
                <p className="text-[12px] sm:text-[13px] text-slate-500">
                  Chúng tôi cam kết bảo mật thông tin và phản hồi trong 24h làm việc.
                </p>
              </div>
            </form>
          </div>

          {/* Cột phải: Thông tin & Bản đồ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Box 1: Thông tin liên hệ */}
            <div className="rounded-[3px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="mb-6 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900">
              Thông tin liên hệ
            </h3>

              <div className="space-y-6">
                {/* Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] font-semibold text-slate-900">Văn phòng & Nhà xưởng Hà Nam</h4>
                    <p className="mt-1 text-[12px] sm:text-[13px] leading-relaxed text-slate-600">
                      Khu Công nghiệp Đồng Văn IV, Huyện Kim Bảng, Tỉnh Hà Nam, Việt Nam
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] font-semibold text-slate-900">Hotline hỗ trợ 24/7</h4>
                    <p className="mt-1 text-[12px] sm:text-[13px] leading-relaxed text-slate-600 font-semibold">
                      0247.309.9899 <span className="font-normal text-slate-500">(Hỗ trợ kỹ thuật & báo giá nhanh)</span>
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] font-semibold text-slate-900">Email</h4>
                    <p className="mt-1 text-[12px] sm:text-[13px] leading-relaxed text-slate-600">
                      contact@ulinkindustries.com
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] font-semibold text-slate-900">Giờ làm việc hành chính</h4>
                    <p className="mt-1 text-[12px] sm:text-[13px] leading-relaxed text-slate-600">
                      Thứ Hai - Thứ Bảy: 8:00 - 17:30 (Trừ các ngày lễ Tết)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Map & Link */}
            <div className="bg-slate-50 rounded-[3px] border border-slate-200 p-6 flex flex-col items-center gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Đường đến Hub Hà Nam
              </a>
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[3px] border border-slate-300">
                <iframe
                  title="ULink Hub Ha Nam Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.473595677843!2d105.975765!3d20.650228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135c345a5555555%3A0x1!2zS0NOIMSQ4buTbmcgVsSDbiwgRHV5IFRpw6puLCBIw6AgTmFt!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
