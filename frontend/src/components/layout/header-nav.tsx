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

export interface NavProductItem {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  slug?: string;
}

export interface NavCategoryItem {
  id: string;
  name: string;
  link: string;
  products: NavProductItem[];
}

export interface NavHubItem {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}

export interface NavRegionItem {
  id: string;
  name: string;
  link: string;
  hubName: string;
  hubLink: string;
  hubImage: string;
  hubs: NavHubItem[];
}

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

const categoriesData: NavCategoryItem[] = [
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

const partnerItems = [
  {
    title: 'Mạng lưới phân phối rộng khắp',
    description: 'Tăng cường độ phủ thị trường và tiếp cận khách hàng trên toàn quốc.',
    icon: 'map-pin',
    bgColor: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Khám phá Danh mục sản phẩm',
    description: 'Hơn 1000 + SKU sẵn sàng giao nhanh toàn quốc.',
    icon: 'factory',
    bgColor: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Đào tạo sản phẩm',
    description: 'Cung cấp kiến thức chuyên sâu về tính năng và ứng dụng sản phẩm.',
    icon: 'users',
    bgColor: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'Hỗ trợ kỹ thuật chuyên sâu',
    description: 'Đội ngũ kỹ sư chuyên nghiệp hỗ trợ triển khai và bảo hành sản phẩm.',
    icon: 'wrench',
    bgColor: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Sản xuất Bao bì Plastics',
    description: 'Danh sách các sản phẩm sản xuất tại Hub Hà Nam.',
    icon: 'pin',
    bgColor: 'bg-violet-50 text-violet-650',
  },
  {
    title: 'Chính sách giá cạnh tranh',
    description: 'Cơ chế chiết khấu linh hoạt theo doanh số và cam kết lâu dài.',
    icon: 'grid',
    bgColor: 'bg-amber-50 text-amber-600',
  }
];

const regionsData: NavRegionItem[] = [
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

const industriesData = [
  {
    id: 'food',
    name: 'Thực phẩm',
    hubs: [
      {
        title: 'Đóng gói thực phẩm khô',
        description: 'Màng co, túi PE, bao bì cho snack, ngũ cốc, gia vị',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Bao bì thực phẩm tươi sống',
        description: 'Khay xốp, màng bọc thực phẩm, hút chân không',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Pallet & kệ hàng F&B',
        description: 'Pallet nhựa chuyên thực phẩm, kệ inox nhà kho lạnh',
        icon: 'archive',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'Bao bì thực phẩm đông lạnh',
        description: 'Túi PA/PE chịu nhiệt âm, màng co chuyên dụng',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'Đóng gói bánh kẹo',
        description: 'Túi OPP trong suốt, hộp carton gift box, ribbon',
        icon: 'wrench',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'Thùng chứa & sọt nhựa',
        description: 'Thùng rổ nhựa xếp chồng, thùng IBC, can đựng dung dịch',
        icon: 'clipboard-list',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Đóng gói đồ uống',
        description: 'Màng co nhóm chai, lốc lon, shrink sleeve nhãn',
        icon: 'navigation',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Vật tư vệ sinh ATTP',
        description: 'Găng tay, khẩu trang, bao giày, mũ trùm',
        icon: 'users',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'medical',
    name: 'Dược phẩm & Y tế',
    hubs: [
      {
        title: 'Bao bì dược phẩm',
        description: 'Màng nhôm ép vỉ, chai lọ nhựa dược phẩm',
        icon: 'archive',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Vật tư phòng sạch y tế',
        description: 'Khăn lau vô trùng, khẩu trang y tế 3 lớp',
        icon: 'shield',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Đồ bảo hộ y tế',
        description: 'Quần áo bảo hộ, găng tay khám bệnh nitrile',
        icon: 'users',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'Đóng gói vắc-xin',
        description: 'Hộp cách nhiệt, túi đá gel giữ lạnh chuyên dụng',
        icon: 'package',
        bgColor: 'bg-rose-50 text-rose-600',
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Điện tử & Linh kiện',
    hubs: [
      {
        title: 'Bao bì chống tĩnh điện ESD',
        description: 'Túi shielding bag, túi bong bóng ESD',
        icon: 'zap',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Khay chứa linh kiện',
        description: 'Khay nhựa định hình ESD, hộp nhựa chống tĩnh điện',
        icon: 'grid',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'Vật tư phòng sạch điện tử',
        description: 'Găng tay phủ PU ESD, thảm dính bụi sticky mat',
        icon: 'users',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Băng keo chịu nhiệt',
        description: 'Băng keo Kapton, băng keo nhôm chống nhiễu',
        icon: 'wrench',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics & Vận tải',
    hubs: [
      {
        title: 'Đóng gói pallet',
        description: 'Màng quấn pallet stretch film, dây đai nhựa PET',
        icon: 'layers',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Túi khí chèn hàng',
        description: 'Túi khí chèn container dunnage bag, hạt hút ẩm',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'Niêm phong hàng hóa',
        description: 'Seal niêm phong kim loại, tem niêm phong security',
        icon: 'shield',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'Thùng chứa vận chuyển',
        description: 'Thùng carton 5 lớp/7 lớp, pallet gỗ/nhựa',
        icon: 'package',
        bgColor: 'bg-indigo-50 text-indigo-600',
      }
    ]
  },
  {
    id: 'furniture',
    name: 'Nội thất',
    hubs: [
      {
        title: 'Bảo vệ bề mặt',
        description: 'Màng bảo vệ bề mặt PE chống trầy xước',
        icon: 'shield',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'Đóng gói chi tiết gỗ',
        description: 'Màng xốp PE foam, màng co nhiệt POF',
        icon: 'archive',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Vật liệu liên kết',
        description: 'Băng keo hai mặt chịu lực, keo dán công nghiệp',
        icon: 'wrench',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'Thùng carton đựng nội thất',
        description: 'Hộp carton sóng khổ lớn đựng tủ, bàn ghế',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      }
    ]
  },
  {
    id: 'hvac',
    name: 'Xây dựng & HVAC',
    hubs: [
      {
        title: 'Băng keo bảo ôn',
        description: 'Băng keo nhôm, băng keo bạc dán ống gió',
        icon: 'zap',
        bgColor: 'bg-yellow-50 text-yellow-600',
      },
      {
        title: 'Vật liệu cách nhiệt',
        description: 'Mút xốp cách nhiệt, bông thủy tinh bảo ôn',
        icon: 'grid',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'Màng chống thấm',
        description: 'Màng PE lót sàn bê tông, màng chống thấm dột',
        icon: 'layers',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Vật tư thông gió',
        description: 'Ống gió mềm nhôm, cổ dê xiết ống gió',
        icon: 'wrench',
        bgColor: 'bg-indigo-50 text-indigo-600',
      }
    ]
  }
];

const resourcesData = [
  {
    id: 'expert',
    name: 'Chuyên ngành',
    hubs: [
      {
        title: 'Hướng dẫn chọn màng co',
        description: 'So sánh màng co POF, PE, PVC: ưu nhược điểm và ứng dụng thực tế',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Tra cứu kích thước carton',
        description: 'Bảng thông số thùng chuẩn theo trọng lượng & thể tích hàng',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Blog ngành bao bì',
        description: 'Các bài phân tích sâu về vật liệu xanh, công nghệ hạt nhựa',
        icon: 'archive',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'Cẩm nang đóng gói xuất khẩu',
        description: 'Tiêu chuẩn ISPM15, quy cách pallet gỗ và quy định từng thị trường lớn',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'Video hướng dẫn kỹ thuật',
        description: 'Vận hành máy đóng đai, máy quấn màng, máy hàn miệng túi',
        icon: 'wrench',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'Infographic & Tài liệu trực quan',
        description: 'Checklist tiêu chuẩn đóng gói nhanh và bảng so sánh các vật liệu',
        icon: 'clipboard-list',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Quy trình đóng gói an toàn',
        description: 'Quy trình SOP đóng hàng dễ vỡ, máy móc siêu trường siêu trọng',
        icon: 'navigation',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Webinar & Workshop',
        description: 'Cập nhật lịch thảo luận về bao bì sinh học và tự động hóa 4.0',
        icon: 'users',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'technical',
    name: 'Tài liệu kỹ thuật',
    hubs: [
      {
        title: 'TDS (Technical Data Sheet)',
        description: 'Bảng thông số kỹ thuật chi tiết của tất cả sản phẩm',
        icon: 'archive',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'MSDS (Material Safety Data Sheet)',
        description: 'Tài liệu an toàn hóa chất & chỉ dẫn an toàn vật liệu',
        icon: 'shield',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Bản vẽ thiết kế 2D/3D',
        description: 'Bản vẽ kỹ thuật CAD cho thùng carton và pallet nhựa',
        icon: 'grid',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'Hướng dẫn sử dụng thiết bị',
        description: 'Sách HDSD máy đóng đai, máy quấn màng tự động',
        icon: 'wrench',
        bgColor: 'bg-rose-50 text-rose-600',
      }
    ]
  },
  {
    id: 'cases',
    name: 'Case Studies',
    hubs: [
      {
        title: 'Tối ưu hóa bao bì F&B',
        description: 'Cách ULink giúp đối tác giảm 15% chi phí đóng gói nhựa',
        icon: 'briefcase',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Giải pháp ESD cho nhà máy điện tử',
        description: 'Khắc phục 99% lỗi phóng tĩnh điện bằng bao bì ESD',
        icon: 'zap',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'Logistics xanh trong xuất khẩu',
        description: 'Hành trình thay thế pallet gỗ sang pallet nhựa tái chế',
        icon: 'globe',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Tự động hóa dây chuyền đóng gói',
        description: 'Tăng 50% năng suất nhờ nâng cấp máy quấn màng robot',
        icon: 'wrench',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'quality',
    name: 'Chất lượng & Chứng nhận',
    hubs: [
      {
        title: 'Chứng nhận ISO 9001:2015',
        description: 'Hệ thống quản lý chất lượng tiêu chuẩn quốc tế',
        icon: 'shield',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Chứng chỉ RoHS & Reach',
        description: 'Cam kết vật liệu thân thiện môi trường, không độc hại',
        icon: 'globe',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'Tiêu chuẩn FDA cho bao bì thực phẩm',
        description: 'Đảm bảo an toàn tiếp xúc thực phẩm trực tiếp',
        icon: 'package',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'Chứng chỉ phòng sạch Class 100-10000',
        description: 'Đạt chuẩn đóng gói thiết bị y tế và bán dẫn',
        icon: 'factory',
        bgColor: 'bg-indigo-50 text-indigo-600',
      }
    ]
  },
  {
    id: 'events',
    name: 'Sự kiện',
    hubs: [
      {
        title: 'Triển lãm ProPak Vietnam 2026',
        description: 'Gặp gỡ ULink tại gian hàng công nghệ bao bì chế biến',
        icon: 'globe',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'Hội thảo Bao bì sinh học bền vững',
        description: 'Thảo luận giải pháp thay thế nhựa dùng một lần',
        icon: 'users',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Khóa đào tạo kỹ thuật đóng gói',
        description: 'Chương trình đào tạo SOP miễn phí cho khách hàng VIP',
        icon: 'wrench',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'Lịch sự kiện & Workshop năm',
        description: 'Xem chi tiết lịch trình các hoạt động kết nối cộng đồng',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      }
    ]
  }
];

const aboutData = [
  {
    id: 'hub-prod',
    name: 'Trung tâm Sản xuất và Phân phối',
    hubs: [
      {
        title: 'Về ULink Industries',
        description: 'Hơn 15 năm kinh nghiệm cung cấp giải pháp bao bì công nghiệp toàn diện',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Năng lực cung ứng',
        description: '15 năm kinh nghiệm sản xuất bao bì, phục vụ 500 doanh nghiệp với năng lực đáp ứng đơn hàng lớn.',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Trung tâm phân phối Hà Nam',
        description: 'Kho logistics 10.000m², phục vụ miền Bắc, giao hàng trong 24h cho khu vực Hà Nội & lân cận',
        icon: 'factory',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Giá trị cốt lõi',
        description: 'Chất lượng, Đổi mới, Bền vững, Khách hàng là trung tâm',
        icon: 'navigation',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Đối tác & Khách hàng',
        description: '500+ doanh nghiệp tin dùng: Samsung, Vinamilk, Nestlé, Masan...',
        icon: 'wrench',
        bgColor: 'bg-violet-50 text-violet-650',
      },
      {
        title: 'Yêu cầu báo giá',
        description: 'Form RFQ nhanh, phản hồi trong 24h, tư vấn miễn phí',
        icon: 'clipboard-list',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Cam kết bền vững',
        description: 'ESG, bao bì tái chế, giảm carbon footprint trong chuỗi cung ứng',
        icon: 'users',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'standards',
    name: 'Tiêu chuẩn & Chứng nhận',
    hubs: [
      {
        title: 'Hệ thống quản lý chất lượng',
        description: 'Đạt chứng nhận ISO 9001:2015 trên toàn hệ thống nhà máy',
        icon: 'shield',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'An toàn thực phẩm',
        description: 'Đạt chứng chỉ HACCP và ISO 22000 cho dây chuyền bao bì F&B',
        icon: 'package',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Tiêu chuẩn phòng sạch',
        description: 'Nhà máy đạt chuẩn Class 100.000 phục vụ bao bì y tế và linh kiện',
        icon: 'factory',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'Chứng nhận an toàn vật liệu',
        description: 'Đầy đủ CO/CQ, đạt tiêu chuẩn xuất khẩu RoHS, REACH, SGS',
        icon: 'archive',
        bgColor: 'bg-rose-50 text-rose-600',
      }
    ]
  },
  {
    id: 'eco',
    name: 'Phát triển bền vững',
    hubs: [
      {
        title: 'Bao bì phân hủy sinh học',
        description: 'Dòng sản phẩm túi và hộp tự phân hủy hoàn toàn thân thiện',
        icon: 'archive',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'Chiến dịch giảm thiểu nhựa',
        description: 'Tối ưu độ dày màng co giúp đối tác giảm 20% hạt nhựa sử dụng',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'Kinh tế tuần hoàn',
        description: 'Chương trình thu hồi và tái chế hạt nhựa từ phế liệu nhà máy',
        icon: 'shield',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'Năng lượng sạch',
        description: 'Nhà máy ULink Hà Nam sử dụng 100% điện mặt trời áp mái',
        icon: 'zap',
        bgColor: 'bg-blue-50 text-blue-600',
      }
    ]
  },
  {
    id: 'careers',
    name: 'Cơ hội nghề nghiệp',
    hubs: [
      {
        title: 'Môi trường làm việc',
        description: 'Trải nghiệm văn hóa chuyên nghiệp, tôn trọng sự sáng tạo và thăng tiến',
        icon: 'users',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'Chính sách đãi ngộ',
        description: 'Lương thưởng cạnh tranh, bảo hiểm toàn diện và du lịch nghỉ mát năm',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'Vị trí tuyển dụng',
        description: 'Xem chi tiết các cơ hội việc làm mới nhất tại các chi nhánh',
        icon: 'grid',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'Đăng ký hồ sơ ứng viên',
        description: 'Nộp hồ sơ trực tuyến nhanh chóng vào kho tài năng của ULink',
        icon: 'package',
        bgColor: 'bg-indigo-50 text-indigo-600',
      }
    ]
  },
  {
    id: 'contact',
    name: 'Liên hệ',
    hubs: [
      {
        title: 'Hotline & Hỗ trợ',
        description: 'Tổng đài tư vấn giải pháp 24/7 và giải đáp RFQ nhanh chóng',
        icon: 'users',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'Văn phòng & Nhà máy',
        description: 'Địa chỉ chi tiết của trụ sở Hà Nội, nhà máy Hà Nam và Bình Dương',
        icon: 'factory',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'Kênh thông tin mạng xã hội',
        description: 'Kết nối với ULink qua LinkedIn, Facebook và Zalo OA',
        icon: 'globe',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'Gửi yêu cầu trực tiếp',
        description: 'Form gửi câu hỏi thắc mắc hoặc yêu cầu gặp trực tiếp kỹ sư',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      }
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
  categoriesData?: NavCategoryItem[];
  regionsData?: NavRegionItem[];
}

export function HeaderNav({ items, categoriesData: dynamicCategoriesData, regionsData: dynamicRegionsData }: HeaderNavProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('packaging');
  const [activeRegion, setActiveRegion] = useState<string>('north');
  const [activeIndustry, setActiveIndustry] = useState<string>('food');
  const [activeResourceTab, setActiveResourceTab] = useState<string>('expert');
  const [activeAboutTab, setActiveAboutTab] = useState<string>('hub-prod');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategories = dynamicCategoriesData && dynamicCategoriesData.length > 0
    ? dynamicCategoriesData
    : categoriesData;

  const activeRegions = dynamicRegionsData && dynamicRegionsData.length > 0
    ? dynamicRegionsData
    : regionsData;

  React.useEffect(() => {
    if (dynamicCategoriesData && dynamicCategoriesData.length > 0) {
      setActiveCategory(dynamicCategoriesData[0].id);
    }
  }, [dynamicCategoriesData]);

  React.useEffect(() => {
    if (dynamicRegionsData && dynamicRegionsData.length > 0) {
      setActiveRegion(dynamicRegionsData[0].id);
    }
  }, [dynamicRegionsData]);

  const currentCategoryData = activeCategories.find((cat) => cat.id === activeCategory);
  const currentRegionData = activeRegions.find((reg) => reg.id === activeRegion);
  const currentIndustryData = industriesData.find((ind) => ind.id === activeIndustry);
  const currentResourceData = resourcesData.find((res) => res.id === activeResourceTab);
  const currentAboutData = aboutData.find((ab) => ab.id === activeAboutTab);

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
    <nav className="hidden flex-1 items-center justify-evenly lg:flex">
      {items.map((item) => {
        const isProductsMenu = item.href === '/solutions';
        const isHubsMenu = item.href === '/regional-hubs';
        const isIndustriesMenu = item.href === '/industries';
        const isResourcesMenu = item.href === '/resources';
        const isAboutMenu = item.href === '/about';
        const hasChildren = (item.children && item.children.length > 0) || isProductsMenu || isHubsMenu || isIndustriesMenu || isResourcesMenu || isAboutMenu;
        const isOpen = activeMenu === item.href;

        return (
          <div
            key={item.href}
            className={`${isProductsMenu || isHubsMenu || isIndustriesMenu || isResourcesMenu || isAboutMenu ? '' : 'relative'} py-4`}
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

            {hasChildren && !isProductsMenu && !isHubsMenu && !isIndustriesMenu && !isResourcesMenu && !isAboutMenu && (
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
                      {activeCategories.map((cat) => {
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
                          const productHref = prod.slug ? `/solutions/listProduct/${prod.slug}` : (currentCategoryData?.link || '#');
                          return (
                            <Link
                              key={idx}
                              href={productHref}
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
                      {activeRegions.map((reg) => {
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
                      onMouseEnter={() => setActiveRegion('hub')}
                      className="flex items-center justify-between border border-[#F2994A] bg-[#FFF9F3] text-[#F2994A] pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#FFEEDB]"
                    >
                      <div className="flex items-center gap-2">
                        <Warehouse className="h-4 w-4 text-[#F2994A]" />
                        <span className="text-[14px] font-bold">{currentRegionData?.hubName || 'HUB Hà Nam'}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#F2994A]" />
                    </Link>

                    {/* Industrial Hub Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-100">
                      <img
                        src={currentRegionData?.hubImage || '/images/regional_hubs/hub-2/hanam-warehouse-shelves.jpg'}
                        alt={currentRegionData?.hubName || 'HUB Hà Nam'}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Column: Grid and Banner */}
                  <div className="flex flex-col bg-white pt-8 pb-8 pl-12 pr-20">
                    <div className="flex-1">
                      {activeRegion === 'hub' ? (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-[16px] font-bold text-slate-800">
                              Trở thành Đối tác phân phối - ULink Industries
                            </span>
                            <div className="h-[2px] w-8 bg-[#F2994A] rounded-full" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            {partnerItems.map((partner, idx) => {
                              const IconComp = IconMap[partner.icon] || Package;
                              return (
                                <Link
                                  key={idx}
                                  href="/register"
                                  onClick={() => setActiveMenu(null)}
                                  className="flex items-start gap-4 group p-2 -m-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                                >
                                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${partner.bgColor} transition-transform duration-200 group-hover:scale-105`}>
                                    <IconComp className="h-5.5 w-5.5" />
                                  </div>

                                  <div className="flex flex-col">
                                    <span className="text-[14px] font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                      {partner.title}
                                    </span>
                                    <span className="mt-1 text-[12px] text-slate-400 leading-relaxed font-medium">
                                      {partner.description}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}

                            {/* 7th Grid Item: Join Partner Link */}
                            <div className="flex items-center">
                              <Link
                                href="/register"
                                onClick={() => setActiveMenu(null)}
                                className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                <span>Đăng ký đối tác ngay</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-[16px] font-bold text-slate-850">
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
                        </>
                      )}
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

            {isOpen && isIndustriesMenu && (
              <div
                className="absolute left-0 right-0 top-full bg-white border-t border-slate-100 border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseEnter={() => handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mx-auto w-full max-w-[1440px] grid grid-cols-[340px_1fr]">
                  {/* Left Column: Industries List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pl-20 pr-8">
                    <div className="flex flex-col gap-1.5">
                      {industriesData.map((ind) => {
                        const isIndActive = activeIndustry === ind.id;
                        return (
                          <div
                            key={ind.id}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              isIndActive
                                ? 'bg-blue-50/70 text-blue-600 font-bold'
                                : 'text-slate-600 hover:bg-slate-50/60 hover:text-brand'
                            }`}
                            onMouseEnter={() => setActiveIndustry(ind.id)}
                          >
                            {isIndActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-[14px] leading-none">{ind.name}</span>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                isIndActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
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
                          Giải pháp ngành {currentIndustryData?.id === 'food' ? 'Thực phẩm & Đồ uống' : currentIndustryData?.name}
                        </span>
                        <div className="h-[2px] w-8 bg-blue-655 bg-blue-600 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {currentIndustryData?.hubs.map((hub, idx) => {
                          const IconComp = IconMap[hub.icon] || Package;
                          return (
                            <Link
                              key={idx}
                              href="/solutions/listProduct"
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
                            href="/solutions/listProduct"
                            onClick={() => setActiveMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>Xem tất cả giải pháp ngành</span>
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
                      Giải pháp bao bì xanh — Bao bì phân hủy sinh học cho ngành F&B —{' '}
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

            {isOpen && isResourcesMenu && (
              <div
                className="absolute left-0 right-0 top-full bg-white border-t border-slate-100 border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseEnter={() => handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mx-auto w-full max-w-[1440px] grid grid-cols-[340px_1fr]">
                  {/* Left Column: Resources List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pl-20 pr-8">
                    <div className="flex flex-col gap-1.5">
                      {resourcesData.map((res) => {
                        const isResActive = activeResourceTab === res.id;
                        return (
                          <div
                            key={res.id}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              isResActive
                                ? 'bg-blue-50/70 text-blue-600 font-bold'
                                : 'text-slate-600 hover:bg-slate-50/60 hover:text-brand'
                            }`}
                            onMouseEnter={() => setActiveResourceTab(res.id)}
                          >
                            {isResActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-[14px] leading-none">{res.name}</span>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                isResActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
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
                          Kiến thức đóng gói chuyên nghiệp
                        </span>
                        <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {currentResourceData?.hubs.map((hub, idx) => {
                          const IconComp = IconMap[hub.icon] || Package;
                          return (
                            <Link
                              key={idx}
                              href="/resources"
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
                            href="/resources"
                            onClick={() => setActiveMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>Xem tất cả tài nguyên</span>
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
                      Ebook miễn phí — 10 Sai lầm phổ biến khi đóng gói hàng xuất khẩu —{' '}
                      <Link
                        href="/resources"
                        onClick={() => setActiveMenu(null)}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Tải ngay →
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {isOpen && isAboutMenu && (
              <div
                className="absolute left-0 right-0 top-full bg-white border-t border-slate-100 border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseEnter={() => handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mx-auto w-full max-w-[1440px] grid grid-cols-[340px_1fr]">
                  {/* Left Column: About Categories List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pl-20 pr-8">
                    <div className="flex flex-col gap-1.5">
                      {aboutData.map((ab) => {
                        const isAbActive = activeAboutTab === ab.id;
                        return (
                          <div
                            key={ab.id}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              isAbActive
                                ? 'bg-blue-50/70 text-blue-600 font-bold'
                                : 'text-slate-600 hover:bg-slate-50/60 hover:text-brand'
                            }`}
                            onMouseEnter={() => setActiveAboutTab(ab.id)}
                          >
                            {isAbActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-[14px] leading-none">{ab.name}</span>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                isAbActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
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
                          {activeAboutTab === 'hub-prod' ? 'Hub Hà Nam' : currentAboutData?.name}
                        </span>
                        <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {currentAboutData?.hubs.map((hub, idx) => {
                          const IconComp = IconMap[hub.icon] || Package;
                          return (
                            <Link
                              key={idx}
                              href="/about"
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
                            href="/about"
                            onClick={() => setActiveMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-[14px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>Xem thêm về chúng tôi</span>
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
                      Tuyển dụng: ULink đang tìm kiếm Trưởng phòng Kinh doanh B2B (Bao bì) —{' '}
                      <Link
                        href="/about"
                        onClick={() => setActiveMenu(null)}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Ứng tuyển ngay →
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
