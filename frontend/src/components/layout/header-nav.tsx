'use client';

import React, { useState, useRef } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Package,
  Wrench,
  FileText,
  Briefcase,
  Users,
  ClipboardList,
  Archive,
  Milestone,
  Shield,
  Heart,
  Navigation,
  Grid,
  Zap,
  Layers,
  Hand,
  Brush,
  ShoppingBag,
  Shirt,
  Footprints,
  Recycle,
  Eye,
  Thermometer,
  Droplet,
  Cpu,
  Palette,
  Pin,
  Globe,
  MapPin,
  FlaskConical,
  Warehouse,
  Factory
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

const IconMap: Record<string, React.ComponentType<any>> = {
  package: Package,
  wrench: Wrench,
  'file-text': FileText,
  briefcase: Briefcase,
  users: Users,
  'clipboard-list': ClipboardList,
  archive: Archive,
  milestone: Milestone,
  shield: Shield,
  heart: Heart,
  navigation: Navigation,
  grid: Grid,
  zap: Zap,
  layers: Layers,
  hand: Hand,
  brush: Brush,
  'shopping-bag': ShoppingBag,
  shirt: Shirt,
  footprints: Footprints,
  recycle: Recycle,
  eye: Eye,
  thermometer: Thermometer,
  droplet: Droplet,
  cpu: Cpu,
  palette: Palette,
  pin: Pin,
  globe: Globe,
  'map-pin': MapPin,
  flask: FlaskConical,
  warehouse: Warehouse,
  factory: Factory
};

