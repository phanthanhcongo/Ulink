'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { UploadCloud, FileText, X, ArrowRight } from 'lucide-react';

export function ApplyForm() {
  const router = useRouter();
  const params = useParams();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const phone = String(formData.get('phone') ?? '');
    const birthday = String(formData.get('birthday') ?? '');
    const gender = String(formData.get('gender') ?? '');
    const educationLevel = String(formData.get('education_level') ?? '');
    const school = String(formData.get('school') ?? '');
    const major = String(formData.get('major') ?? '');
    const graduationYear = String(formData.get('graduation_year') ?? '');
    const lastCompany = String(formData.get('last_company') ?? '');
    const lastPosition = String(formData.get('last_position') ?? '');
    const workPeriod = String(formData.get('work_period') ?? '');
    const workDesc = String(formData.get('work_desc') ?? '');
    const coverLetter = String(formData.get('cover_letter') ?? '');
    const cvName = cvFile ? cvFile.name : 'Chưa đính kèm CV';

    const message = `
[THÔNG TIN ỨNG VIÊN]
- Họ tên: ${name}
- Email: ${email}
- Số điện thoại: ${phone}
- Ngày sinh: ${birthday}
- Giới tính: ${gender}

[TRÌNH ĐỘ HỌC VẤN]
- Bậc học: ${educationLevel}
- Trường: ${school}
- Chuyên ngành: ${major}
- Năm tốt nghiệp: ${graduationYear}

[KINH NGHIỆM LÀM VIỆC]
- Công ty gần nhất: ${lastCompany}
- Vị trí: ${lastPosition}
- Thời gian: ${workPeriod}
- Mô tả: ${workDesc}

[HỒ SƠ ĐÍNH KÈM]
- Tên tệp CV: ${cvName}

[THƯ GIỚI THIỆU]
${coverLetter || 'Không có thư giới thiệu.'}
`.trim();

    const slug = params?.slug as string;
    const jobTitle = slug ? `Vị trí: ${slug.toUpperCase()}` : 'Vị trí Tuyển Dụng';
    const subject = `ỨNG TUYỂN - ${jobTitle}`;

    try {
      const { submitContactRequest } = await import('@/lib/contact-submit');
      const result = await submitContactRequest({
        name,
        email,
        phone,
        subject,
        message
      });

      if (result.ok) {
        form.reset();
        setCvFile(null);
        router.push('/about/careers/apply-success');
        return;
      }
      setError(result.message || 'Không thể gửi đơn ứng tuyển. Vui lòng thử lại.');
    } catch (err) {
      setError('Đã xảy ra lỗi kết nối, vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-[2px] text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Section 01: Thông tin cá nhân */}
      <div className="rounded-[2px] bg-white p-5 sm:p-6 lg:p-8 border border-[#CAD5E2] shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1257C0] font-bold text-xs shrink-0">
            01
          </div>
          <h2 className="text-[#162233] font-bold text-lg lg:text-[18px]">Thông tin cá nhân</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
              Họ và tên <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Nhập đầy đủ họ và tên của bạn"
              className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
                Địa chỉ Email <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="ví dụ: name@example.com"
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
                Số điện thoại <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Nhập số điện thoại liên hệ"
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
                Ngày tháng năm sinh <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                name="birthday"
                required
                placeholder="DD/MM/YYYY"
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
                Giới tính <span className="text-[#DC2626]">*</span>
              </label>
              <select
                name="gender"
                required
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] bg-white"
              >
                <option value="khong-yeu-cau">Không yêu cầu</option>
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section 02: Trình độ học vấn */}
      <div className="rounded-[2px] bg-white p-5 sm:p-6 lg:p-8 border border-[#CAD5E2] shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1257C0] font-bold text-xs shrink-0">
            02
          </div>
          <h2 className="text-[#162233] font-bold text-lg lg:text-[18px]">Trình độ học vấn</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
                Bậc học cao nhất <span className="text-[#DC2626]">*</span>
              </label>
              <select
                name="education_level"
                required
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] bg-white"
              >
                <option value="dai-hoc">Đại học</option>
                <option value="thac-si">Thạc sĩ</option>
                <option value="cao-dang">Cao đẳng</option>
                <option value="khac">Khác</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
                Trường đại học / Cao đẳng <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                name="school"
                required
                placeholder="Tên trường học của bạn"
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
                Chuyên ngành <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                name="major"
                required
                placeholder="Chuyên ngành đào tạo"
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
                Năm tốt nghiệp <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                name="graduation_year"
                required
                placeholder="ví dụ: 2024"
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 03: Kinh nghiệm làm việc gần nhất */}
      <div className="rounded-[2px] bg-white p-5 sm:p-6 lg:p-8 border border-[#CAD5E2] shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1257C0] font-bold text-xs shrink-0">
            03
          </div>
          <h2 className="text-[#162233] font-bold text-lg lg:text-[18px]">Kinh nghiệm làm việc gần nhất</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">Tên công ty gần nhất</label>
              <input
                type="text"
                name="last_company"
                placeholder="Nhập tên công ty bạn từng làm việc"
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">Vị trí đảm nhiệm</label>
              <input
                type="text"
                name="last_position"
                placeholder="Ví dụ: Nhân viên kinh doanh, Trưởng nhóm..."
                className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">Thời gian làm việc</label>
            <input
              type="text"
              name="work_period"
              placeholder="Ví dụ: 06/2022 - Hiện tại hoặc 2 năm"
              className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-2.5 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">Mô tả ngắn về công việc và thành tựu nổi bật</label>
            <textarea
              name="work_desc"
              rows={4}
              placeholder="Nêu các nhiệm vụ chính và KPI hoặc kết quả kinh doanh nổi bật bạn đã đạt được..."
              className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-3 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084] resize-none h-[120px]"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Section 04: Hồ sơ đính kèm (CV) */}
      <div className="rounded-[2px] bg-white p-5 sm:p-6 lg:p-8 border border-[#CAD5E2] shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1257C0] font-bold text-xs shrink-0">
            04
          </div>
          <h2 className="text-[#162233] font-bold text-lg lg:text-[18px]">Hồ sơ đính kèm (CV)</h2>
        </div>

        <div className="relative border-2 border-dashed border-[#1769E2] rounded-[2px] p-6 sm:p-8 lg:p-10 bg-[#F5F8FC] flex flex-col items-center justify-center text-center transition-all hover:bg-blue-50/80 hover:border-[#1257C0] cursor-pointer">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1257C0] mb-3">
            <UploadCloud className="h-6 w-6 stroke-[2.25]" />
          </div>
          {cvFile ? (
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[2px] border border-[#1769E2] shadow-xs text-sm font-semibold text-[#1769E2]">
              <FileText className="h-4 w-4" />
              <span className="truncate">{cvFile.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCvFile(null);
                }}
                className="text-slate-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <p className="text-[#162233] font-bold text-base lg:text-[15px]">Kéo thả tệp tin CV của bạn vào đây</p>
              <p className="text-[#617084] font-normal text-xs lg:text-[13px] mt-1">
                Hoặc bấm để duyệt tệp tin từ máy tính
              </p>
              <p className="text-[#617084] font-normal text-xs lg:text-[12px] mt-2">
                Hỗ trợ định dạng .pdf, .doc, .docx. Dung lượng tối đa 15MB.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Section 05: Thư giới thiệu / Thông điệp & Submit */}
      <div className="rounded-[2px] bg-white p-5 sm:p-6 lg:p-8 border border-[#CAD5E2] shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1257C0] font-bold text-xs shrink-0">
            05
          </div>
          <h2 className="text-[#162233] font-bold text-lg lg:text-[18px]">
            Thư giới thiệu / Thông điệp gửi nhà tuyển dụng
          </h2>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#162233] font-semibold text-sm lg:text-[14px]">
            Thư giới thiệu (Không bắt buộc)
          </label>
          <textarea
            name="cover_letter"
            rows={5}
            placeholder="Chia sẻ lý do bạn mong muốn đồng hành cùng ULink Industries và vì sao bạn là mảnh ghép hoàn hảo cho vị trí này..."
            className="w-full rounded-[2px] border border-[#CAD5E2] px-4 py-3 text-[#162233] font-normal text-sm lg:text-[14px] outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2]/20 bg-white placeholder:text-[#617084] resize-none h-[160px]"
          ></textarea>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            required
            id="commit"
            className="mt-1 h-4 w-4 rounded-[2px] border-[#1769E2] text-[#1769E2] focus:ring-[#1769E2] shrink-0"
          />
          <label htmlFor="commit" className="text-[#617084] font-normal text-xs lg:text-[13px] leading-[20px]">
            Tôi cam kết thông tin cung cấp là chính xác và đồng ý cho phép ULink Industries sử dụng dữ liệu này phục vụ cho quy trình tuyển dụng và đánh giá năng lực theo đúng Chính sách bảo mật thông tin.
          </label>
        </div>

        {/* Submit Wrapper */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <span className="text-[#617084] font-normal text-xs lg:text-[14px]">
            Đơn ứng tuyển sẽ được gửi trực tiếp đến bộ phận nhân sự.
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#1769E2] hover:bg-[#1257C0] px-8 py-3 text-white font-semibold text-base shadow-sm transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-60"
          >
            <span>{submitting ? 'Đang gửi...' : 'Gửi đi'}</span>
            <ArrowRight className="h-4 w-4 stroke-[2.25]" />
          </button>
        </div>
      </div>
    </form>
  );
}

