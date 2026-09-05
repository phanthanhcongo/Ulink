import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getEventDetailBySlug } from '@/components/events/event-detail-data';
import { EventRegisterForm } from '@/components/events/event-register-form';
import { Breadcrumb } from '@/components/ui/breadcrumb';

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const event = getEventDetailBySlug(slug);
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  if (!event) {
    return {
      title: isVi ? 'Sự kiện không tồn tại' : isJa ? 'イベントが見つかりません' : 'Event not found'
    };
  }

  return {
    title: `${event.title} | ${isVi ? 'Đăng ký sự kiện' : isJa ? 'イベント登録' : 'Event Registration'}`
  };
}

export default async function EventRegisterPage({ params }: Props) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const event = getEventDetailBySlug(slug);

  if (!event) {
    notFound();
  }

  const L = {
    home: { vi: 'Trang chủ', en: 'Home', ja: 'ホーム' },
    resources: { vi: 'Tài nguyên', en: 'Resources', ja: 'リソース' },
    event: { vi: 'Sự kiện', en: 'Events', ja: 'イベント' },
    register: { vi: 'Đăng ký', en: 'Register', ja: '登録' },
    paymentTitle: { vi: 'Thông tin vé & Thanh toán', en: 'Ticket & Payment Info', ja: 'チケットと支払い情報' },
    paymentDesc: {
      vi: 'Vui lòng chuyển khoản theo thông tin bên dưới để hoàn tất đăng ký tham dự sự kiện.',
      en: 'Please transfer payment to the account below to complete your registration.',
      ja: '登録を完了するために、以下のアカウントに送金してください。'
    },
    ticketInfo: { vi: 'Vé tham dự', en: 'Admission Ticket', ja: '入場チケット' },
    eventName: { vi: 'Sự kiện', en: 'Event', ja: 'イベント' },
    eventDate: { vi: 'Ngày', en: 'Date', ja: '日付' },
    eventLocation: { vi: 'Địa điểm', en: 'Location', ja: '会場' },
    ticketType: { vi: 'Loại vé', en: 'Ticket Type', ja: 'チケット種類' },
    bankTitle: { vi: 'Thông tin chuyển khoản', en: 'Bank Transfer Details', ja: '振込先情報' },
    bankName: { vi: 'Ngân hàng', en: 'Bank', ja: '銀行名' },
    bankAccount: { vi: 'Số tài khoản', en: 'Account Number', ja: '口座番号' },
    bankHolder: { vi: 'Chủ tài khoản', en: 'Account Holder', ja: '口座名義' },
    bankBranch: { vi: 'Chi nhánh', en: 'Branch', ja: '支店' },
    bankMemo: { vi: 'Nội dung CK', en: 'Memo / Reference', ja: '振込依頼人名/伝言' },
    qrTitle: { vi: 'Quét mã QR để thanh toán', en: 'Scan QR to pay', ja: 'QRコードで支払う' },
    qrFooter: {
      vi: 'Hoặc liên hệ BTC để được hỗ trợ thanh toán trực tiếp.',
      en: 'Or contact organizer for direct support.',
      ja: 'または、直接サポートについて主催者にお問い合わせください。'
    }
  };

  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  return (
    <main className="min-h-screen bg-[#F4F6F8] pb-16">
      {/* Top Breadcrumb */}
      <div className="mx-auto max-w-[900px] px-4 sm:px-8 py-6">
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none"
          items={[
            { label: L.home[locale as 'vi' | 'en' | 'ja'], href: '/' },
            { label: L.resources[locale as 'vi' | 'en' | 'ja'], href: '/resources' },
            { label: event.title, href: `/resources/events/${event.slug}` },
            { label: L.register[locale as 'vi' | 'en' | 'ja'] }
          ]}
        />

        {/* Headings */}
        <div className="mt-6">
          <h1 className="text-hero-title font-black text-slate-900 tracking-tight font-sans">
            Đăng ký tham gia sự kiện
          </h1>
          <p className="mt-2 text-body-regular font-bold text-blue-600 font-sans">
            {event.title}
          </p>
        </div>

        {/* Khối 1: Thông tin vé & Thanh toán */}
        <div className="mt-10  rounded-[3px] bg-white p-5">
          <h2 className="text-card-title font-bold text-slate-900 font-sans">
            {L.paymentTitle[locale as 'vi' | 'en' | 'ja']}
          </h2>
          <p className="text-caption-responsive text-slate-500 mt-1 font-sans">
            {L.paymentDesc[locale as 'vi' | 'en' | 'ja']}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-6 items-stretch">
            {/* Cột trái: Thông tin vé và tài khoản */}
            <div className="space-y-6 flex flex-col justify-between">
              {/* Thẻ Vé tham dự */}
              <div className="rounded-[3px] border border-slate-200 bg-[#F5F8FC] p-5 shadow-xs flex-1">
                <span className="inline-flex items-center gap-1 rounded-[3px] bg-yellow-50 px-2.5 py-1 text-caption-responsive font-bold text-yellow-700 border border-yellow-100 font-sans">
                  🎫 {L.ticketInfo[locale as 'vi' | 'en' | 'ja']}
                </span>

                <div className="mt-4 grid grid-cols-[90px_1fr] gap-y-2.5 text-caption-responsive font-sans">
                  <span className="text-slate-400">{L.eventName[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-bold text-slate-800">{event.title}</span>

                  <span className="text-slate-400">{L.eventDate[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-semibold text-slate-700">{event.date} — {event.time}</span>

                  <span className="text-slate-400">{L.eventLocation[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-semibold text-slate-700">{event.locationName || event.location}</span>

                  <span className="text-slate-400">{L.ticketType[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-semibold text-slate-700">Standard — {event.price || 'Miễn phí'}</span>
                </div>
              </div>

              {/* Thẻ Thông tin chuyển khoản */}
              <div className="rounded-[3px] border border-slate-200 bg-white p-5 shadow-xs">
                <h4 className="text-body-regular font-bold text-slate-800 border-b border-slate-100 pb-2.5 font-sans">
                  {L.bankTitle[locale as 'vi' | 'en' | 'ja']}
                </h4>

                <div className="mt-4 grid grid-cols-[90px_1fr] gap-y-2.5 text-caption-responsive font-sans">
                  <span className="text-slate-400">{L.bankName[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-bold text-slate-800">Vietcombank (VCB)</span>

                  <span className="text-slate-400">{L.bankAccount[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-bold text-blue-600 tracking-tight">1234 5678 9012</span>

                  <span className="text-slate-400">{L.bankHolder[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-bold text-slate-800">CÔNG TY TNHH ULINK INDUSTRIES</span>

                  <span className="text-slate-400">{L.bankBranch[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-semibold text-slate-700">Hà Nội</span>

                  <span className="text-slate-400">{L.bankMemo[locale as 'vi' | 'en' | 'ja']}</span>
                  <span className="font-bold text-slate-800 select-all">ULINK2026 - [Họ tên]</span>
                </div>
              </div>
            </div>

            {/* Cột phải: QR Code */}
            <div className="rounded-[3px] border border-slate-200 bg-[#F5F8FC] p-6 flex flex-col items-center justify-between text-center shadow-xs h-fit">
              <div>
                <p className="text-caption-responsive font-bold uppercase tracking-tight text-slate-400">
                  {L.qrTitle[locale as 'vi' | 'en' | 'ja']}
                </p>

                {/* SVG QR Code Pattern */}
                <div className="mt-4 bg-white p-3 border border-slate-100 rounded-[3px] shadow-xs inline-block">
                  <svg className="h-32 w-32 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />

                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />

                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />

                    <rect x="40" y="0" width="10" height="20" />
                    <rect x="40" y="25" width="15" height="10" />
                    <rect x="60" y="15" width="5" height="15" />
                    <rect x="0" y="40" width="15" height="10" />
                    <rect x="20" y="40" width="15" height="20" />
                    <rect x="45" y="45" width="20" height="10" />
                    <rect x="70" y="40" width="20" height="15" />
                    <rect x="40" y="70" width="10" height="10" />
                    <rect x="55" y="65" width="10" height="25" />
                    <rect x="75" y="65" width="15" height="10" />
                    <rect x="70" y="80" width="15" height="15" />
                    <rect x="85" y="40" width="15" height="10" />
                    <rect x="90" y="55" width="10" height="15" />
                    <rect x="90" y="85" width="10" height="10" />
                  </svg>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-caption-responsive font-bold text-emerald-600">Số tiền: {event.price || 'Miễn phí'}</p>
                <p className="text-caption-responsive text-slate-400 mt-2 max-w-[180px] mx-auto">
                  {L.qrFooter[locale as 'vi' | 'en' | 'ja']}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Khối 2: Thông tin đăng ký cá nhân Form */}
        <div className="mt-10">
          <EventRegisterForm slug={event.slug} eventTitle={event.title} locale={locale as 'vi' | 'en' | 'ja'} />
        </div>
      </div>
    </main>
  );
}
