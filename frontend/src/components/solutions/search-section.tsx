'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Shield, Package, Zap, Layers, ChevronRight, Tag } from 'lucide-react';

interface SearchSectionProps {
  locale: string;
}

export interface CategoryItem {
  name: string;
  categorySlug: string;
  query: string;
}

export interface ParentCategoryGroup {
  parentSlug: string;
  parentName: string;
  description: string;
  icon: 'cleanroom' | 'packaging' | 'esd';
  items: CategoryItem[];
}

const CATEGORY_GROUPS: Record<string, ParentCategoryGroup[]> = {
  vi: [
    {
      parentSlug: 'cleanroom-consumables',
      parentName: 'Vật Tư Phòng Sạch',
      description: 'Găng tay, khăn lau, trang phục và đồ bảo hộ phòng sạch đạt chuẩn ISO',
      icon: 'cleanroom',
      items: [
        { name: 'Găng tay Nitrile / Latex', categorySlug: 'cleanroom-gloves', query: 'Găng tay Nitrile' },
        { name: 'Khăn lau phòng sạch', categorySlug: 'cleanroom-wipers', query: 'Khăn lau phòng sạch' },
        { name: 'Quần áo & Trang phục phòng sạch', categorySlug: 'cleanroom-apparel', query: 'Quần áo phòng sạch' },
        { name: 'Khẩu trang & Nón phòng sạch', categorySlug: 'cleanroom-masks', query: 'Khẩu trang phòng sạch' },
        { name: 'Thảm dính bụi phòng sạch', categorySlug: 'cleanroom-consumables', query: 'Thảm phòng sạch' }
      ]
    },
    {
      parentSlug: 'industrial-packaging',
      parentName: 'Bao Bì & Đóng Gói',
      description: 'Màng co PE, màng quấn pallet, thùng carton và giải pháp đóng gói',
      icon: 'packaging',
      items: [
        { name: 'Màng co nhiệt PE (Shrink Film)', categorySlug: 'industrial-packaging', query: 'Màng co PE' },
        { name: 'Màng stretch quấn Pallet', categorySlug: 'industrial-packaging', query: 'Màng stretch pallet' },
        { name: 'Túi PE / LDPE công nghiệp', categorySlug: 'industrial-packaging', query: 'Túi PE' },
        { name: 'Băng keo đóng gói & Niêm phong', categorySlug: 'industrial-packaging', query: 'Băng keo nhôm' }
      ]
    },
    {
      parentSlug: 'esd-supplies',
      parentName: 'Băng Keo & Vật Tư ESD',
      description: 'Thiết bị chống tĩnh điện, thảm cao su ESD và băng keo kỹ thuật',
      icon: 'esd',
      items: [
        { name: 'Băng keo công nghiệp', categorySlug: 'esd-supplies', query: 'Băng keo nhôm' },
        { name: 'Thảm cao su chống tĩnh điện ESD', categorySlug: 'esd-supplies', query: 'Thảm cao su ESD' },
        { name: 'Thiết bị khử tĩnh điện Ionizer', categorySlug: 'esd-supplies', query: 'Ionizer' }
      ]
    }
  ],
  en: [
    {
      parentSlug: 'cleanroom-consumables',
      parentName: 'Cleanroom Supplies',
      description: 'ISO certified cleanroom gloves, wipers, garments & safety gear',
      icon: 'cleanroom',
      items: [
        { name: 'Nitrile / Latex Gloves', categorySlug: 'cleanroom-gloves', query: 'Nitrile Gloves' },
        { name: 'Cleanroom Wipers', categorySlug: 'cleanroom-wipers', query: 'Cleanroom Wipers' },
        { name: 'Cleanroom Garments', categorySlug: 'cleanroom-apparel', query: 'Cleanroom Apparel' },
        { name: 'Face Masks & Caps', categorySlug: 'cleanroom-masks', query: 'Face Mask' },
        { name: 'Sticky Mats', categorySlug: 'cleanroom-consumables', query: 'Sticky Mat' }
      ]
    },
    {
      parentSlug: 'industrial-packaging',
      parentName: 'Packaging & Logistics',
      description: 'PE shrink films, stretch wrap, cartons & industrial packaging solutions',
      icon: 'packaging',
      items: [
        { name: 'PE Shrink Film', categorySlug: 'industrial-packaging', query: 'PE Shrink Film' },
        { name: 'Pallet Stretch Wrap', categorySlug: 'industrial-packaging', query: 'Stretch Film' },
        { name: 'PE / LDPE Industrial Bags', categorySlug: 'industrial-packaging', query: 'PE Bag' },
        { name: 'Packaging & Sealing Tapes', categorySlug: 'industrial-packaging', query: 'Aluminum Tape' }
      ]
    },
    {
      parentSlug: 'esd-supplies',
      parentName: 'ESD & Technical Tapes',
      description: 'Anti-static supplies, ESD matting, ionizers & specialized tapes',
      icon: 'esd',
      items: [
        { name: 'Industrial Technical Tapes', categorySlug: 'esd-supplies', query: 'Aluminum Tape' },
        { name: 'ESD Anti-Static Table Mat', categorySlug: 'esd-supplies', query: 'ESD Mat' },
        { name: 'Ionizer Blower & Fans', categorySlug: 'esd-supplies', query: 'Ionizer' }
      ]
    }
  ],
  ja: [
    {
      parentSlug: 'cleanroom-consumables',
      parentName: 'クリーンルーム用品',
      description: 'ISO規格適合のクリーンルーム用手袋、ワイパー、ウェア',
      icon: 'cleanroom',
      items: [
        { name: 'ニトリル手袋', categorySlug: 'cleanroom-gloves', query: 'ニトリル手袋' },
        { name: 'クリーンルームワイパー', categorySlug: 'cleanroom-wipers', query: 'ワイパー' },
        { name: 'クリーンウェア', categorySlug: 'cleanroom-apparel', query: 'クリーンウェア' },
        { name: 'クリーンマスク', categorySlug: 'cleanroom-masks', query: 'マスク' },
        { name: '粘着マット', categorySlug: 'cleanroom-consumables', query: '粘着マット' }
      ]
    },
    {
      parentSlug: 'industrial-packaging',
      parentName: '産業用包装資材',
      description: 'PEシュリンクフィルム、ストレッチフィルム、梱包ソリューション',
      icon: 'packaging',
      items: [
        { name: 'PE熱収縮フィルム', categorySlug: 'industrial-packaging', query: 'シュリンクフィルム' },
        { name: 'ストレッチフィルム', categorySlug: 'industrial-packaging', query: 'ストレッチフィルム' },
        { name: 'PEバッグ', categorySlug: 'industrial-packaging', query: 'PEバッグ' },
        { name: '梱包テープ', categorySlug: 'industrial-packaging', query: 'テープ' }
      ]
    },
    {
      parentSlug: 'esd-supplies',
      parentName: 'ESD対策・テープ',
      description: '静電気対策マット、イオナイザー、工業用テープ',
      icon: 'esd',
      items: [
        { name: '工業用テープ', categorySlug: 'esd-supplies', query: 'アルミテープ' },
        { name: '静電気対策マット', categorySlug: 'esd-supplies', query: 'ESDマット' },
        { name: 'イオナイザー', categorySlug: 'esd-supplies', query: 'イオナイザー' }
      ]
    }
  ]
};

