'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { submitContactRequest } from '@/lib/contact-submit';

interface SustainabilityContactProps {
  tContact: {
    title: string;
    desc: string;
    info: {
      addressLabel: string;
      address: string;
      emailLabel: string;
      email: string;
      phoneLabel: string;
      phone: string;
      hoursLabel: string;
      hours: string;
    };
    form: {
      title: string;
      desc: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      placeholderName: string;
      placeholderEmail: string;
      placeholderPhone: string;
      placeholderMsg: string;
      submit: string;
    };
  };
}

export function SustainabilityContact({ tContact }: SustainabilityContactProps) {
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
        subject: String(formData.get('subject') ?? 'Yêu cầu liên hệ từ trang Phát triển bền vững'),
        message: String(formData.get('message') ?? '')
      });

      if (result.ok) {
        form.reset();
        router.push('/about/contact-success');
        return;
      }

      setError(result.message || 'Có lỗi xảy ra, vui lòng thử lại sau.');
    } catch (err) {
      setError('Lỗi kết nối, vui lòng kiểm tra lại mạng.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#F5F8FC] py-6 sm:py-12 lg:py-20 border-b border-slate-100">
      <div className="page-container">
        {/* Header */}
        <div className="mb-4 sm:mb-8 lg:mb-12 text-left">
          <h2 className="text-xl sm:text-3xl lg:text-[40px] font-bold text-[#001D6C] tracking-tight leading-tight">
            {tContact.title}
          </h2>
          <p className="text-[#495057] font-normal mt-1.5 sm:mt-2.5 text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl">
            {tContact.desc}
          </p>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-start">
          {/* Left Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-6 lg:gap-8">

            {/* Address */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#CAD5E2] bg-white flex items-center justify-center text-[#001D6C] shrink-0">
                <MapPin className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#001D6C]">
                  {tContact.info.addressLabel}
                </h4>
                <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
                  {tContact.info.address}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#CAD5E2] bg-white flex items-center justify-center text-[#001D6C] shrink-0">
                <Mail className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#001D6C]">
                  {tContact.info.emailLabel}
                </h4>
                <a href={`mailto:${tContact.info.email}`} className="text-xs sm:text-sm text-[#0F62FE] underline hover:opacity-80 leading-relaxed font-normal">
                  {tContact.info.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#CAD5E2] bg-white flex items-center justify-center text-[#001D6C] shrink-0">
                <Phone className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#001D6C]">
                  {tContact.info.phoneLabel}
                </h4>
                <a href={`tel:${tContact.info.phone}`} className="text-xs sm:text-sm text-[#495057] hover:text-[#0F62FE] leading-relaxed">
                  {tContact.info.phone}
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#CAD5E2] bg-white flex items-center justify-center text-[#001D6C] shrink-0">
                <Clock className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#001D6C]">
                  {tContact.info.hoursLabel}
                </h4>
                <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
                  {tContact.info.hours}
                </p>
              </div>
            </div>

          </div>

          {/* Right Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-4 sm:p-8 lg:p-10 rounded-[3px] border border-[#CAD5E2] shadow-sm">
              <div className="mb-3.5 sm:mb-6">
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-[#001D6C]">
                  {tContact.form.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-[#495057] mt-1 sm:mt-1.5 leading-relaxed">
                  {tContact.form.desc}
                </p>
              </div>

              {error && (
                <div className="mb-3.5 p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-600 rounded-[3px] text-xs sm:text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
                <input type="hidden" name="subject" value="Yêu cầu liên hệ từ trang Phát triển bền vững" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  {/* Fullname */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label className="text-xs sm:text-sm font-bold text-[#001D6C]">
                      {tContact.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={tContact.form.placeholderName}
                      className="h-9 sm:h-12 px-3 sm:px-4 rounded-[3px] border border-[#CED4DA] bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] placeholder-[#ADB5BD]"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label className="text-xs sm:text-sm font-bold text-[#001D6C]">
                      {tContact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={tContact.form.placeholderEmail}
                      className="h-9 sm:h-12 px-3 sm:px-4 rounded-[3px] border border-[#CED4DA] bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] placeholder-[#ADB5BD]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  <label className="text-xs sm:text-sm font-bold text-[#001D6C]">
                    {tContact.form.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder={tContact.form.placeholderPhone}
                    className="h-9 sm:h-12 px-3 sm:px-4 rounded-[3px] border border-[#CED4DA] bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] placeholder-[#ADB5BD]"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  <label className="text-xs sm:text-sm font-bold text-[#001D6C]">
                    {tContact.form.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={tContact.form.placeholderMsg}
                    className="p-3 sm:p-4 rounded-[3px] border border-[#CED4DA] bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] placeholder-[#ADB5BD] resize-none h-[90px] sm:h-[120px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="h-9 sm:h-12 w-full bg-[#001D6C] text-white text-xs sm:text-base font-bold rounded-[3px] hover:bg-[#001654] transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 sm:mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Đang gửi...' : tContact.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

