'use client';

import { useState } from 'react';
import { Mail, FileText, ArrowRight } from 'lucide-react';

export function CareersNewsletter() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    if (!fullName || !email) {
      setError('Vui lòng điền đầy đủ họ tên và email.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Simulate API submission delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitted(true);
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 lg:py-16">
      <div className=" bg-white p-8 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch shadow-xs">
        {/* Left Column: Information */}
        <div className="md:col-span-6 flex flex-col justify-between pr-0 md:pr-8 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-body-regular font-bold uppercase tracking-wider text-blue-600">
              ĐƠN ỨNG TUYỂN MỞ
            </span>
            <h2 className="text-[30px] font-extrabold text-slate-900 leading-tight">
              Chưa có vị trí phù hợp?<br />Gửi CV của bạn<br />chúng tôi sẽ thông báo cho bạn.
            </h2>
            <p className="text-body-regular text-slate-500 leading-relaxed mt-2">
              Nếu có vị trí phù hợp với hồ sơ của bạn trong 12 tháng tới, đội ngũ Tuyển dụng sẽ
              chủ động liên hệ.
            </p>
          </div>

          <div className="flex items-center gap-2 text-body-regular text-slate-600 font-semibold mt-4">
            <Mail className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <a href="mailto:careers@ulinkindustries.com" className="hover:text-blue-600 transition-colors">
              careers@ulinkindustries.com
            </a>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="md:col-span-6 flex flex-col justify-center pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-slate-200/80 pt-6 md:pt-0">
          {submitted ? (
            <div className="rounded-[3px] bg-blue-50/50 border border-blue-100 p-6 text-center text-slate-800">
              <p className="font-bold text-[16px] text-blue-600">Gửi đơn ứng tuyển thành công!</p>
              <p className="text-body-regular text-slate-500 mt-2">
                Cảm ơn bạn đã quan tâm. Đội ngũ Tuyển dụng ULink sẽ liên hệ lại với bạn ngay khi có vị trí thích hợp.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setEmail('');
                  setFileName('');
                }}
                className="mt-4 text-body-regular font-semibold text-blue-600 hover:underline"
              >
                Gửi đơn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-body-regular font-bold text-slate-500 uppercase tracking-wider">
                    HỌ VÀ TÊN
                  </label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-[3px] border border-slate-200 px-4 py-2.5 text-body-regular outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-body-regular font-bold text-slate-500 uppercase tracking-wider">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    disabled={submitting}
                    placeholder="ban@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[3px] border border-slate-200 px-4 py-2.5 text-body-regular outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 bg-white"
                  />
                </div>
              </div>

              {/* Row 2: CV File Upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body-regular font-bold text-slate-500 uppercase tracking-wider">
                  CV / HỒ SƠ
                </label>
                <div className="relative border border-slate-200 rounded-[3px] p-4 flex items-center gap-3 bg-white hover:border-blue-500 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    disabled={submitting}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                  <div className="h-10 w-10 bg-slate-100 rounded flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="text-body-regular text-slate-400 font-medium truncate">
                    {fileName || 'PDF hoặc DOC, tối đa 5 MB'}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-body-regular font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {submitting ? 'Đang gửi...' : 'Gửi đơn ứng tuyển'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {error && (
                <p className="text-body-regular text-red-500 font-bold bg-red-50 px-3 py-1.5 rounded-[3px] border border-red-100">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

