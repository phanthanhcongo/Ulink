import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EventsClient } from '@/components/events/events-client';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';
  return {
    title: isVi
      ? 'Sự kiện & Hội thảo B2B | ULink B2B'
      : isJa
        ? 'B2Bイベント＆セミナー | ULink B2B'
        : 'B2B Events & Seminars | ULink B2B',
    description: isVi
      ? 'Tham gia các sự kiện kết nối doanh nghiệp B2B, hội thảo kỹ thuật phòng sạch và đào tạo thực hành từ ULink.'
      : isJa
        ? 'ULinkが主催するB2Bビジネスネットワーキングイベント、クリーンルーム技術セミナー、実用的なガウニングトレーニングに参加しましょう。'
        : 'Join B2B business networking events, cleanroom technical seminars, and practical gowning training by ULink.'
  };
}

export default async function EventsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <section className="relative min-h-screen">
      <EventsClient />
    </section>
  );
}
