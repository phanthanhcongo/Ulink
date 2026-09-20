'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { submitContactRequest } from '@/lib/contact-submit';

interface OrderDeliveryCompletedViewProps {
  orderCode?: string;
  shippingMethod?: string;
  itemCount?: number;
  totalWeight?: number;
  totalAmount?: number;
}

export function OrderDeliveryCompletedView({
  orderCode = '',
  shippingMethod = 'ULink Fleet (Vận chuyển B2B hỏa tốc)',
  itemCount = 2,
  totalWeight = 700,
  totalAmount = 27378000
}: OrderDeliveryCompletedViewProps) {
  // Card 2 state: Rating
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackCriteria, setFeedbackCriteria] = useState<Record<string, 'up' | 'down' | null>>({
    time: 'up',
    condition: 'up',
    staff: 'up'
  });
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);

  // Card 3 state: Incident Report
  const [selectedIssues, setSelectedIssues] = useState<string[]>(['damage']);
  const [incidentSubmitting, setIncidentSubmitting] = useState(false);
  const [incidentDone, setIncidentDone] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const toggleCriteria = (key: string, value: 'up' | 'down') => {
    setFeedbackCriteria((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }));
  };

  const toggleIssue = (issueKey: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueKey) ? prev.filter((i) => i !== issueKey) : [...prev, issueKey]
    );
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitting(true);

    const payload = {
      name: `Khách hàng đơn ${orderCode || 'B2B'}`,
      email: 'feedback@ulink-partner.vn',
      phone: 'N/A',
      subject: `[Đánh giá chất lượng giao hàng] Đơn hàng ${orderCode || 'B2B'} - ${rating} sao`,
      message: `ĐÁNH GIÁ CHẤT LƯỢNG GIAO HÀNG B2B:
- Mã đơn hàng: ${orderCode || 'N/A'}
- Mức độ hài lòng chung: ${rating}/5 sao
- Thời gian giao hàng: ${feedbackCriteria.time === 'up' ? 'Hài lòng (Đúng giờ, đúng hẹn)' : feedbackCriteria.time === 'down' ? 'Không hài lòng' : 'Chưa đánh giá'}
- Tình trạng hàng hóa: ${feedbackCriteria.condition === 'up' ? 'Hài lòng (Nguyên vẹn, không móp méo)' : feedbackCriteria.condition === 'down' ? 'Không hài lòng' : 'Chưa đánh giá'}
- Thái độ nhân viên giao vận: ${feedbackCriteria.staff === 'up' ? 'Hài lòng (Chuyên nghiệp, nhiệt tình)' : feedbackCriteria.staff === 'down' ? 'Không hài lòng' : 'Chưa đánh giá'}
- Nhận xét thêm: ${reviewComment.trim() || 'Không có nhận xét thêm'}`
    };

    const res = await submitContactRequest(payload);
    setReviewSubmitting(false);

    if (res.ok) {
      setReviewDone(true);
      toast.success('Cảm ơn bạn đã gửi đánh giá chất lượng giao hàng!');
    } else {
      toast.error(res.message || 'Không thể gửi đánh giá. Vui lòng thử lại.');
    }
  };

  const issueLabelsMap: Record<string, string> = {
    damage: 'Hàng hóa bị hư hỏng / móp méo',
    missing: 'Thiếu sản phẩm so với thực tế đặt',
    wrong_item: 'Sai chủng loại sản phẩm bàn giao',
    other: 'Khác / Lý do khác'
  };

  const handleIncidentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIssues.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 loại sự cố để báo cáo.');
      return;
    }

    setIncidentSubmitting(true);

    const issueTextList = selectedIssues.map((id) => `- ${issueLabelsMap[id] || id}`).join('\n');

    const payload = {
      name: `Báo cáo sự cố đơn ${orderCode || 'B2B'}`,
      email: 'support@ulink-partner.vn',
      phone: 'N/A',
      subject: `[BÁO CÁO SỰ CỐ ĐƠN NHẬN] Đơn hàng ${orderCode || 'B2B'}`,
      message: `BÁO CÁO SỰ CỐ ĐƠN HÀNG B2B:
- Mã đơn hàng: ${orderCode || 'N/A'}
- Các sự cố gặp phải:
${issueTextList}
- Hình ảnh/Bằng chứng đính kèm: ${uploadedFiles.length > 0 ? uploadedFiles.join(', ') : 'Chưa đính kèm file'}`
    };

    const res = await submitContactRequest(payload);
    setIncidentSubmitting(false);

    if (res.ok) {
      setIncidentDone(true);
      toast.success('Đã gửi báo cáo sự cố! Đội ngũ hỗ trợ ULink sẽ liên hệ với bạn ngay.');
    } else {
      toast.error(res.message || 'Không thể gửi báo cáo sự cố. Vui lòng thử lại.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...names]);
      toast.success(`Đã tải lên ${names.length} tập tin/hình ảnh.`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start font-sans text-[#162233]">
      {/* LEFT COLUMN: 2 Cards (Kiện hàng & Đánh giá chất lượng) */}
      <div className="lg:col-span-8 space-y-6">
        {/* CARD 1: Thông tin kiện hàng giao nhận */}
        <div className="bg-white border border-[#DCE0E5] rounded-xl p-6 sm:p-7 shadow-2xs space-y-5">
          <h3 className="text-lg sm:text-xl font-bold text-[#162233]">
            Thông tin kiện hàng giao nhận
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 pb-2 border-b border-[#F0F3F7]">
            {/* Col 1: Phương thức vận chuyển */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm text-[#617084] font-medium block">
                Phương thức vận chuyển
              </span>
              <p className="text-sm sm:text-base font-bold text-[#162233] leading-snug">
                {shippingMethod}
              </p>
            </div>

            {/* Col 2: Quy mô kiện hàng */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm text-[#617084] font-medium block">
                Quy mô kiện hàng
              </span>
              <p className="text-sm sm:text-base font-bold text-[#162233] leading-snug">
                {itemCount} sản phẩm ({totalWeight} kg tổng khối lượng)
              </p>
            </div>

            {/* Col 3: Tổng giá trị thanh toán */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm text-[#617084] font-medium block">
                Tổng giá trị thanh toán
              </span>
              <p className="text-lg sm:text-xl font-bold text-[#1769E2] leading-none pt-0.5">
                {formatPrice(totalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* CARD 2: Đánh giá chất lượng giao hàng */}
        <div className="bg-white border border-[#DCE0E5] rounded-xl p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#162233]">
              Đánh giá chất lượng giao hàng
            </h3>
            <p className="text-xs sm:text-sm text-[#617084]">
              Phản hồi của bạn giúp ULink không ngừng nâng cao chất lượng dịch vụ vận tải công nghiệp.
            </p>
          </div>

          {reviewDone ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-emerald-800 flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Đã gửi đánh giá thành công!</p>
                <p className="text-xs text-emerald-700">
                  Cảm ơn ý kiến đóng góp quý báu của quý khách.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              {/* Section 1: Mức độ hài lòng chung */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-[#162233]">
                  Mức độ hài lòng chung
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    const isFilled = (hoverRating || rating) >= starIndex;
                    return (
                      <button
                        type="button"
                        key={starIndex}
                        onMouseEnter={() => setHoverRating(starIndex)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starIndex)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            isFilled
                              ? 'fill-[#F59E0B] text-[#F59E0B]'
                              : 'fill-slate-100 text-[#CBD5E1]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Đánh giá chi tiết các tiêu chí */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs sm:text-sm font-bold text-[#162233]">
                  Đánh giá chi tiết các tiêu chí
                </label>

                <div className="space-y-2.5">
                  {/* Criteria 1 */}
                  <div className="flex items-center justify-between gap-4 py-1 border-b border-slate-100">
                    <span className="text-xs sm:text-sm text-[#162233]">
                      Thời gian giao hàng (Đúng giờ, đúng hẹn cam kết)
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleCriteria('time', 'up')}
                        className={`p-2 rounded-md border transition-colors ${
                          feedbackCriteria.time === 'up'
                            ? 'bg-blue-50 border-[#1769E2] text-[#1769E2]'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCriteria('time', 'down')}
                        className={`p-2 rounded-md border transition-colors ${
                          feedbackCriteria.time === 'down'
                            ? 'bg-red-50 border-red-500 text-red-500'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Criteria 2 */}
                  <div className="flex items-center justify-between gap-4 py-1 border-b border-slate-100">
                    <span className="text-xs sm:text-sm text-[#162233]">
                      Tình trạng hàng hóa (Nguyên vẹn, không móp méo, ướt màng)
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleCriteria('condition', 'up')}
                        className={`p-2 rounded-md border transition-colors ${
                          feedbackCriteria.condition === 'up'
                            ? 'bg-blue-50 border-[#1769E2] text-[#1769E2]'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCriteria('condition', 'down')}
                        className={`p-2 rounded-md border transition-colors ${
                          feedbackCriteria.condition === 'down'
                            ? 'bg-red-50 border-red-500 text-red-500'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Criteria 3 */}
                  <div className="flex items-center justify-between gap-4 py-1 border-b border-slate-100">
                    <span className="text-xs sm:text-sm text-[#162233]">
                      Thái độ nhân viên giao vận (Chuyên nghiệp, hỗ trợ nhiệt tình)
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleCriteria('staff', 'up')}
                        className={`p-2 rounded-md border transition-colors ${
                          feedbackCriteria.staff === 'up'
                            ? 'bg-blue-50 border-[#1769E2] text-[#1769E2]'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCriteria('staff', 'down')}
                        className={`p-2 rounded-md border transition-colors ${
                          feedbackCriteria.staff === 'down'
                            ? 'bg-red-50 border-red-500 text-red-500'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Nhận xét thêm */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs sm:text-sm font-bold text-[#162233]">
                  Nhận xét thêm
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                  className="w-full px-4 py-3 rounded-lg border border-[#DCE0E5] text-sm text-[#162233] placeholder-[#94A3B8] focus:outline-none focus:border-[#1769E2] focus:ring-1 focus:ring-[#1769E2] transition-colors resize-y"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewComment('')}
                  className="px-6 py-2.5 rounded-lg border border-[#1769E2] text-[#1769E2] font-semibold text-sm hover:bg-blue-50 transition-colors"
                >
                  Bỏ qua
                </button>
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-[#1769E2] hover:bg-[#1257C0] text-white font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  {reviewSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Gửi đi
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Card 3 (Báo cáo sự cố đơn nhận) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white border border-[#DCE0E5] rounded-xl p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#162233]">
              Báo cáo sự cố đơn nhận
            </h3>
            <p className="text-xs text-[#617084]">
              Nếu có bất kỳ sai lệch nào so với biên bản giao hàng, vui lòng báo cáo ngay tại đây.
            </p>
          </div>

          {incidentDone ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800 flex items-center gap-3 text-xs">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Đã gửi báo cáo sự cố thành công!</span>
            </div>
          ) : (
            <form onSubmit={handleIncidentSubmit} className="space-y-5">
              {/* Checkboxes */}
              <div className="space-y-3 pt-1">
                {[
                  { id: 'damage', label: 'Hàng hóa bị hư hỏng / móp méo' },
                  { id: 'missing', label: 'Thiếu sản phẩm so với thực tế đặt' },
                  { id: 'wrong_item', label: 'Sai chủng loại sản phẩm bàn giao' },
                  { id: 'other', label: 'Khác / Lý do khác' }
                ].map((item) => {
                  const isChecked = selectedIssues.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer select-none text-xs sm:text-sm font-medium text-[#162233]"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleIssue(item.id)}
                        className="w-4 h-4 rounded text-[#1769E2] focus:ring-[#1769E2] accent-[#1769E2] border-[#DCE0E5] cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>

              {/* Upload Box */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-[#162233]">
                  Hình ảnh / Bằng chứng thực tế
                </label>
                <label className="border-dashed border-2 border-[#DCE0E5] bg-[#F8FAFC] rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#1769E2] hover:bg-blue-50/40 transition-colors space-y-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-5 h-5 text-[#617084]" />
                  </div>
                  <p className="text-xs text-[#617084] max-w-[200px] leading-relaxed">
                    Tải ảnh lên tại đây để nhân viên kỹ thuật hỗ trợ kịp thời
                  </p>
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="text-xs text-emerald-600 font-medium pt-1">
                    Đã chọn {uploadedFiles.length} tệp hình ảnh
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedIssues([])}
                  className="px-5 py-2 rounded-lg border border-[#1769E2] text-[#1769E2] font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-colors"
                >
                  Bỏ qua
                </button>
                <button
                  type="submit"
                  disabled={incidentSubmitting}
                  className="px-5 py-2 rounded-lg bg-[#1769E2] hover:bg-[#1257C0] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                >
                  {incidentSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Gửi đi
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
