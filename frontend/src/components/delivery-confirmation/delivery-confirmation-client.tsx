'use client';

import { useState } from 'react';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  ChevronRight,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { AuthUser } from '@/lib/auth-helpers';

interface DeliveryConfirmationClientProps {
  user: AuthUser | null;
  locale: string;
}

export default function DeliveryConfirmationClient({
  user,
  locale
}: DeliveryConfirmationClientProps) {
  const t = useTranslations('deliveryConfirmationPage');

  // Rating state (default 5 stars as shown in mockup)
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Criteria ratings state (default all active ThumbsUp as shown in mockup)
  const [criteria, setCriteria] = useState({
    time: 'up', // 'up' | 'down' | null
    condition: 'up',
    attitude: 'up'
  });

  // Incident checkboxes state (default Hàng hóa bị hư hỏng is checked)
  const [incidentOptions, setIncidentOptions] = useState({
    damaged: true,
    missing: false,
    wrong: false,
    other: false
  });

  const [comment, setComment] = useState('');
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  const [showIncidentSuccess, setShowIncidentSuccess] = useState(false);

  // Simulated image upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleThumbClick = (criterion: 'time' | 'condition' | 'attitude', type: 'up' | 'down') => {
    setCriteria((prev) => ({
      ...prev,
      [criterion]: prev[criterion] === type ? null : type
    }));
  };

  const toggleIncidentOption = (option: 'damaged' | 'missing' | 'wrong' | 'other') => {
    setIncidentOptions((prev) => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFeedbackSuccess(true);
    setTimeout(() => {
      setShowFeedbackSuccess(false);
      setComment('');
    }, 4000);
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIncidentSuccess(true);
    setTimeout(() => {
      setShowIncidentSuccess(false);
      setUploadedImage(null);
    }, 4500);
  };

  const triggerSimulatedUpload = () => {
    // Simulating file upload by setting a mock image or alert
    setUploadedImage('simulated_incident_cargo.jpg');
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
        <span className="text-slate-600 font-semibold truncate">{t('title')}</span>
      </nav>

      {/* 1. Green Alert Banner */}
      <div className="bg-[#EAFDF3] border-2 border-[#10B981]/30 p-4 sm:p-6 rounded-[3px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-left">
        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-sm">
          <Check className="h-5 w-5 sm:h-5.5 sm:w-5.5 stroke-[3.5]" />
        </div>

        <div className="space-y-1 sm:space-y-1.5">
          <h3 className="text-base sm:text-[17px] font-bold text-[#064E3B] leading-none">
            {t('deliverySuccess')}
          </h3>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-x-6 gap-y-1 text-[10px] sm:text-caption-responsive text-[#065F46] font-medium">
            <div>
              <span className="font-bold text-[#064E3B]">Mã:</span>{' '}
              <span className="font-semibold text-[#047857]">ULK-2026-98745</span>
            </div>
            <div>
              <span className="font-bold text-[#064E3B]">Thời gian:</span>{' '}
              <span className="font-semibold text-[#047857]">02/08/2026</span>
            </div>
            <div>
              <span className="font-bold text-[#064E3B]">Người:</span>{' '}
              <span className="font-semibold text-[#047857]">Nguyễn Văn A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Columns */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 pt-2">
        {/* LEFT COLUMN: Shipment Info and Delivery Rating Form */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Shipment Info Card */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 border-b border-slate-100 pb-2 sm:pb-3 uppercase tracking-wider">
              {t('shipmentInfoTitle')}
            </h4>

            <div className="grid gap-2 sm:gap-4 sm:grid-cols-3 text-[10px] sm:text-caption-responsive">
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">{t('shipMethodLabel')}:</span>
                <p className="font-bold text-slate-800">ULink Fleet (Vận chuyển B2B hỏa tốc)</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">{t('packageScaleLabel')}:</span>
                <p className="font-bold text-slate-800">{t('itemsCount')}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-medium">{t('totalPaidLabel')}:</span>
                <p className="font-bold text-[#006AA7] text-body-regular">{formatPrice(27378000)}</p>
              </div>
            </div>
          </div>

          {/* Delivery Rating / Feedback Form Card */}
          <div className="bg-white border border-slate-200/80 p-4 sm:p-6 rounded-[3px] shadow-sm space-y-4 sm:space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-3 sm:pb-4">
              <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 uppercase tracking-wider">
                {t('feedbackTitle')}
              </h4>
              <p className="text-[10px] sm:text-caption-responsive text-slate-400 leading-relaxed">{t('feedbackSubtitle')}</p>
            </div>

            {showFeedbackSuccess ? (
              <div className="bg-[#E8F5E9] border border-green-100 p-6 rounded-[3px] text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                <p className="text-body-regular font-bold text-emerald-800">{t('submitFeedbackSuccess')}</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 sm:space-y-6">
                {/* Overall Stars Rating */}
                <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-caption-responsive font-semibold text-slate-500 py-1 flex-wrap">
                  <span className="shrink-0">{t('overallRating')}</span>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4, 5].map((starIdx) => {
                      const isHighlighted =
                        hoverRating !== null ? starIdx <= hoverRating : starIdx <= rating;
                      return (
                        <button
                          type="button"
                          key={starIdx}
                          onClick={() => handleStarClick(starIdx)}
                          onMouseEnter={() => setHoverRating(starIdx)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="text-amber-400 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className="h-5.5 w-5.5"
                            fill={isHighlighted ? 'currentColor' : 'transparent'}
                            strokeWidth={2}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Criteria Liked list */}
                <div className="space-y-2 sm:space-y-4 pt-1">
                  {/* Criterion 1 */}
                  <div className="flex items-center justify-between gap-2 sm:gap-4 py-1.5 border-b border-slate-50 text-[10px] sm:text-caption-responsive flex-wrap">
                    <span className="font-semibold text-slate-700 shrink-0">{t('criteriaTime')}</span>
                    <div className="flex gap-1 sm:gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleThumbClick('time', 'up')}
                        className={`p-1.5 rounded-[3px] transition-colors ${
                          criteria.time === 'up'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThumbClick('time', 'down')}
                        className={`p-1.5 rounded-[3px] transition-colors ${
                          criteria.time === 'down'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Criterion 2 */}
                  <div className="flex items-center justify-between gap-4 py-1.5 border-b border-slate-55 text-caption-responsive">
                    <span className="font-semibold text-slate-700">{t('criteriaCondition')}</span>
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleThumbClick('condition', 'up')}
                        className={`p-1.5 rounded-[3px] transition-colors ${
                          criteria.condition === 'up'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThumbClick('condition', 'down')}
                        className={`p-1.5 rounded-[3px] transition-colors ${
                          criteria.condition === 'down'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Criterion 3 */}
                  <div className="flex items-center justify-between gap-4 py-1.5 border-b border-slate-55 text-caption-responsive">
                    <span className="font-semibold text-slate-700">{t('criteriaAttitude')}</span>
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleThumbClick('attitude', 'up')}
                        className={`p-1.5 rounded-[3px] transition-colors ${
                          criteria.attitude === 'up'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThumbClick('attitude', 'down')}
                        className={`p-1.5 rounded-[3px] transition-colors ${
                          criteria.attitude === 'down'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional comment */}
                <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-caption-responsive text-left">
                  <label className="font-bold text-slate-500" htmlFor="additionalComments">
                    {t('additionalComments')}
                  </label>
                  <textarea
                    id="additionalComments"
                    rows={3}
                    placeholder={t('placeholderComments')}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-[3px] border border-slate-200 bg-white p-2 sm:p-3 outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand font-medium leading-relaxed"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2">
                  <Link
                    href="/order-tracking"
                    className="inline-flex items-center justify-center rounded-[3px] border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 py-2 sm:py-2.5 px-4 sm:px-6 text-[10px] sm:text-caption-responsive font-bold transition-all shadow-sm"
                  >
                    {t('btnSkip')}
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-[3px] bg-brand text-white hover:bg-brand/95 py-2 sm:py-2.5 px-4 sm:px-6 text-[10px] sm:text-caption-responsive font-bold transition-all shadow"
                  >
                    {t('btnSubmit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Dispute incident report form */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-[3px] shadow-sm space-y-4 sm:space-y-5 text-left">
            <div className="space-y-1 border-b border-slate-100 pb-2 sm:pb-3">
              <h4 className="text-sm sm:text-body-regular font-bold text-slate-900 uppercase tracking-wider">
                {t('incidentTitle')}
              </h4>
              <p className="text-[10px] sm:text-caption-responsive text-slate-400 leading-relaxed font-medium">
                {t('incidentSubtitle')}
              </p>
            </div>

            {showIncidentSuccess ? (
              <div className="bg-[#E8F5E9] border border-green-100 p-3 sm:p-4 rounded-[3px] text-center space-y-1 text-[10px] sm:text-caption-responsive">
                <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-emerald-800">{t('submitIncidentSuccess')}</p>
              </div>
            ) : (
              <form onSubmit={handleIncidentSubmit} className="space-y-3 sm:space-y-4">
                {/* Incident Checklist options */}
                <div className="space-y-1.5 sm:space-y-2.5 text-[10px] sm:text-caption-responsive pt-1">
                  <label className="flex items-center gap-2 cursor-pointer py-0.5">
                    <input
                      type="checkbox"
                      checked={incidentOptions.damaged}
                      onChange={() => toggleIncidentOption('damaged')}
                      className="rounded border-slate-300 text-brand focus:ring-brand h-4 w-4"
                    />
                    <span className="text-slate-700 font-semibold">
                      {t('incidentOptionDamaged')}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer py-0.5">
                    <input
                      type="checkbox"
                      checked={incidentOptions.missing}
                      onChange={() => toggleIncidentOption('missing')}
                      className="rounded border-slate-300 text-brand focus:ring-brand h-4 w-4"
                    />
                    <span className="text-slate-700 font-semibold">
                      {t('incidentOptionMissing')}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer py-0.5">
                    <input
                      type="checkbox"
                      checked={incidentOptions.wrong}
                      onChange={() => toggleIncidentOption('wrong')}
                      className="rounded border-slate-300 text-brand focus:ring-brand h-4 w-4"
                    />
                    <span className="text-slate-700 font-semibold">{t('incidentOptionWrong')}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer py-0.5">
                    <input
                      type="checkbox"
                      checked={incidentOptions.other}
                      onChange={() => toggleIncidentOption('other')}
                      className="rounded border-slate-300 text-brand focus:ring-brand h-4 w-4"
                    />
                    <span className="text-slate-700 font-semibold">{t('incidentOptionOther')}</span>
                  </label>
                </div>

                {/* Simulated Image Upload */}
                <div className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-caption-responsive">
                  <span className="font-bold text-slate-500">{t('evidenceLabel')}</span>
                  <div
                    onClick={triggerSimulatedUpload}
                    className="border-2 border-dashed border-slate-200 hover:border-brand/40 bg-slate-50/50 hover:bg-slate-50 p-3 sm:p-5 rounded-[3px] text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1.5 sm:space-y-2"
                  >
                    {uploadedImage ? (
                      <div className="space-y-1">
                        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 mx-auto" />
                        <p className="text-[10px] sm:text-caption-responsive font-bold text-slate-700 truncate">{uploadedImage}</p>
                        <p className="text-[9px] sm:text-caption-responsive text-slate-400">Nhấn để thêm ảnh</p>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-300" />
                        <p className="text-[9px] sm:text-caption-responsive text-slate-400 leading-relaxed px-1">
                          {t('evidenceUploadText')}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2 sm:pt-2.5 border-t border-slate-100">
                  <Link
                    href="/order-tracking"
                    className="inline-flex items-center justify-center rounded-[3px] border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 py-2 px-3 sm:px-4 text-[10px] sm:text-caption-responsive font-bold transition-all shadow-sm"
                  >
                    {t('btnSkip')}
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-[3px] bg-brand text-white hover:bg-brand/95 py-2 px-3 sm:px-4 text-[10px] sm:text-caption-responsive font-bold transition-all shadow"
                  >
                    {t('btnSubmit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

