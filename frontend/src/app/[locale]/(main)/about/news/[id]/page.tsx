import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link, redirect } from '@/i18n/navigation';
import { ABOUT_NEWS_ARTICLES, getAboutNewsArticleById } from '@/components/about/about-news-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface PageProps {
  params: {
    locale: string;
    id: string;
  };
}

export function generateStaticParams() {
  return ABOUT_NEWS_ARTICLES.map((article) => ({ id: article.id }));
}

export default async function AboutNewsDetailPage({ params }: PageProps) {
  const { locale, id } = params;
  setRequestLocale(locale);

  const article = getAboutNewsArticleById(id);

  if (!article) {
    redirect({ href: '/about/news', locale });
  }

  const currentArticle = article as NonNullable<typeof article>;

  const relatedArticles = currentArticle.relatedIds
    .map((relatedId) => getAboutNewsArticleById(relatedId))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <article className="bg-slate-50/70 pb-12 sm:pb-16 lg:pb-20">
      <div className="page-container space-y-6 sm:space-y-8">
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none"
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Về chúng tôi', href: '/about' },
            { label: 'Tin tức', href: '/about/news' },
            { label: currentArticle.category }
          ]}
          backLink={{
            label: 'Quay lại danh sách tin tức',
            href: '/about/news'
          }}
        />

        <header className="overflow-hidden rounded-[3px] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="mb-3 sm:mb-4 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-caption-responsive font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {currentArticle.category}
              </div>
              <h1 className="max-w-3xl text-section-title sm:text-hero-title font-bold tracking-tight text-slate-900">
                {currentArticle.title}
              </h1>
              <p className="mt-3 sm:mt-4 max-w-3xl text-body-regular leading-6 sm:leading-7 text-slate-600">
                {currentArticle.summary}
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-5 border-t border-slate-100 pt-4 sm:pt-6 text-caption-responsive sm:text-body-regular text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <User className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-brand" />
                  <span className="line-clamp-1">{currentArticle.author}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-brand" />
                  {currentArticle.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-brand" />
                  {currentArticle.readTime}
                </span>
              </div>
            </div>

            <div className="relative min-h-[200px] sm:min-h-[260px] bg-slate-100 lg:min-h-full">
              <Image
                src={currentArticle.coverImage}
                alt={currentArticle.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>
        </header>

        <main className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-[1.4fr_0.6fr]">
          <section className="rounded-[3px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 sm:space-y-8">
            <div className="rounded-[3px] bg-blue-50/70 p-4 sm:p-5 ring-1 ring-inset ring-blue-100">
              <h2 className="text-caption-responsive sm:text-body-regular font-bold uppercase tracking-wide text-blue-800">
                Tóm tắt nhanh
              </h2>
              <ul className="mt-3 sm:mt-4 grid gap-2 sm:gap-3">
                {currentArticle.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-caption-responsive sm:text-body-regular text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-3.5 sm:h-4 w-3.5 sm:w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {currentArticle.sections.map((section) => (
                <section key={section.title}>
                  <h3 className="text-body-regular sm:text-section-title font-bold text-slate-900">{section.title}</h3>
                  <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-caption-responsive sm:text-body-large leading-6 sm:leading-7 text-slate-600">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 rounded-[3px] bg-slate-50 p-4 sm:p-5 text-caption-responsive sm:text-body-regular text-slate-700">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[3px] border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-body-regular sm:text-card-title font-bold text-slate-900">Bài viết liên quan</h2>
              <div className="mt-4 sm:mt-5 space-y-3">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.id}
                    href={`/about/news/${item.id}`}
                    className="group block rounded-[3px] border border-slate-100 p-3 sm:p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <div className="text-caption-responsive font-semibold text-blue-700">{item.category}</div>
                    <h3 className="mt-1.5 sm:mt-2 text-caption-responsive sm:text-body-regular font-bold text-slate-900 group-hover:text-brand line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-caption-responsive sm:text-body-regular text-slate-500 line-clamp-2">{item.summary}</p>
                    <span className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-caption-responsive font-semibold text-brand">
                      Đọc chi tiết
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[3px] border border-slate-200 bg-slate-900 p-4 sm:p-6 text-white shadow-sm">
              <p className="text-caption-responsive font-semibold uppercase tracking-[0.2em] text-blue-300">
                Cập nhật liên tục
              </p>
              <h2 className="mt-2 sm:mt-3 text-body-regular sm:text-section-title font-bold leading-snug">Theo dõi thêm tin tức thị trường</h2>
              <p className="mt-2 sm:mt-3 text-caption-responsive sm:text-body-regular leading-6 sm:leading-7 text-slate-300">
                Chúng tôi sẽ tiếp tục cập nhật các bài viết phân tích, xu hướng và diễn biến mới nhất để hỗ trợ đội ngũ mua hàng, vận hành và chiến lược.
              </p>
              <Link
                href="/about/news"
                className="mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-[3px] bg-white px-3 sm:px-4 py-2 text-caption-responsive sm:text-body-regular font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Xem toàn bộ tin tức
                <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              </Link>
            </div>
          </aside>
        </main>
      </div>
    </article>
  );
}
