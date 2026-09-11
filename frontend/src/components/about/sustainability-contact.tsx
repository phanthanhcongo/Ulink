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
    <section className="bg-white py-8 sm:py-10 lg:py-14">
      <div className="page-container px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 text-left">
          <h2 className="text-section-title sm:text-section-title font-bold text-slate-900 tracking-tight">
            {tContact.title}
          </h2>
          <p className="text-body-regular sm:text-body-large text-slate-600 font-medium mt-2 text-sm sm:text-base leading-relaxed">
            {tContact.desc}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Left Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 lg:gap-7">

            {/* Address */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-brand/5 border border-brand/10 rounded-[3px] text-brand shrink-0">
                <MapPin className="h-4.5 sm:h-5 w-4.5 sm:w-5" />
              </div>
              <div>
                <h4 className="text-caption-responsive sm:text-body-regular font-bold text-slate-400 uppercase tracking-wider text-xs sm:text-sm">
                  {tContact.info.addressLabel}
                </h4>
                <p className="text-body-regular sm:text-body-large font-bold text-slate-800 mt-1 leading-relaxed text-sm sm:text-base">
                  {tContact.info.address}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-brand/5 border border-brand/10 rounded-[3px] text-brand shrink-0">
                <Mail className="h-4.5 sm:h-5 w-4.5 sm:w-5" />
              </div>
              <div>
                <h4 className="text-caption-responsive sm:text-body-regular font-bold text-slate-400 uppercase tracking-wider text-xs sm:text-sm">
                  {tContact.info.emailLabel}
                </h4>
                <a href={`mailto:${tContact.info.email}`} className="text-body-regular sm:text-body-large font-bold text-brand hover:underline mt-1 block leading-relaxed text-sm sm:text-base">
                  {tContact.info.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-brand/5 border border-brand/10 rounded-[3px] text-brand shrink-0">
                <Phone className="h-4.5 sm:h-5 w-4.5 sm:w-5" />
              </div>
              <div>
                <h4 className="text-caption-responsive sm:text-body-regular font-bold text-slate-400 uppercase tracking-wider text-xs sm:text-sm">
                  {tContact.info.phoneLabel}
                </h4>
                <a href={`tel:${tContact.info.phone}`} className="text-body-regular sm:text-body-large font-bold text-slate-800 hover:text-brand mt-1 block leading-relaxed text-sm sm:text-base">
                  {tContact.info.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-brand/5 border border-brand/10 rounded-[3px] text-brand shrink-0">
                <Clock className="h-4.5 sm:h-5 w-4.5 sm:w-5" />
              </div>
              <div>
                <h4 className="text-caption-responsive sm:text-body-regular font-bold text-slate-400 uppercase tracking-wider text-xs sm:text-sm">
                  {tContact.info.hoursLabel}
                </h4>
                <p className="text-body-regular sm:text-body-large font-bold text-slate-800 mt-1 leading-relaxed text-sm sm:text-base">
                  {tContact.info.hours}
                </p>
              </div>
            </div>

          </div>

          {/* Right Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50/50 p-5 sm:p-6 lg:p-8 rounded-[3px] border border-slate-100 shadow-sm">
              <h3 className="text-body-large sm:text-card-title text-slate-900 font-bold">
                {tContact.form.title}
              </h3>
              <p className="text-caption-responsive text-slate-500 mt-1 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                {tContact.form.desc}
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-[3px] text-body-regular font-medium text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 lg:space-y-5">
                <input type="hidden" name="subject" value="Yêu cầu liên hệ từ trang Phát triển bền vững" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Fullname */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-caption-responsive font-bold text-slate-700 text-xs sm:text-sm">
                      {tContact.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={tContact.form.placeholderName}
                      className="h-10 sm:h-11 lg:h-[46px] px-3 sm:px-4 rounded-[3px] border border-slate-200 bg-white text-body-regular sm:text-body-large focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium placeholder-slate-400 text-sm sm:text-base"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-caption-responsive font-bold text-slate-700 text-xs sm:text-sm">
                      {tContact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={tContact.form.placeholderEmail}
                      className="h-10 sm:h-11 lg:h-[46px] px-3 sm:px-4 rounded-[3px] border border-slate-200 bg-white text-body-regular sm:text-body-large focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium placeholder-slate-400 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-caption-responsive font-bold text-slate-700 text-xs sm:text-sm">
                    {tContact.form.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder={tContact.form.placeholderPhone}
                    className="h-10 sm:h-11 lg:h-[46px] px-3 sm:px-4 rounded-[3px] border border-slate-200 bg-white text-body-regular sm:text-body-large focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium placeholder-slate-400 text-sm sm:text-base"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-caption-responsive font-bold text-slate-700 text-xs sm:text-sm">
                    {tContact.form.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={tContact.form.placeholderMsg}
                    className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-[3px] border border-slate-200 bg-white text-body-regular sm:text-body-large focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium placeholder-slate-400 resize-none text-sm sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="h-11 sm:h-12 w-full bg-[#0B2347] text-white text-body-regular sm:text-body-large font-bold rounded-[3px] hover:bg-[#0E2F5E] transition-colors shadow-sm flex items-center justify-center gap-2 mt-3 sm:mt-4 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