const categoriesData = [
  {
    id: 'packaging',
    name: 'Bao bì & Đóng gói',
    link: '/solutions/listProduct',
    products: [
      {
        title: 'Màng co POF',
        description: 'Màng co nhiệt đa năng, độ trong suốt cao, ứng dụng bao gói thực phẩm & hàng tiêu dùng',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Băng keo đóng gói',
        description: 'Băng keo OPP, băng keo in logo, băng keo 2 mặt cho dán thùng & niêm phong',
        icon: 'wrench',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'Màng co PE (Shrink Film)',
        description: 'Màng co nhiệt bọc kín sản phẩm chống bụi & ẩm, tăng tính thẩm mỹ',
        icon: 'file-text',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Màng quấn Pallet',
        description: 'Màng stretch quấn pallet chịu lực cao, bảo vệ hàng hóa khi vận chuyển',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'Thùng carton',
        description: 'Thùng carton 3-5-7 lớp in flexo chất lượng cao theo yêu cầu',
        icon: 'users',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'Màng HIPS/PP',
        description: 'Định hình khay chứa linh kiện chống tĩnh điện, bảo vệ lưu kho',
        icon: 'clipboard-list',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Túi PE / HD',
        description: 'Túi đựng hàng công nghiệp, túi lót thùng carton đa dạng kích thước',
        icon: 'archive',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'Pallet gỗ / nhựa',
        description: 'Pallet tiêu chuẩn EUR, pallet xuất khẩu đạt chứng nhận ISPM15',
        icon: 'milestone',
        bgColor: 'bg-rose-50 text-rose-600',
      },
    ]
  },
  {
    id: 'cleanroom',
    name: 'Vật tư phòng sạch',
    link: '/solutions/listProduct',
    products: [
      {
        title: 'Găng tay phòng sạch',
        description: 'Găng tay Nitrile, Latex không bột, đạt chuẩn ISO phòng sạch',
        icon: 'hand',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Giấy lau phòng sạch',
        description: 'Giấy lau không bụi, khăn lau polyester dùng trong phòng sạch',
        icon: 'brush',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'Túi phòng sạch',
        description: 'Túi PE phòng sạch, túi chống tĩnh điện ESD đóng gói sản phẩm',
        icon: 'shopping-bag',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'Quần áo phòng sạch',
        description: 'Bộ áo liền quần, áo choàng, mũ trùm đầu chống tĩnh điện',
        icon: 'layers',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Bọc giày phòng sạch',
        description: 'Bọc giày PE, CPE chống trượt cho khu vực kiểm soát',
        icon: 'footprints',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'Vật tư tiêu hao',
        description: 'Bảng dính phòng sạch, sticky mat, swab bông lau công nghiệp',
        icon: 'recycle',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Khẩu trang phòng sạch',
        description: 'Khẩu trang 3 lớp, N95 cho môi trường phòng sạch',
        icon: 'shield',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'Kính bảo hộ',
        description: 'Kính chống bụi, chống hóa chất đạt chuẩn phòng sạch',
        icon: 'eye',
        bgColor: 'bg-rose-50 text-rose-600',
      },
    ]
  },
  {
    id: 'aluminum',
    name: 'Băng keo Nhôm',
    link: '/solutions/listProduct',
    products: [
      {
        title: 'Băng keo nhôm chịu nhiệt',
        description: 'Băng keo nhôm chịu nhiệt độ cao, dùng trong HVAC, cách nhiệt công nghiệp',
        icon: 'thermometer',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'Băng keo nhôm chống ẩm',
        description: 'Băng keo nhôm chống thấm, bảo vệ đường ống và bề mặt kim loại',
        icon: 'droplet',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'Băng keo nhôm dán ống gió',
        description: 'Chuyên dán nối ống gió, hệ thống thông gió HVAC công nghiệp',
        icon: 'wind',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Băng keo nhôm dẫn nhiệt',
        description: 'Băng keo nhôm tản nhiệt cho linh kiện điện tử, LED và bo mạch',
        icon: 'cpu',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Băng keo nhôm trang trí',
        description: 'Băng keo nhôm bóng, mờ dùng trang trí nội thất và quảng cáo',
        icon: 'palette',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'Băng keo nhôm tự dính',
        description: 'Băng keo nhôm tự dính áp lực, dễ thi công, không cần gia nhiệt',
        icon: 'pin',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Băng keo nhôm cách điện',
        description: 'Băng keo nhôm cách điện, chống nhiễu EMI/RFI cho thiết bị điện tử',
        icon: 'zap',
        bgColor: 'bg-yellow-50 text-yellow-600',
      },
      {
        title: 'Băng keo nhôm gia cường',
        description: 'Băng keo nhôm có lưới sợi thủy tinh, độ bền kéo cao',
        icon: 'grid',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
    ]
  }
];

const viewAllLabels: Record<string, string> = {
  packaging: 'Bao bì & Đóng gói',
  cleanroom: 'Phòng sạch',
  aluminum: 'Băng keo Nhôm'
};

const regionsData = [
  {
    id: 'north',
    name: 'Miền Bắc',
    link: '/regional-hubs',
    hubName: 'HUB Hà Nam',
    hubLink: '/regional-hubs/cum-1',
    hubImage: '/images/regional_hubs/hub-2/hanam-warehouse-shelves.jpg',
    hubs: [
      {
        title: 'KCN Đình Vũ',
        description: 'Hải Phòng, kết nối cảng biển quốc tế, vị trí chiến lược cho công nghiệp nặng',
        icon: 'map-pin',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'KCN Thăng Long',
        description: 'Hà Nội, liên doanh Nhật Bản uy tín, hạ tầng hoàn thiện cho điện tử & ô tô',
        icon: 'factory',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'KCN Quế Võ',
        description: 'Bắc Ninh, kết nối quốc lộ 18, gần sân bay Nội Bài, thu hút cơ khí & linh kiện',
        icon: 'factory',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'KCN Phúc Điền',
        description: 'Hải Dương, vị trí giao thương thuận lợi, tập trung dệt may & thực phẩm',
        icon: 'factory',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'KCN Yên Phong',
        description: 'Bắc Ninh, thủ phủ sản xuất Samsung, công nghệ cao & dịch vụ phụ trợ hiện đại',
        icon: 'factory',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'KCN Đại An',
        description: 'Hải Dương, thu hút mạnh mẽ vốn đầu tư nước ngoài FDI, đa dạng lắp ráp cơ khí',
        icon: 'factory',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'KCN Tiên Sơn',
        description: 'Bắc Ninh, hạ tầng kỹ thuật đồng bộ, chế tạo máy chính xác & vật liệu xây dựng',
        icon: 'factory',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'KCN Nam Sách',
        description: 'Hải Dương, thích hợp công nghiệp sạch, chế biến hàng xuất khẩu & bao bì',
        icon: 'map-pin',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
    ]
  },
  {
    id: 'center',
    name: 'Miền Trung',
    link: '/regional-hubs',
    hubName: 'HUB Đà Nẵng',
    hubLink: '/regional-hubs/cum-2',
    hubImage: '/images/regional_hubs/business-packing.png',
    hubs: [
      {
        title: 'KCN Phú Bài',
        description: 'Thừa Thiên Huế, vị trí chiến lược gần sân bay quốc tế, công nghiệp nhẹ & chế biến',
        icon: 'map-pin',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'KCN Điện Nam – Điện Ngọc',
        description: 'Quảng Nam, trung tâm công nghiệp lớn nhất miền Trung, dệt may & da giày',
        icon: 'factory',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'KCN Hòa Khánh',
        description: 'Đà Nẵng, khu công nghiệp lâu đời, đa ngành từ cơ khí đến thực phẩm',
        icon: 'factory',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'KCN Phú Tài',
        description: 'Bình Định, cảng biển Quy Nhơn, chế biến gỗ & nông sản xuất khẩu',
        icon: 'factory',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'KCN Dung Quất',
        description: 'Quảng Ngãi, liền kề khu kinh tế Dung Quất, lọc hóa dầu & công nghiệp nặng',
        icon: 'factory',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'KCN Tịnh Phong',
        description: 'Quảng Ngãi, thu hút FDI mạnh, sản xuất vật liệu xây dựng & cơ khí',
        icon: 'factory',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'KCN Phong Điền',
        description: 'Thừa Thiên Huế, hạ tầng đồng bộ, công nghệ cao & điện tử',
        icon: 'factory',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'KCN Chu Lai',
        description: 'Quảng Nam, đặc khu kinh tế mở, lắp ráp ô tô & linh kiện cơ khí',
        icon: 'map-pin',
        bgColor: 'bg-blue-50 text-blue-600',
      },
    ]
  },
  {
    id: 'south',
    name: 'Miền Nam',
    link: '/regional-hubs',
    hubName: 'HUB Hà Nam',
    hubLink: '/regional-hubs/cum-1',
    hubImage: '/images/regional_hubs/hub-2/hanam-warehouse-shelves.jpg',
    hubs: [
      {
        title: 'KCN VSIP Bình Dương',
        description: 'Khu công nghiệp Việt Nam - Singapore, quy mô 500ha, đa ngành sản xuất',
        icon: 'users',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'KCN Nhơn Trạch',
        description: 'Đồng Nai, chuyên chế biến và sản xuất công nghiệp nặng, gần cảng Cát Lái',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'KCN Long Hậu',
        description: 'Long An, vị trí chiến lược gần cảng biển, phù hợp logistics & xuất khẩu',
        icon: 'navigation',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'KCN Tân Thuận',
        description: 'TP.HCM, khu chế xuất lớn nhất miền Nam, hơn 200 doanh nghiệp FDI',
        icon: 'globe',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'KCN Mỹ Phước',
        description: 'Bình Dương, đa ngành từ điện tử đến cơ khí, hạ tầng hiện đại',
        icon: 'grid',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'KCN Phú Mỹ',
        description: 'Bà Rịa - Vũng Tàu, công nghiệp nặng và hóa chất, gần cảng nước sâu',
        icon: 'flask',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'KCN Đức Hòa',
        description: 'Long An, trung tâm kho vận và logistics kết nối TP.HCM - ĐBSCL',
        icon: 'package',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'KCN Biên Hòa',
        description: 'Đồng Nai, KCN lâu đời nhất Việt Nam, đa dạng ngành nghề sản xuất',
        icon: 'map-pin',
        bgColor: 'bg-blue-50 text-blue-600',
      },
    ]
  }
];

export interface NavSubChildItem {
  href: string;
  label: string;
}

export interface NavChildItem {
  href: string;
  label: string;
  description?: string;
  subChildren?: NavSubChildItem[];
}

export interface NavItem {
  href: string;
  label: string;
  children?: NavChildItem[];
}

interface HeaderNavProps {
  items: NavItem[];
}

export function HeaderNav({ items }: HeaderNavProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('packaging');
  const [activeRegion, setActiveRegion] = useState<string>('south');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentCategoryData = categoriesData.find((cat) => cat.id === activeCategory);
  const currentRegionData = regionsData.find((reg) => reg.id === activeRegion);

  const handleMouseEnter = (href: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(href);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <nav className="hidden flex-1 items-center justify-evenly md:flex">
      {items.map((item) => {
        const isProductsMenu = item.href === '/solutions';
        const isHubsMenu = item.href === '/regional-hubs';
        const hasChildren = (item.children && item.children.length > 0) || isProductsMenu || isHubsMenu;
        const isOpen = activeMenu === item.href;

        return (
          <div
            key={item.href}
            className={`${isProductsMenu || isHubsMenu ? '' : 'relative'} py-4`}
            onMouseEnter={() => handleMouseEnter(item.href)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.href}
              className={`inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-semibold transition-all duration-200 ${isOpen ? 'text-brand' : 'text-foreground hover:text-brand hover:scale-[1.02]'
                }`}
            >
              {item.label}
              {hasChildren && (
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand' : 'text-slate-400'
                    }`}
                  aria-hidden="true"
                />
              )}
            </Link>

            {hasChildren && !isProductsMenu && !isHubsMenu && (
              <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-1 transition-all duration-200 z-50 ${isOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
              >
                <div className="w-[260px] rounded-[3px] border border-slate-200/80 bg-white/95 p-2 shadow-lg backdrop-blur-md">
                  <div className="flex flex-col gap-0.5">
                    {item.children!.map((child) => {
                      const hasSub = child.subChildren && child.subChildren.length > 0;
                      if (hasSub) {
                        return (
                          <div key={child.href} className="flex flex-col rounded-[3px] px-3 py-2">
                            <span className="text-[13px] font-semibold text-slate-800">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 text-[11px] text-slate-500">
                                {child.description}
                              </span>
                            )}
                            <div className="mt-1 flex flex-col gap-0.5 pl-3 border-l border-slate-200">
                              {child.subChildren!.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setActiveMenu(null)}
                                  className="rounded-[3px] px-2 py-1.5 text-[12px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveMenu(null)}
                          className="group flex flex-col rounded-[3px] px-3 py-2 transition-colors hover:bg-slate-50"
                        >
                          <span className="text-[13px] font-semibold text-slate-800 transition-colors group-hover:text-brand">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 text-[11px] text-slate-500">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {isOpen && isProductsMenu && (
              <div
                className="absolute left-0 right-0 top-full bg-white border-t border-slate-100 border-b border-slate-200 shadow-2xl z-50"
                onMouseEnter={() => handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mx-auto w-full max-w-[1440px] grid grid-cols-[340px_1fr]">
                  {/* Left Column: Categories List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pl-20 pr-8">
                    <div className="flex flex-col gap-1.5">
                      {categoriesData.map((cat) => {
                        const isCatActive = activeCategory === cat.id;
                        return (
                          <div
                            key={cat.id}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              isCatActive
                                ? 'bg-blue-50/70 text-blue-600 font-bold'
                                : 'text-slate-600 hover:bg-slate-50/60 hover:text-brand'
                            }`}
                            onMouseEnter={() => setActiveCategory(cat.id)}
                          >
                            {isCatActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-[14px] leading-none">{cat.name}</span>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                isCatActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Grid and Banner */}
                  <div className="flex flex-col bg-white pt-8 pb-8 pl-12 pr-20">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-[16px] font-bold text-slate-800">
                          Danh mục Sản phẩm — {currentCategoryData?.name}
                        </span>
                        <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {currentCategoryData?.products.map((prod, idx) => {
                          const IconComp = IconMap[prod.icon] || Package;
                          return (
                            <Link
                              key={idx}
                              href={currentCategoryData.link}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-start gap-4 group p-2 -m-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${prod.bgColor} transition-transform duration-200 group-hover:scale-105`}>
                                <IconComp className="h-5.5 w-5.5" />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-[14px] font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                  {prod.title}
                                </span>
                                <span className="mt-1 text-[12px] text-slate-400 leading-relaxed font-medium">
                                  {prod.description}
                                </span>
                              </div>
                            </Link>
                          );
                        })}

                        {/* 9th Grid Item: View All Link */}
                        <div className="flex items-center">
                          <Link
                            href={currentCategoryData?.link || '#'}
                            onClick={() => setActiveMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>
                              Xem tất cả sản phẩm{' '}
                              {viewAllLabels[currentCategoryData?.id || ''] || currentCategoryData?.name}
                            </span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: spans edge-to-edge */}
                <div className="border-t border-slate-100 bg-[#F8FAFC] w-full">
                  <div className="mx-auto w-full max-w-[1440px] py-3.5 pl-20 pr-8 flex items-center">
                    <span className="inline-flex items-center justify-center bg-blue-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-[2px] tracking-wider">
                      MỚI
                    </span>
                    <span className="text-[12px] text-slate-500 font-bold ml-3">
                      Giải pháp AI cho nhà máy thông minh —{' '}
                      <Link
                        href="/solutions"
                        onClick={() => setActiveMenu(null)}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Tìm hiểu thêm →
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {isOpen && isHubsMenu && (
              <div
                className="absolute left-0 right-0 top-full bg-white border-t border-slate-100 border-b border-slate-200 shadow-2xl z-50"
                onMouseEnter={() => handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mx-auto w-full max-w-[1440px] grid grid-cols-[340px_1fr]">
                  {/* Left Column: Regions List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pl-20 pr-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      {regionsData.map((reg) => {
                        const isRegActive = activeRegion === reg.id;
                        return (
                          <div
                            key={reg.id}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              isRegActive
                                ? 'bg-blue-50/70 text-blue-600 font-bold'
                                : 'text-slate-600 hover:bg-slate-50/60 hover:text-brand'
                            }`}
                            onMouseEnter={() => setActiveRegion(reg.id)}
                          >
                            {isRegActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-[14px] leading-none">{reg.name}</span>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                isRegActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Orange Button: Dynamic HUB */}
                    <Link
                      href={currentRegionData?.hubLink || '/regional-hubs/cum-1'}
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center justify-between border border-[#F2994A] bg-[#FFF9F3] text-[#F2994A] pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#FFEEDB]"
                    >
                      <div className="flex items-center gap-2">
                        <Warehouse className="h-4 w-4 text-[#F2994A]" />
                        <span className="text-[14px] font-bold">{currentRegionData?.hubName}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#F2994A]" />
                    </Link>

                    {/* Industrial Hub Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-100">
                      <img
                        src={currentRegionData?.hubImage}
                        alt={currentRegionData?.hubName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Column: Grid and Banner */}
                  <div className="flex flex-col bg-white pt-8 pb-8 pl-12 pr-20">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-[16px] font-bold text-slate-800">
                          Cụm / Khu công nghiệp — {currentRegionData?.name}
                        </span>
                        <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {currentRegionData?.hubs.map((hub, idx) => {
                          const IconComp = IconMap[hub.icon] || Package;
                          return (
                            <Link
                              key={idx}
                              href={currentRegionData.link}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-start gap-4 group p-2 -m-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${hub.bgColor} transition-transform duration-200 group-hover:scale-105`}>
                                <IconComp className="h-5.5 w-5.5" />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-[14px] font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                  {hub.title}
                                </span>
                                <span className="mt-1 text-[12px] text-slate-400 leading-relaxed font-medium">
                                  {hub.description}
                                </span>
                              </div>
                            </Link>
                          );
                        })}

                        {/* 9th Grid Item: View All Link */}
                        <div className="flex items-center">
                          <Link
                            href={currentRegionData?.link || '#'}
                            onClick={() => setActiveMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>Xem tất cả Khu công nghiệp</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: spans edge-to-edge */}
                <div className="border-t border-slate-100 bg-[#F8FAFC] w-full">
                  <div className="mx-auto w-full max-w-[1440px] py-3.5 pl-20 pr-8 flex items-center">
                    <span className="inline-flex items-center justify-center bg-blue-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-[2px] tracking-wider">
                      MỚI
                    </span>
                    <span className="text-[12px] text-slate-500 font-bold ml-3">
                      Giải pháp AI cho nhà máy thông minh —{' '}
                      <Link
                        href="/solutions"
                        onClick={() => setActiveMenu(null)}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Tìm hiểu thêm →
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
