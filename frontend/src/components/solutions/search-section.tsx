'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  locale: string;
}

const LABELS: Record<string, { sectionTitle: string; title: string; subtitle: string; placeholder: string; buttonText: string }> = {
  vi: {
    sectionTitle: 'Vật tư công nghiệp',
    title: 'Tìm kiếm vật tư công nghiệp',
    subtitle: 'Cung cấp đầy đủ vật tư, thiết bị và linh kiện công nghiệp chất lượng cao, đáp ứng mọi nhu cầu sản xuất của doanh nghiệp.',
    placeholder: 'Nhập tên sản phẩm, mã SKU hoặc từ khóa...',
    buttonText: 'Tìm kiếm'
  },
  en: {
    sectionTitle: 'Product Search',
    title: 'Find the right products for your business',
    subtitle: 'Enter product name, SKU code or keyword to quickly find industrial supplies from ULink.',
    placeholder: 'Enter product name, SKU code...',
    buttonText: 'Search'
  },
  ja: {
    sectionTitle: '製品検索',
    title: 'ビジネスに最適な製品を見つける',
    subtitle: '製品名、SKUコード、またはキーワードを入力して、ULinkの産業用資材をすばやく検索できます。',
    placeholder: '製品名、SKUコードを入力...',
    buttonText: '検索'
  }
};

export default function SearchSection({ locale }: SearchSectionProps) {
  const router = useRouter();
  const labels = LABELS[locale] || LABELS['vi'];
  const [value, setValue] = useState('');
  const [isPending, startTransition] = useTransition();

  const tags = [
    {
      label: locale === 'vi' ? 'Màng co PE' : locale === 'ja' ? 'PE熱収縮フィルム' : 'PE Shrink Film',
      value: 'Màng co PE'
    },
    {
      label: locale === 'vi' ? 'Găng tay Nitrile' : locale === 'ja' ? 'ニトリル手袋' : 'Nitrile Gloves',
      value: 'Găng tay Nitrile'
    },
    {
      label: locale === 'vi' ? 'Thảm phòng sạch' : locale === 'ja' ? 'クリーンルームマット' : 'Cleanroom Sticky Mat',
      value: 'Thảm phòng sạch'
    },
    {
      label: locale === 'vi' ? 'Khăn lau' : locale === 'ja' ? '工業用ワイパー' : 'Wipes',
      value: 'Khăn lau'
    },
    { label: locale === 'vi' ? 'Túi PE' : locale === 'ja' ? 'PEバッグ' : 'PE Bag', value: 'Túi PE' }
  ];

  function handleSearch(searchQuery: string) {
    if (!searchQuery.trim()) return;
    startTransition(() => {
      router.push(`/${locale}/solutions/searchProduct?q=${encodeURIComponent(searchQuery.trim())}`);
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch(value);
  }

  return (
    <section className="w-full py-12 lg:py-16 border-b border-gray-100" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="page-container text-center">
        {/* Header */}
        <p className="text-section-title font-bold uppercase tracking-wider text-blue-600">
          {labels.sectionTitle}
        </p>
        <h2 className="mt-3 text-section-title font-bold text-slate-900 tracking-tight">
          {labels.title}
        </h2>
        <p className="mt-4 text-body-regular text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {labels.subtitle}
        </p>

        {/* Search Input bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center bg-white rounded-full border border-gray-200 p-1.5 pl-5 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
          >
            <Search className="h-5 w-5 text-gray-400 shrink-0 mr-3" />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={labels.placeholder}
              className="flex-1 min-w-0 bg-transparent text-body-regular text-slate-900 placeholder:text-gray-400 focus:outline-none py-2.5"
            />
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-blue-600 px-8 py-2.5 text-body-regular font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors shrink-0 ml-2"
            >
              {labels.buttonText}
            </button>
          </form>
        </div>

        {/* Filter chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {tags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => {
                setValue(tag.label);
                handleSearch(tag.value);
              }}
              className="rounded-full px-4 py-2 text-caption-responsive font-semibold transition-all border bg-white border-gray-200 text-slate-600 hover:bg-slate-50 hover:border-gray-300"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
