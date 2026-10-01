import type { JobDetailVM } from '@/lib/careers-data';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
      <div className="h-4 w-1 bg-[#1769E2] rounded-full" />
      <h2 className="text-[#162233] font-semibold text-lg lg:text-[20px] leading-[28px]">
        {children}
      </h2>
    </div>
  );
}

/** Renders a stored HTML blob with consistent prose styling. */
function RichText({ html }: { html: string }) {
  return (
    <div
      className="job-rich-text text-[#617084] font-normal text-sm lg:text-[15px] leading-[22px] [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2 [&_strong]:text-[#162233] [&_a]:text-[#1769E2] [&_a]:underline"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function JobDetailContent({ job }: { job: JobDetailVM }) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 border border-[#DDE3E8] rounded-[2px] bg-white p-4 sm:p-6 lg:p-8 shadow-xs">
      {/* Section 1: Mô tả công việc */}
      <div className="flex flex-col gap-4">
        <SectionHeading>Mô tả công việc</SectionHeading>
        {job.summary && (
          <p className="text-[#162233] font-normal text-base lg:text-[16px] leading-[24px]">
            {job.summary}
          </p>
        )}
        {job.description ? (
          <RichText html={job.description} />
        ) : (
          !job.summary && (
            <p className="text-[#617084] italic text-sm">Thông tin mô tả đang được cập nhật.</p>
          )
        )}
      </div>

      {/* Section 2: Yêu cầu */}
      {job.requirements && (
        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
          <SectionHeading>Yêu cầu</SectionHeading>
          <RichText html={job.requirements} />
        </div>
      )}

      {/* Section 3: Quyền lợi */}
      {job.benefits && (
        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
          <SectionHeading>Quyền lợi</SectionHeading>
          <RichText html={job.benefits} />
        </div>
      )}

      {/* Section 4: Địa điểm & thời gian làm việc */}
      <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
        <SectionHeading>Địa điểm & thời gian làm việc</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 p-3.5 rounded-[2px] bg-[#F5F8FC]/60 border border-slate-100">
            <span className="text-[#617084] font-semibold text-xs uppercase tracking-wider">ĐỊA ĐIỂM LÀM VIỆC</span>
            <span className="text-[#162233] font-semibold text-sm lg:text-[14px]">{job.location || 'ULink Industries'}</span>
            <span className="text-[#617084] font-normal text-xs lg:text-[14px]">Làm việc tại văn phòng ULink Industries.</span>
          </div>
          <div className="flex flex-col gap-1 p-3.5 rounded-[2px] bg-[#F5F8FC]/60 border border-slate-100">
            <span className="text-[#617084] font-semibold text-xs uppercase tracking-wider">GIỜ LÀM VIỆC</span>
            <span className="text-[#162233] font-semibold text-sm lg:text-[14px]">Thứ 2 – Thứ 6, 08:00 – 17:30</span>
            <span className="text-[#617084] font-normal text-xs lg:text-[14px]">Chi tiết trao đổi thêm trong buổi phỏng vấn.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
