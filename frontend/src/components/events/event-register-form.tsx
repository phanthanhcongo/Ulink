'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';

type Props = {
  slug: string;
  eventTitle: string;
  locale: 'vi' | 'en' | 'ja';
};

export function EventRegisterForm({ slug, eventTitle, locale }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    source: '',
    notes: '',
    agreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const L = {
    formTitle: { vi: 'Thông tin đăng ký cá nhân', en: 'Personal Registration Info', ja: '個人登録情報' },
    formDesc: { vi: 'Vui lòng hoàn thành các thông tin dưới đây để nhận vé tham dự và cập nhật tài liệu sự kiện.', en: 'Please complete the information below to receive your ticket and event materials.', ja: 'チケットとイベント資料を受け取るために、以下の情報を入力してください。' },
    fullName: { vi: 'Họ và tên', en: 'Full name', ja: 'お名前' },
    email: { vi: 'Email', en: 'Email', ja: 'メールアドレス' },
    phone: { vi: 'Số điện thoại', en: 'Phone number', ja: '電話番号' },
    company: { vi: 'Công ty / Tổ chức', en: 'Company / Organization', ja: '会社 / 組織名' },
    role: { vi: 'Chức vụ', en: 'Job Title', ja: '役職' },
    rolePlaceholder: { vi: 'Ví dụ: Giám đốc Công nghệ, Quản lý...', en: 'e.g. CTO, Manager...', ja: '例: CTO、マネージャー...' },
    source: { vi: 'Bạn biết đến sự kiện qua đâu?', en: 'How did you hear about us?', ja: 'どこでイベントを知りましたか？' },
    sourceSelect: { vi: 'Chọn nguồn thông tin', en: 'Select source', ja: '情報源を選択' },
    sourceOptions: {
      vi: ['Facebook / Mạng xã hội', 'Linkedin', 'Email giới thiệu', 'Được đồng nghiệp giới thiệu', 'Website ULink', 'Khác'],
      en: ['Facebook / Social Media', 'Linkedin', 'Email Newsletter', 'Recommended by Colleague', 'ULink Website', 'Other'],
      ja: ['Facebook / SNS', 'Linkedin', 'メールマガジン', '同僚からの紹介', 'ULinkウェブサイト', 'その他']
    },
    notes: { vi: 'Ghi chú thêm', en: 'Additional Notes', ja: '備考' },
    notesPlaceholder: { vi: 'Nhập ghi chú hoặc các câu hỏi dành cho diễn giả tại sự kiện...', en: 'Enter notes or questions for the speakers...', ja: 'ご質問やご要望を入力してください...' },
    agreeCheck: {
      vi: 'Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật thông tin của Ban tổ chức ULink Industries.',
      en: 'I agree to the terms of use and privacy policy of ULink Industries.',
      ja: 'ULink Industriesの利用規約とプライバシーポリシー ở đâyに同意します。'
    },
    submitBtn: { vi: 'Xác nhận Đăng ký', en: 'Confirm Registration', ja: '登録を確定する' },
    submitting: { vi: 'Đang xử lý...', en: 'Processing...', ja: '処理中...' },
    successTitle: { vi: 'Đăng ký thành công!', en: 'Registration Successful!', ja: '登録完了しました！' },
    successDesc: {
      vi: 'Cảm ơn bạn đã đăng ký tham gia sự kiện. Email xác nhận kèm mã vé mời đã được gửi tới hòm thư của bạn. Đội ngũ ULink sẽ liên hệ hỗ trợ bạn sớm nhất.',
      en: 'Thank you for registering. A confirmation email with your invitation ticket has been sent to your email. Our team will contact you shortly.',
      ja: 'ご登録いただきありがとうございます。招待チケット付き of 確認メールをご登録のアドレスに送信しました。担当者よりご連絡いたします。'
    },
    backHome: { vi: 'Về trang chủ', en: 'Back to Home', ja: 'ホームに戻る' },
    errorDefault: {
      vi: 'Không thể gửi đăng ký. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.',
      en: 'Failed to submit registration. Please try again or contact us directly.',
      ja: '登録を送信できませんでした。もう一度お試しいただくか、直接お問い合わせください。'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.source) {
      alert(locale === 'vi' ? 'Vui lòng điền đầy đủ các thông tin bắt buộc!' : 'Please fill in all required fields!');
      return;
    }
    if (!formData.agreed) {
      alert(locale === 'vi' ? 'Bạn cần đồng ý với điều khoản sử dụng để đăng ký!' : 'You must agree to the terms of use to register!');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Construct unified contact requests message payload
    const messageParts = [
      `Công ty / Tổ chức: ${formData.company}`,
      `Chức vụ: ${formData.role || 'Không cung cấp'}`,
      `Nguồn thông tin: ${formData.source}`,
      formData.notes ? `Ghi chú thêm / Câu hỏi: ${formData.notes}` : ''
    ].filter(Boolean).join('\n');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      subject: `Đăng ký sự kiện: ${eventTitle}`,
      message: messageParts
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        let msg = L.errorDefault[locale];
        try {
          const body = await response.json();
          if (body.message) msg = body.message;
        } catch {
          // fallback
        }
        setErrorMsg(msg);
      }
    } catch (err) {
      setErrorMsg(L.errorDefault[locale]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-[3px] bg-white p-5 text-center animate-fadeIn font-sans">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          {L.successTitle[locale]}
        </h3>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 px-2 sm:px-6">
          {L.successDesc[locale]}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[3px] bg-blue-600 hover:bg-blue-700 active:scale-[0.98] px-6 py-3 text-sm font-bold text-white transition-all shadow-sm"
          >
            {L.backHome[locale]}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[3px] bg-white p-5 font-sans">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 font-sans tracking-tight text-left">
          {L.formTitle[locale]}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans text-left">
          {L.formDesc[locale]}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-[3px] bg-rose-50 border border-rose-100 text-xs sm:text-sm text-rose-600 text-left font-sans">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-left">
              {L.fullName[locale]} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder={locale === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
              className="w-full rounded-[3px] border border-slate-200 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Business Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-left">
              {L.email[locale]} <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="nguyenvana@company.com"
              className="w-full rounded-[3px] border border-slate-200 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-left">
              {L.phone[locale]} <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="0901 234 567"
              className="w-full rounded-[3px] border border-slate-200 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-left">
              {L.company[locale]} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleInputChange}
              placeholder="ULink Industries"
              className="w-full rounded-[3px] border border-slate-200 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-left">
              {L.role[locale]}
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder={L.rolePlaceholder[locale]}
              className="w-full rounded-[3px] border border-slate-200 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Referral Source Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-left">
              {L.source[locale]} <span className="text-rose-500">*</span>
            </label>
            <select
              name="source"
              required
              value={formData.source}
              onChange={handleInputChange}
              className="w-full rounded-[3px] border border-slate-200 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white"
            >
              <option value="">{L.sourceSelect[locale]}</option>
              {L.sourceOptions[locale].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-left">
            {L.notes[locale]}
          </label>
          <textarea
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleInputChange}
            placeholder={L.notesPlaceholder[locale]}
            className="w-full rounded-[3px] border border-slate-200 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white resize-none"
          />
        </div>

        {/* Checkbox Term Agreement */}
        <div className="flex items-start gap-3 mt-4 select-none">
          <input
            type="checkbox"
            name="agreed"
            id="agree-checkbox"
            checked={formData.agreed}
            onChange={handleCheckboxChange}
            className="mt-1 h-4 w-4 rounded-[3px] border-slate-200 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="agree-checkbox" className="text-xs text-slate-500 leading-relaxed text-left cursor-pointer">
            {L.agreeCheck[locale]}
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 flex w-full items-center justify-center rounded-[3px] bg-blue-600 hover:bg-blue-700 active:scale-[0.98] py-3.5 text-sm font-bold text-white transition-all shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? L.submitting[locale] : L.submitBtn[locale]}
        </button>
      </form>
    </div>
  );
}