const LABELS: Record<
  string,
  {
    sectionTitle: string;
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
    allTab: string;
    parentCategoryLabel: string;
    suggestedCategoryLabel: string;
    viewAllParent: string;
  }
> = {
  vi: {
    sectionTitle: 'Vật tư công nghiệp',
    title: 'Tìm kiếm vật tư theo danh mục',
    subtitle: 'Tìm kiếm nhanh vật tư phòng sạch, bao bì đóng gói và thiết bị ESD theo từng nhóm danh mục sản phẩm.',
    placeholder: 'Nhập tên sản phẩm, mã SKU hoặc tên danh mục...',
    buttonText: 'Tìm kiếm',
    allTab: 'Tất cả danh mục',
    parentCategoryLabel: 'Danh mục cha',
    suggestedCategoryLabel: 'Gợi ý tìm kiếm theo danh mục',
    viewAllParent: 'Xem danh mục'
  },
  en: {
    sectionTitle: 'Industrial Supplies',
    title: 'Search Products by Category',
    subtitle: 'Quickly find cleanroom consumables, packaging supplies, and ESD products by product category.',
    placeholder: 'Search product name, SKU or category...',
    buttonText: 'Search',
    allTab: 'All Categories',
    parentCategoryLabel: 'Parent Categories',
    suggestedCategoryLabel: 'Category Suggestions',
    viewAllParent: 'View Category'
  },
  ja: {
    sectionTitle: '産業用資材',
    title: 'カテゴリ別に製品を検索',
    subtitle: 'クリーンルーム用品、包装資材、静電気対策製品をカテゴリごとに素早く検索。',
    placeholder: '製品名、SKU、カテゴリ名を入力...',
    buttonText: '検索',
    allTab: 'すべてのカテゴリ',
    parentCategoryLabel: '親カテゴリ',
    suggestedCategoryLabel: 'カテゴリ別おすすめ検索',
    viewAllParent: 'カテゴリを見る'
  }
};

