'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { submitContactRequest } from '@/lib/contact-submit';

export function AboutContact() {
  const t = useTranslations('aboutContact');
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
        subject: String(formData.get('subject') ?? t('formSubjectVal')),
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
    <section className="section-padding bg-white">
      <div className="page-container">
        {/* Section Header (ĐỒNG BỘ NGUYÊN BẢN HỆ THỐNG) */}
        <div className="section-header mb-10 sm:mb-12">
          <span className="text-section-title text-blue-600 block">
            {t('eyebrow')}
          </span>
          <h2 className="text-section-title text-slate-900">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Form trực tuyến */}
          <div className="lg:col-span-7 rounded-[3px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="mb-6 text-card-title font-semibold text-slate-900">
              {t('formTitle')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="subject" value={t('defaultSubject')} />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block form-label-responsive">
                    {t('nameLabel')}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={t('namePlaceholder')}
                    className="form-control-responsive"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block form-label-responsive">
                    {t('phoneLabel')}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder={t('phonePlaceholder')}
                    className="form-control-responsive"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block form-label-responsive">
                  {t('emailLabel')}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t('emailPlaceholder')}
                  className="form-control-responsive"
                />
              </div>

              <div>
                <label className="mb-1.5 block form-label-responsive">
                  {t('messageLabel')}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder={t('messagePlaceholder')}
                  className="form-control-responsive resize-none"
                />
              </div>

              {error && (
                <p className="rounded-[3px] bg-rose-50 px-3 py-2 text-body-regular font-medium text-rose-700">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-4 pt-2">
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-[3px] bg-[#1769E2] px-8 py-3 text-button-responsive text-white shadow-sm transition-all hover:bg-[#1257BD] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? t('submitting') : t('submit')}
                  </button>
                </div>
                <p className="text-caption-responsive font-normal text-slate-500">
                  {t('privacyNote')}
                </p>
              </div>
            </form>
          </div>

          {/* Cột phải: Thông tin & Bản đồ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Box 1: Thông tin liên hệ */}
            <div className="rounded-[3px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="mb-6 text-card-title font-semibold text-slate-900">
                {t('infoTitle')}
              </h3>

              <div className="space-y-6">
                {/* Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-caption-responsive font-semibold text-slate-900">{t('officeTitle')}</h4>
                    <p className="mt-1 text-body-regular text-slate-600">
                      {t('officeAddress')}
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-caption-responsive font-semibold text-slate-900">{t('hotlineTitle')}</h4>
                    <p className="mt-1 text-body-regular text-slate-600 font-semibold">
                      0247.309.9899 <span className="font-normal text-slate-500">{t('hotlineNote')}</span>
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-caption-responsive font-semibold text-slate-900">{t('emailTitle')}</h4>
                    <p className="mt-1 text-body-regular text-slate-600">
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
                    <h4 className="text-caption-responsive font-semibold text-slate-900">{t('workingHoursTitle')}</h4>
                    <p className="mt-1 text-body-regular text-slate-600">
                      {t('workingHoursValue')}
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
                className="inline-flex items-center gap-2 text-caption-responsive font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                <MapPin className="h-4 w-4" />
                {t('mapLinkText')}
              </a>
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[3px] border border-slate-300">
                <iframe
                  title={t('mapIframeTitle')}
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
