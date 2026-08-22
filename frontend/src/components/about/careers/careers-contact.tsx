import { Building, Mail } from 'lucide-react';

export function CareersContact() {
  return (
    <section className="py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
        {/* Left Column: HR Contacts */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Liên hệ & Địa chỉ
            </h2>

            {/* VĂN PHÒNG */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <Building className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                <span>VĂN PHÒNG</span>
              </div>
              
              <div className="border-l-[3px] border-l-blue-600 bg-white p-4 rounded-[3px] border border-slate-200/80 shadow-xs flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">
                  ULink Industries - Trụ sở chính
                </span>
                <span className="text-xs text-slate-500 leading-relaxed">
                  Tầng 12, Tòa nhà Charm Suite, số 36 Trần Phú, phường Mỹ Đình 1, quận Nam Từ Liêm, TP. Hà Nội
                </span>
              </div>

              <div className="border-l-[3px] border-l-blue-600 bg-white p-4 rounded-[3px] border border-slate-200/80 shadow-xs flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">
                  ULink Industries - Chi nhánh TP.HCM
                </span>
                <span className="text-xs text-slate-500 leading-relaxed">
                  Lầu 8, Tòa nhà Pearl Plaza, số 561A Điện Biên Phủ, phường 25, quận Bình Thạnh, TP. Hồ Chí Minh
                </span>
              </div>
            </div>

            {/* LIÊN HỆ HỢP TÁC */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <Mail className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                <span>LIÊN HỆ HỢP TÁC</span>
              </div>

              <div className="border-l-[3px] border-l-blue-600 bg-white p-4 rounded-[3px] border border-slate-200/80 shadow-xs flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">Hotline</span>
                <span className="text-xs text-slate-500 leading-relaxed">
                  1900 636 899 (trong nước)<br />
                  84 28 3820 9988 (nước ngoài)
                </span>
              </div>

              <div className="border-l-[3px] border-l-blue-600 bg-white p-4 rounded-[3px] border border-slate-200/80 shadow-xs flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">Hotline doanh nghiệp</span>
                <span className="text-xs text-slate-500 leading-relaxed">
                  1900 636 900 (trong nước)<br />
                  84 28 3820 9900 (nước ngoài)
                </span>
              </div>

              <div className="border-l-[3px] border-l-blue-600 bg-white p-4 rounded-[3px] border border-slate-200/80 shadow-xs flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-800">Email</span>
                <span className="text-xs text-slate-500 leading-relaxed">
                  contact@ulinkindustries.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Google Map */}
        <div className="lg:col-span-7 h-full">
          <div className="relative w-full h-full min-h-[450px] lg:min-h-[580px] overflow-hidden rounded-[3px] border border-slate-200/80 shadow-xs">
            <iframe
              title="ULink Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7297059570197!2d105.79893927602077!3d21.00346768874697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acab23b8df29%3A0xe54eb89e6e1f0e4b!2sNguy%E1%BB%85n%20Tu%C3%A2n%2C%20Thanh%20Xu%C3%A2n%2C%20H%C3%A0%20N%E1%BB%99i!5e0!3m2!1svi!2s!4v1713500000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              className="absolute inset-0"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

