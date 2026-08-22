'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  FileText,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Download,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { MOCK_RESOURCES, MOST_VIEWED_ARTICLES } from './mock-data';
import { ResourcesNews } from '../home';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export interface ResourceData {
  slug: string;
  type: 'news' | 'case-study' | 'doc';
  category: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  coverImage: string;
  pdfUrl?: string;
  pdfSize?: string;
  contentHtml: string;
  highlights?: string[];
  sections?: {
    id: string;
    num: string;
    title: string;
    content: string;
    alertText?: string;
  }[];
  aiSummary?: {
    intro: string;
    bullets: string[];
  };
  audioDuration?: string;
  audioSecs?: number;
  authorRole?: string;
  authorAvatar?: string;
}

interface ResourceDetailClientProps {
  data: ResourceData;
  locale: string;
}

export function ResourceDetailClient({ data, locale }: ResourceDetailClientProps) {
  const localeLang = locale as 'vi' | 'en' | 'ja';

  // State for interactive Audio Player simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const durationSecs = data.audioSecs || 225; // Default duration in seconds (3:45)

  // Simulation timer for playback
  useEffect(() => {
    if (isPlaying) {
      audioIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSecs) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    }

    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, [isPlaying, durationSecs]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // State for active Table of Contents section highlighting (Scroll Spy)
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    if (!data.sections || data.sections.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset

      let matched = false;
      for (const section of data.sections || []) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        const el = document.getElementById('related-section');
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionId('related-section');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.sections]);

  // Social sharing handlers
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast.success(
        localeLang === 'vi'
          ? 'Đã sao chép đường dẫn bài viết!'
          : localeLang === 'ja'
            ? '記事のリンクをコピーしました！'
            : 'Copied article link!'
      );
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Get related resources (exclude current, take 3 items)
  const relatedResources = MOCK_RESOURCES.filter(
    (item) => item.id.toLowerCase() !== data.slug.toLowerCase()
  ).slice(0, 3);

  // Get market trends (latest news - take 4 items)
  const marketTrends = [...MOST_VIEWED_ARTICLES, ...MOCK_RESOURCES]
    .filter((item) => item.id.toLowerCase() !== data.slug.toLowerCase())
    .slice(0, 4);

  return (
    <article suppressHydrationWarning className="min-h-screen bg-slate-50/50 pb-20 pt-8">
      {/* ── BREADCRUMB HEADER ── */}
      <Breadcrumb
        items={[
          {
            label: localeLang === 'vi' ? 'Trang chủ' : localeLang === 'ja' ? 'ホーム' : 'Home',
            href: '/'
          },
          {
            label: localeLang === 'vi' ? 'Tài nguyên' : localeLang === 'ja' ? 'リソース' : 'Resources',
            href: '/resources'
          },
          {
            label: data.category
          }
        ]}
        backLink={{
          label: localeLang === 'vi'
            ? 'Quay lại Danh mục Tài nguyên'
            : localeLang === 'ja'
              ? 'リソースセンターに戻る'
              : 'Back to Resource Center',
          href: '/resources'
        }}
      />

      {/* ── ARTICLE HERO SECTION ── */}
      <header className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="rounded-[3px] bg-white p-6 sm:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />

          {/* Category Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[3px] bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-100">
              <BookOpen className="h-3.5 w-3.5" />
              {data.category}
            </span>
            {data.type === 'doc' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[3px] bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                {localeLang === 'vi' ? 'Tài liệu Kỹ thuật' : localeLang === 'ja' ? '技術資料' : 'Technical Document'}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug lg:leading-tight max-w-4xl">
            {data.title}
          </h1>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-4xl">
            {data.description}
          </p>

          {/* Meta Info Bar & Share Button */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-slate-100 pt-6">
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-200">
                  <Image
                    src={data.authorAvatar || '/images/about/op-team.webp'}
                    alt={data.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="block font-bold text-slate-950">{data.author}</span>
                  <span className="block text-[10px] text-slate-400 font-medium">
                    {data.authorRole || (localeLang === 'vi' ? 'Ban biên tập ULink' : 'ULink Editorial')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand" />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand" />
                <span>{data.readTime}</span>
              </div>
            </div>

            {/* Share & Download PDF Row */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-[3px] border border-slate-100">
                <button
                  onClick={handleCopyLink}
                  title="Copy link"
                  className="p-1.5 rounded-[3px] text-slate-500 hover:text-slate-900 hover:bg-white transition-all shadow-sm"
                >
                  {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
                <button className="p-1.5 rounded-[3px] text-slate-500 hover:text-blue-600 hover:bg-white transition-all shadow-sm">
                  <Facebook className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-[3px] text-slate-500 hover:text-blue-400 hover:bg-white transition-all shadow-sm">
                  <Twitter className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-[3px] text-slate-500 hover:text-blue-800 hover:bg-white transition-all shadow-sm">
                  <Linkedin className="h-4 w-4" />
                </button>
              </div>

              {data.pdfUrl && (
                <a
                  href={data.pdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand hover:bg-brand-strong text-white text-xs font-bold rounded-[3px] transition-all shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  {localeLang === 'vi' ? 'Tải tài liệu PDF' : localeLang === 'ja' ? 'PDFダウンロード' : 'Download PDF'}
                  <span className="text-[10px] text-blue-200">({data.pdfSize || '1.2 MB'})</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── ARTICLE MAIN CONTENT BODY ── */}
      <main className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Cột trái: Table of Contents */}
          {data.sections && data.sections.length > 0 ? (
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start bg-slate-50 p-5 rounded-[3px] border border-slate-200/50">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-5 px-1">
                {localeLang === 'vi' ? 'Mục lục' : localeLang === 'ja' ? '目次' : 'Mục lục'}
              </h3>
              <nav className="flex flex-col gap-3">
                {data.sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      const el = document.getElementById(sec.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 text-left transition-all duration-200 rounded-[3px] border shadow-sm',
                      activeSectionId === sec.id
                        ? 'bg-blue-50 border-blue-200/80 text-slate-900 font-bold'
                        : 'bg-white border-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-900'
                    )}
                  >
                    <span
                      className={cn(
                        'h-7 w-7 flex items-center justify-center rounded-full text-xs font-bold shrink-0 transition-colors',
                        activeSectionId === sec.id ? 'bg-brand text-white' : 'bg-slate-100 text-slate-400'
                      )}
                    >
                      {sec.num.replace('.', '').trim()}
                    </span>
                    <span className="text-xs sm:text-sm tracking-tight leading-snug">{sec.title}</span>
                  </button>
                ))}

                {/* Extra item: Related Articles */}
                <button
                  onClick={() => {
                    const el = document.getElementById('related-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 text-left transition-all duration-200 rounded-[3px] border shadow-sm',
                    activeSectionId === 'related-section'
                      ? 'bg-blue-50 border-blue-200/80 text-slate-900 font-bold'
                      : 'bg-white border-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-900'
                  )}
                >
                  <span
                    className={cn(
                      'h-7 w-7 flex items-center justify-center rounded-full text-xs font-bold shrink-0 transition-colors',
                      activeSectionId === 'related-section' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-400'
                    )}
                  >
                    {data.sections.length + 1}
                  </span>
                  <span className="text-xs sm:text-sm tracking-tight leading-snug">
                    {localeLang === 'vi' ? 'Bài viết liên quan' : localeLang === 'ja' ? '関連記事' : 'Related articles'}
                  </span>
                </button>
              </nav>
            </aside>
          ) : (
            <div className="hidden lg:block lg:col-span-3" />
          )}

          {/* Cột giữa: Main Content */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-[3px] border border-slate-200/80 shadow-sm">
            {/* Banner cover image inside content */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-slate-100 shadow-sm mb-8">
              <Image
                src={data.coverImage}
                alt={data.title}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover object-center"
              />
            </div>

            {/* Loop render sections if available, otherwise render html */}
            {data.sections && data.sections.length > 0 ? (
              <div className="space-y-10">
                {data.sections.map((sec) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-2">
                      <span className="text-brand font-black">{sec.num}</span>
                      <span>{sec.title}</span>
                    </h2>
                    <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 font-normal">
                      {sec.content.split('\n').map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                    {sec.alertText && (
                      <div className="mt-4 rounded-[3px] border border-blue-100 bg-blue-50/50 p-5 flex items-start gap-3 shadow-sm">
                        <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5 animate-pulse" />
                        <div className="text-xs sm:text-sm leading-relaxed text-slate-700 font-semibold">
                          {sec.alertText}
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              <div
                suppressHydrationWarning
                className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 font-normal space-y-4"
                dangerouslySetInnerHTML={{ __html: data.contentHtml }}
              />
            )}

            {/* Tags / Share Actions */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs font-semibold text-slate-500">
                {localeLang === 'vi' ? 'Chủ đề' : localeLang === 'ja' ? 'トピック' : 'Topic'}:{' '}
                <strong className="text-slate-800">{data.category}</strong>
              </span>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Share2 className="h-3.5 w-3.5" />
                {localeLang === 'vi'
                  ? 'Chia sẻ bài viết'
                  : localeLang === 'ja'
                    ? '記事をシェアする'
                    : 'Share article'}
              </button>
            </div>
          </div>

          {/* Cột phải: Related Resources */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="p-6 rounded-[3px] bg-white border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-brand" />
                {localeLang === 'vi'
                  ? 'Tài liệu liên quan'
                  : localeLang === 'ja'
                    ? '関連資料'
                    : 'Related documents'}
              </h3>

              <div className="space-y-5">
                {relatedResources.map((item) => (
                  <div key={item.id} className="group flex gap-3 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[3px] border border-slate-100 shadow-sm bg-slate-50">
                      <Image
                        src={item.image}
                        alt={item.title[localeLang]}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-700 rounded-[3px] border border-blue-100">
                        {item.badge[localeLang]}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                        {item.title[localeLang]}
                      </h4>
                      <Link
                        href={`/resources/${item.id.toLowerCase()}`}
                        className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand hover:underline"
                      >
                        {localeLang === 'vi' ? 'Đọc thêm' : localeLang === 'ja' ? 'もっと読む' : 'Read more'}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Widget */}
            <div className="p-6 rounded-[3px] bg-white border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10" />
              <h3 className="text-base font-extrabold text-slate-955">
                {localeLang === 'vi' ? 'Cần tư vấn giải pháp?' : localeLang === 'ja' ? 'ソリューション相談' : 'Need solution consultation?'}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
                {localeLang === 'vi'
                  ? 'Đội ngũ kỹ sư phòng sạch ULink sẵn sàng tư vấn mẫu sản phẩm và gửi báo giá chi tiết trong 24h.'
                  : localeLang === 'ja'
                    ? 'ULinkクリーンルームエンジニアリングチームが、24時間以内に製品サンプルの提案 và 詳細な見積書を提供します。'
                    : 'ULink cleanroom engineering team is ready to consult samples and send a detailed quote within 24 hours.'}
              </p>
              <Link
                href="/quick-order"
                className="mt-5 flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-[3px] bg-brand hover:bg-brand-strong text-white text-xs font-bold shadow transition-colors"
              >
                {localeLang === 'vi' ? 'Yêu cầu Báo giá Ngay' : localeLang === 'ja' ? 'すぐに見積もりを依頼' : 'Request Quote Now'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>

        {/* ── AI AGENT SUMMARY & AUDIO PLAYER BLOCK ── */}
        {data.aiSummary && (
          <div className="mt-12 rounded-[3px] bg-gradient-to-r from-blue-50/80 to-indigo-50/50 p-6 sm:p-10 border border-blue-100 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">

              {/* Left Column: AI Summary */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-[3px] bg-brand flex items-center justify-center text-white shadow-md border border-blue-400/20">
                    <span className="font-extrabold text-sm tracking-wider">AI</span>
                    <div className="absolute -bottom-1 -right-1 h-4.5 w-4.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="h-2 w-2 bg-white rounded-full animate-ping" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">AI Agent</h3>
                    <span className="text-xs text-slate-500 font-semibold">
                      {localeLang === 'vi'
                        ? 'Trợ lý tóm tắt & phân tích thông tin'
                        : localeLang === 'ja'
                          ? '要約・情報分析アシスタント'
                          : 'Information Analysis & Summary Assistant'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 bg-white/70 backdrop-blur-sm p-6 rounded-[3px] border border-white">
                  <h4 className="text-xs font-extrabold text-brand uppercase tracking-wider">
                    {localeLang === 'vi' ? 'Tóm tắt bài viết' : localeLang === 'ja' ? '記事の要約' : 'Article Summary'}
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-semibold italic">
                    {data.aiSummary.intro}
                  </p>
                  <ul className="space-y-3">
                    {data.aiSummary.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Audio Player */}
              <div className="w-full md:w-[360px] lg:w-[400px] shrink-0 bg-white p-6 rounded-[3px] border border-slate-200/80 shadow-md space-y-6">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Volume2 className="h-4.5 w-4.5 text-brand" />
                  {localeLang === 'vi' ? 'Nghe bài viết' : localeLang === 'ja' ? '記事を聞く' : 'Listen to article'}
                </h4>

                {/* Simulated Player Controls */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[3px] border border-slate-100 shadow-inner">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={cn(
                      'h-12 w-12 rounded-full flex items-center justify-center text-white transition-all shadow-md shrink-0 hover:scale-105 active:scale-95',
                      isPlaying ? 'bg-emerald-600' : 'bg-brand'
                    )}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
                  </button>

                  <div className="flex-1 space-y-1.5">
                    <input
                      type="range"
                      min={0}
                      max={durationSecs}
                      value={currentTime}
                      onChange={(e) => setCurrentTime(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-[3px] appearance-none cursor-pointer accent-brand"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(durationSecs)}</span>
                    </div>
                  </div>
                </div>

                {/* Volume bar and info */}
                <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsMuted(!isMuted)} className="hover:text-slate-900">
                      {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-20 h-1 bg-slate-200 rounded-[3px] appearance-none cursor-pointer accent-slate-600"
                    />
                  </div>
                  <span className="text-[10px] uppercase bg-slate-100 px-2 py-0.5 rounded-[3px] text-slate-600">
                    Text-to-Speech (AI Voice)
                  </span>
                </div>

                {/* Action CTA buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => toast.success(localeLang === 'vi' ? 'Bắt đầu tải file Audio...' : 'Downloading audio...')}
                    className="inline-flex items-center justify-center gap-1.5 py-3 rounded-[3px] border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    {localeLang === 'vi' ? 'Tải Audio' : localeLang === 'ja' ? '音声ダウンロード' : 'Download Audio'}
                  </button>
                  <button
                    onClick={() => toast.success(localeLang === 'vi' ? 'Đang kết nối với AI Assistant...' : 'Connecting to AI Assistant...')}
                    className="inline-flex items-center justify-center gap-1.5 py-3 rounded-[3px] bg-brand hover:bg-brand-strong text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {localeLang === 'vi' ? 'Hỏi đáp tài liệu' : localeLang === 'ja' ? 'AIに質問する' : 'Q&A Document'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── MARKET TRENDS / LATEST NEWS SECTION ── */}
        <div id="related-section">
          <ResourcesNews />
        </div>




      </main>
    </article>
  );
}