export default function SearchSection({ locale }: SearchSectionProps) {
  const router = useRouter();
  const labels = LABELS[locale] || LABELS['vi'];
  const groups = CATEGORY_GROUPS[locale] || CATEGORY_GROUPS['vi'];

  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSearch(searchQuery: string) {
    if (!searchQuery.trim()) return;
    startTransition(() => {
      router.push(`/${locale}/solutions/searchProduct?q=${encodeURIComponent(searchQuery.trim())}`);
    });
  }

  function handleNavigateCategory(categorySlug: string, query?: string) {
    setIsFocused(false);
    startTransition(() => {
      if (query) {
        router.push(`/${locale}/solutions/listProduct?category=${encodeURIComponent(categorySlug)}&q=${encodeURIComponent(query)}`);
      } else {
        router.push(`/${locale}/solutions/listProduct?category=${encodeURIComponent(categorySlug)}`);
      }
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsFocused(false);
    handleSearch(value);
  }

  const getParentIcon = (iconName: string) => {
    switch (iconName) {
      case 'cleanroom':
        return <Shield className="h-4 w-4 text-blue-600" />;
      case 'packaging':
        return <Package className="h-4 w-4 text-indigo-600" />;
      case 'esd':
        return <Zap className="h-4 w-4 text-amber-600" />;
      default:
        return <Layers className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 border-b border-gray-100" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="page-container text-center px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <p className="text-caption-responsive sm:text-section-title font-bold uppercase tracking-wider text-blue-600">
          {labels.sectionTitle}
        </p>
        <h2 className="mt-2 sm:mt-3 text-body-large sm:text-section-title font-bold text-slate-900 tracking-tight">
          {labels.title}
        </h2>
        <p className="mt-2.5 sm:mt-4 text-caption-responsive sm:text-body-regular text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {labels.subtitle}
        </p>

        {/* Search Input bar + Interactive Suggestions Dropdown */}
        <div ref={searchContainerRef} className="mt-6 sm:mt-8 max-w-3xl mx-auto relative z-30">
          <form
            onSubmit={handleSubmit}
            className={`relative flex items-center bg-white rounded-full border transition-all p-1.5 pl-3.5 sm:pl-5 shadow-sm ${isFocused ? 'border-blue-500 ring-4 ring-blue-100/60 shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 shrink-0 mr-2 sm:mr-3" />
            <input
              type="text"
              value={value}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setValue(e.target.value)}
              placeholder={labels.placeholder}
              className="flex-1 min-w-0 bg-transparent text-caption-responsive sm:text-body-regular text-slate-900 placeholder:text-gray-400 focus:outline-none py-1.5 sm:py-2.5 truncate"
            />
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-blue-600 px-4 sm:px-8 py-2 sm:py-2.5 text-caption-responsive sm:text-body-regular font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors shrink-0 ml-1.5 sm:ml-2"
            >
              {labels.buttonText}
            </button>
          </form>

          {/* Autocomplete Dropdown showing Parent Categories & Subcategories */}
          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-left z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                <span className="text-caption-responsive font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-blue-600 shrink-0" />
                  <span className="truncate">{labels.parentCategoryLabel} & {labels.suggestedCategoryLabel}</span>
                </span>
                <span className="text-xs text-slate-400 shrink-0 hidden sm:inline">Gợi ý danh mục B2B</span>
              </div>

              <div className="max-h-[300px] sm:max-h-[380px] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 divide-y divide-slate-100">
                {groups.map((group) => (
                  <div key={group.parentSlug} className="pt-2 sm:pt-3 first:pt-0">
                    {/* Parent category row */}
                    <div
                      onClick={() => handleNavigateCategory(group.parentSlug)}
                      className="group flex items-center justify-between p-2 rounded-xl hover:bg-blue-50/60 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-lg bg-blue-100/50 group-hover:bg-blue-600 group-hover:text-white text-blue-700 transition-colors shrink-0">
                          {getParentIcon(group.icon)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-caption-responsive sm:text-body-regular font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5 flex-wrap">
                            <span>{group.parentName}</span>
                            <span className="text-[10px] sm:text-xs font-normal text-slate-400 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-full">
                              Danh mục cha
                            </span>
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">{group.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 sm:gap-1 shrink-0 ml-2">
                        <span className="hidden sm:inline">{labels.viewAllParent}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {/* Subcategories under parent */}
                    <div className="mt-1.5 sm:mt-2 pl-2 sm:pl-9 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5">
                      {group.items.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => handleNavigateCategory(item.categorySlug, item.query)}
                          className="flex items-center justify-between text-left text-caption-responsive sm:text-body-small px-2.5 sm:px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors group/item"
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-blue-500 transition-colors shrink-0" />
                            <span className="truncate">{item.name}</span>
                          </span>
                          <Tag className="h-3 w-3 text-slate-300 group-hover/item:text-blue-500 transition-colors shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3 Parent Category Search Suggestion Chips */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-sm sm:max-w-none mx-auto">
          {groups.map((group) => (
            <button
              key={group.parentSlug}
              type="button"
              onClick={() => handleNavigateCategory(group.parentSlug)}
              className="group rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-caption-responsive sm:text-body-small font-semibold transition-all border bg-white border-slate-200 text-slate-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white flex items-center justify-center gap-2 shadow-xs hover:shadow-sm"
            >
              <span className="p-1 rounded-full bg-blue-50 group-hover:bg-white/20 transition-colors shrink-0">
                {getParentIcon(group.icon)}
              </span>
              <span className="truncate">{group.parentName}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


