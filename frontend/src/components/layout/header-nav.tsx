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
import { useTranslations } from 'next-intl';

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
    name: 'mega.solutions.categories.packaging.name',
    link: '/solutions/listProduct',
    products: [
      {
        title: 'mega.solutions.categories.packaging.items.pof.title',
        description: 'mega.solutions.categories.packaging.items.pof.desc',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.solutions.categories.packaging.items.tape.title',
        description: 'mega.solutions.categories.packaging.items.tape.desc',
        icon: 'wrench',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.solutions.categories.packaging.items.shrinkPe.title',
        description: 'mega.solutions.categories.packaging.items.shrinkPe.desc',
        icon: 'file-text',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.solutions.categories.packaging.items.palletWrap.title',
        description: 'mega.solutions.categories.packaging.items.palletWrap.desc',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.solutions.categories.packaging.items.carton.title',
        description: 'mega.solutions.categories.packaging.items.carton.desc',
        icon: 'users',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'mega.solutions.categories.packaging.items.hipsPp.title',
        description: 'mega.solutions.categories.packaging.items.hipsPp.desc',
        icon: 'clipboard-list',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.solutions.categories.packaging.items.peHdBag.title',
        description: 'mega.solutions.categories.packaging.items.peHdBag.desc',
        icon: 'archive',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.solutions.categories.packaging.items.palletWood.title',
        description: 'mega.solutions.categories.packaging.items.palletWood.desc',
        icon: 'milestone',
        bgColor: 'bg-rose-50 text-rose-600',
      },
    ]
  },
  {
    id: 'cleanroom',
    name: 'mega.solutions.categories.cleanroom.name',
    link: '/solutions/listProduct',
    products: [
      {
        title: 'mega.solutions.categories.cleanroom.items.gloves.title',
        description: 'mega.solutions.categories.cleanroom.items.gloves.desc',
        icon: 'hand',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.solutions.categories.cleanroom.items.wipes.title',
        description: 'mega.solutions.categories.cleanroom.items.wipes.desc',
        icon: 'brush',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.solutions.categories.cleanroom.items.bags.title',
        description: 'mega.solutions.categories.cleanroom.items.bags.desc',
        icon: 'shopping-bag',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.solutions.categories.cleanroom.items.apparel.title',
        description: 'mega.solutions.categories.cleanroom.items.apparel.desc',
        icon: 'layers',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.solutions.categories.cleanroom.items.shoeCover.title',
        description: 'mega.solutions.categories.cleanroom.items.shoeCover.desc',
        icon: 'footprints',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.solutions.categories.cleanroom.items.consumables.title',
        description: 'mega.solutions.categories.cleanroom.items.consumables.desc',
        icon: 'recycle',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.solutions.categories.cleanroom.items.mask.title',
        description: 'mega.solutions.categories.cleanroom.items.mask.desc',
        icon: 'shield',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'mega.solutions.categories.cleanroom.items.goggles.title',
        description: 'mega.solutions.categories.cleanroom.items.goggles.desc',
        icon: 'eye',
        bgColor: 'bg-rose-50 text-rose-600',
      },
    ]
  },
  {
    id: 'aluminum',
    name: 'mega.solutions.categories.aluminum.name',
    link: '/solutions/listProduct',
    products: [
      {
        title: 'mega.solutions.categories.aluminum.items.heatResist.title',
        description: 'mega.solutions.categories.aluminum.items.heatResist.desc',
        icon: 'thermometer',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.solutions.categories.aluminum.items.moistResist.title',
        description: 'mega.solutions.categories.aluminum.items.moistResist.desc',
        icon: 'droplet',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'mega.solutions.categories.aluminum.items.ductTape.title',
        description: 'mega.solutions.categories.aluminum.items.ductTape.desc',
        icon: 'wind',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.solutions.categories.aluminum.items.thermal.title',
        description: 'mega.solutions.categories.aluminum.items.thermal.desc',
        icon: 'cpu',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.solutions.categories.aluminum.items.decor.title',
        description: 'mega.solutions.categories.aluminum.items.decor.desc',
        icon: 'palette',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.solutions.categories.aluminum.items.selfAdhesive.title',
        description: 'mega.solutions.categories.aluminum.items.selfAdhesive.desc',
        icon: 'pin',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.solutions.categories.aluminum.items.insul.title',
        description: 'mega.solutions.categories.aluminum.items.insul.desc',
        icon: 'zap',
        bgColor: 'bg-yellow-50 text-yellow-600',
      },
      {
        title: 'mega.solutions.categories.aluminum.items.reinforced.title',
        description: 'mega.solutions.categories.aluminum.items.reinforced.desc',
        icon: 'grid',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
    ]
  }
];

const viewAllLabels: Record<string, string> = {
  packaging: 'mega.solutions.viewAllShort.packaging',
  cleanroom: 'mega.solutions.viewAllShort.cleanroom',
  aluminum: 'mega.solutions.viewAllShort.aluminum'
};

const categoryQueryById: Record<string, string> = {
  packaging: 'industrial-packaging',
  cleanroom: 'cleanroom-consumables',
  aluminum: 'bang-keo-nhom'
};

export function buildCategoryProductsHref(category?: Pick<NavCategoryItem, 'id'> | null) {
  if (!category) return '/solutions/listProduct';

  const categorySlug = categoryQueryById[category.id] || category.id;
  return `/solutions/listProduct?category=${encodeURIComponent(categorySlug)}`;
}

const industryPathMap: Record<string, string> = {
  food: '/industries/food',
  'food-beverage': '/industries/food',
  medical: '/industries/pharmaceutical',
  pharmaceutical: '/industries/pharmaceutical',
  'pharmaceutical-cosmetics': '/industries/pharmaceutical',
  electronics: '/industries/electronics',
  logistics: '/industries/logistics',
  furniture: '/industries/furniture',
  hvac: '/industries/construction',
  construction: '/industries/construction'
};

export function getIndustryHref(ind?: { id: string; slug?: string } | null) {
  if (!ind) return '/industries';
  if (ind.id && industryPathMap[ind.id]) return industryPathMap[ind.id];
  if (ind.slug && industryPathMap[ind.slug]) return industryPathMap[ind.slug];
  return `/industries/${ind.slug || ind.id}`;
}

const partnerItems = [
  {
    title: 'mega.hubs.partnerItems.network.title',
    description: 'mega.hubs.partnerItems.network.desc',
    icon: 'map-pin',
    bgColor: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'mega.hubs.partnerItems.catalog.title',
    description: 'mega.hubs.partnerItems.catalog.desc',
    icon: 'factory',
    bgColor: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'mega.hubs.partnerItems.training.title',
    description: 'mega.hubs.partnerItems.training.desc',
    icon: 'users',
    bgColor: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'mega.hubs.partnerItems.support.title',
    description: 'mega.hubs.partnerItems.support.desc',
    icon: 'wrench',
    bgColor: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'mega.hubs.partnerItems.hanamProd.title',
    description: 'mega.hubs.partnerItems.hanamProd.desc',
    icon: 'pin',
    bgColor: 'bg-violet-50 text-violet-650',
  },
  {
    title: 'mega.hubs.partnerItems.pricing.title',
    description: 'mega.hubs.partnerItems.pricing.desc',
    icon: 'grid',
    bgColor: 'bg-amber-50 text-amber-600',
  }
];

const regionsData: NavRegionItem[] = [
  {
    id: 'north',
    name: 'mega.hubs.regions.north.name',
    link: '/quick-order',
    hubName: 'HUB Hà Nam',
    hubLink: '/regional-hubs/cum-2',
    hubImage: '/images/regional_hubs/hub-2/hanam-warehouse-shelves.jpg',
    hubs: [
      {
        title: 'mega.hubs.regions.north.items.dinhVu.title',
        description: 'mega.hubs.regions.north.items.dinhVu.desc',
        icon: 'map-pin',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.hubs.regions.north.items.thangLong.title',
        description: 'mega.hubs.regions.north.items.thangLong.desc',
        icon: 'factory',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.hubs.regions.north.items.queVo.title',
        description: 'mega.hubs.regions.north.items.queVo.desc',
        icon: 'factory',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'mega.hubs.regions.north.items.phucDien.title',
        description: 'mega.hubs.regions.north.items.phucDien.desc',
        icon: 'factory',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.hubs.regions.north.items.yenPhong.title',
        description: 'mega.hubs.regions.north.items.yenPhong.desc',
        icon: 'factory',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.hubs.regions.north.items.daiAn.title',
        description: 'mega.hubs.regions.north.items.daiAn.desc',
        icon: 'factory',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.hubs.regions.north.items.tienSon.title',
        description: 'mega.hubs.regions.north.items.tienSon.desc',
        icon: 'factory',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.hubs.regions.north.items.namSach.title',
        description: 'mega.hubs.regions.north.items.namSach.desc',
        icon: 'map-pin',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
    ]
  },
  {
    id: 'center',
    name: 'mega.hubs.regions.center.name',
    link: '/quick-order',
    hubName: 'HUB Hà Nam',
    hubLink: '/regional-hubs/cum-2',
    hubImage: '/images/regional_hubs/hub-2/hanam-warehouse-shelves.jpg',
    hubs: [
      {
        title: 'mega.hubs.regions.center.items.phuBai.title',
        description: 'mega.hubs.regions.center.items.phuBai.desc',
        icon: 'map-pin',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.hubs.regions.center.items.dienNam.title',
        description: 'mega.hubs.regions.center.items.dienNam.desc',
        icon: 'factory',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.hubs.regions.center.items.hoaKhanh.title',
        description: 'mega.hubs.regions.center.items.hoaKhanh.desc',
        icon: 'factory',
        bgColor: 'bg-teal-50 text-teal-600',
      },
      {
        title: 'mega.hubs.regions.center.items.phuTai.title',
        description: 'mega.hubs.regions.center.items.phuTai.desc',
        icon: 'factory',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.hubs.regions.center.items.dungQuat.title',
        description: 'mega.hubs.regions.center.items.dungQuat.desc',
        icon: 'factory',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.hubs.regions.center.items.tinhPhong.title',
        description: 'mega.hubs.regions.center.items.tinhPhong.desc',
        icon: 'factory',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.hubs.regions.center.items.phongDien.title',
        description: 'mega.hubs.regions.center.items.phongDien.desc',
        icon: 'factory',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.hubs.regions.center.items.chuLai.title',
        description: 'mega.hubs.regions.center.items.chuLai.desc',
        icon: 'map-pin',
        bgColor: 'bg-blue-50 text-blue-600',
      },
    ]
  },
  {
    id: 'south',
    name: 'mega.hubs.regions.south.name',
    link: '/quick-order',
    hubName: 'HUB Hà Nam',
    hubLink: '/regional-hubs/cum-2',
    hubImage: '/images/regional_hubs/hub-2/hanam-warehouse-shelves.jpg',
    hubs: [
      {
        title: 'mega.hubs.regions.south.items.vsipBd.title',
        description: 'mega.hubs.regions.south.items.vsipBd.desc',
        icon: 'users',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.hubs.regions.south.items.nhonTrach.title',
        description: 'mega.hubs.regions.south.items.nhonTrach.desc',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.hubs.regions.south.items.longHau.title',
        description: 'mega.hubs.regions.south.items.longHau.desc',
        icon: 'navigation',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.hubs.regions.south.items.tanThuan.title',
        description: 'mega.hubs.regions.south.items.tanThuan.desc',
        icon: 'globe',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.hubs.regions.south.items.myPhuoc.title',
        description: 'mega.hubs.regions.south.items.myPhuoc.desc',
        icon: 'grid',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.hubs.regions.south.items.phuMy.title',
        description: 'mega.hubs.regions.south.items.phuMy.desc',
        icon: 'flask',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.hubs.regions.south.items.ducHoa.title',
        description: 'mega.hubs.regions.south.items.ducHoa.desc',
        icon: 'package',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.hubs.regions.south.items.bienHoa.title',
        description: 'mega.hubs.regions.south.items.bienHoa.desc',
        icon: 'map-pin',
        bgColor: 'bg-blue-50 text-blue-600',
      },
    ]
  }
];

const industriesData = [
  {
    id: 'food',
    slug: 'food-beverage',
    name: 'mega.industries.food.name',
    hubs: [
      {
        title: 'mega.industries.food.hubs.dryFood.title',
        description: 'mega.industries.food.hubs.dryFood.desc',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.industries.food.hubs.fresh.title',
        description: 'mega.industries.food.hubs.fresh.desc',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.industries.food.hubs.palletFb.title',
        description: 'mega.industries.food.hubs.palletFb.desc',
        icon: 'archive',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.industries.food.hubs.frozen.title',
        description: 'mega.industries.food.hubs.frozen.desc',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.industries.food.hubs.confection.title',
        description: 'mega.industries.food.hubs.confection.desc',
        icon: 'wrench',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.industries.food.hubs.bins.title',
        description: 'mega.industries.food.hubs.bins.desc',
        icon: 'clipboard-list',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.industries.food.hubs.beverage.title',
        description: 'mega.industries.food.hubs.beverage.desc',
        icon: 'navigation',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.industries.food.hubs.hygiene.title',
        description: 'mega.industries.food.hubs.hygiene.desc',
        icon: 'users',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'medical',
    slug: 'pharmaceutical-cosmetics',
    name: 'mega.industries.medical.name',
    hubs: [
      {
        title: 'mega.industries.medical.hubs.pharmaPack.title',
        description: 'mega.industries.medical.hubs.pharmaPack.desc',
        icon: 'archive',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.industries.medical.hubs.cleanroomMed.title',
        description: 'mega.industries.medical.hubs.cleanroomMed.desc',
        icon: 'shield',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.industries.medical.hubs.ppeMed.title',
        description: 'mega.industries.medical.hubs.ppeMed.desc',
        icon: 'users',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'mega.industries.medical.hubs.vaccine.title',
        description: 'mega.industries.medical.hubs.vaccine.desc',
        icon: 'package',
        bgColor: 'bg-rose-50 text-rose-600',
      }
    ]
  },
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'mega.industries.electronics.name',
    hubs: [
      {
        title: 'mega.industries.electronics.hubs.esdBag.title',
        description: 'mega.industries.electronics.hubs.esdBag.desc',
        icon: 'zap',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.industries.electronics.hubs.tray.title',
        description: 'mega.industries.electronics.hubs.tray.desc',
        icon: 'grid',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.industries.electronics.hubs.esdRoom.title',
        description: 'mega.industries.electronics.hubs.esdRoom.desc',
        icon: 'users',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.industries.electronics.hubs.kaptonTape.title',
        description: 'mega.industries.electronics.hubs.kaptonTape.desc',
        icon: 'wrench',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'logistics',
    slug: 'logistics',
    name: 'mega.industries.logistics.name',
    hubs: [
      {
        title: 'mega.industries.logistics.hubs.palletPack.title',
        description: 'mega.industries.logistics.hubs.palletPack.desc',
        icon: 'layers',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.industries.logistics.hubs.airbag.title',
        description: 'mega.industries.logistics.hubs.airbag.desc',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.industries.logistics.hubs.seal.title',
        description: 'mega.industries.logistics.hubs.seal.desc',
        icon: 'shield',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.industries.logistics.hubs.shipBox.title',
        description: 'mega.industries.logistics.hubs.shipBox.desc',
        icon: 'package',
        bgColor: 'bg-indigo-50 text-indigo-600',
      }
    ]
  },
  {
    id: 'furniture',
    slug: 'furniture',
    name: 'mega.industries.furniture.name',
    hubs: [
      {
        title: 'mega.industries.furniture.hubs.surfaceProt.title',
        description: 'mega.industries.furniture.hubs.surfaceProt.desc',
        icon: 'shield',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'mega.industries.furniture.hubs.woodPack.title',
        description: 'mega.industries.furniture.hubs.woodPack.desc',
        icon: 'archive',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.industries.furniture.hubs.adhesive.title',
        description: 'mega.industries.furniture.hubs.adhesive.desc',
        icon: 'wrench',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.industries.furniture.hubs.largeBox.title',
        description: 'mega.industries.furniture.hubs.largeBox.desc',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      }
    ]
  },
  {
    id: 'hvac',
    slug: 'construction',
    name: 'mega.industries.hvac.name',
    hubs: [
      {
        title: 'mega.industries.hvac.hubs.insulTape.title',
        description: 'mega.industries.hvac.hubs.insulTape.desc',
        icon: 'zap',
        bgColor: 'bg-yellow-50 text-yellow-600',
      },
      {
        title: 'mega.industries.hvac.hubs.insulMat.title',
        description: 'mega.industries.hvac.hubs.insulMat.desc',
        icon: 'grid',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.industries.hvac.hubs.waterproof.title',
        description: 'mega.industries.hvac.hubs.waterproof.desc',
        icon: 'layers',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.industries.hvac.hubs.vent.title',
        description: 'mega.industries.hvac.hubs.vent.desc',
        icon: 'wrench',
        bgColor: 'bg-indigo-50 text-indigo-600',
      }
    ]
  }
];

const resourcesData = [
  {
    id: 'expert',
    name: 'mega.resources.tabs.expert.name',
    hubs: [
      {
        title: 'mega.resources.tabs.expert.hubs.shrinkGuide.title',
        description: 'mega.resources.tabs.expert.hubs.shrinkGuide.desc',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.resources.tabs.expert.hubs.cartonLookup.title',
        description: 'mega.resources.tabs.expert.hubs.cartonLookup.desc',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.resources.tabs.expert.hubs.blog.title',
        description: 'mega.resources.tabs.expert.hubs.blog.desc',
        icon: 'archive',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.resources.tabs.expert.hubs.exportGuide.title',
        description: 'mega.resources.tabs.expert.hubs.exportGuide.desc',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.resources.tabs.expert.hubs.video.title',
        description: 'mega.resources.tabs.expert.hubs.video.desc',
        icon: 'wrench',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.resources.tabs.expert.hubs.infographic.title',
        description: 'mega.resources.tabs.expert.hubs.infographic.desc',
        icon: 'clipboard-list',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.resources.tabs.expert.hubs.safetyProc.title',
        description: 'mega.resources.tabs.expert.hubs.safetyProc.desc',
        icon: 'navigation',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.resources.tabs.expert.hubs.webinar.title',
        description: 'mega.resources.tabs.expert.hubs.webinar.desc',
        icon: 'users',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'technical',
    name: 'mega.resources.tabs.technical.name',
    hubs: [
      {
        title: 'mega.resources.tabs.technical.hubs.tds.title',
        description: 'mega.resources.tabs.technical.hubs.tds.desc',
        icon: 'archive',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.resources.tabs.technical.hubs.msds.title',
        description: 'mega.resources.tabs.technical.hubs.msds.desc',
        icon: 'shield',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.resources.tabs.technical.hubs.cad.title',
        description: 'mega.resources.tabs.technical.hubs.cad.desc',
        icon: 'grid',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'mega.resources.tabs.technical.hubs.equipManual.title',
        description: 'mega.resources.tabs.technical.hubs.equipManual.desc',
        icon: 'wrench',
        bgColor: 'bg-rose-50 text-rose-600',
      }
    ]
  },
  {
    id: 'cases',
    name: 'mega.resources.tabs.cases.name',
    hubs: [
      {
        title: 'mega.resources.tabs.cases.hubs.fbOpt.title',
        description: 'mega.resources.tabs.cases.hubs.fbOpt.desc',
        icon: 'briefcase',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.resources.tabs.cases.hubs.esdCase.title',
        description: 'mega.resources.tabs.cases.hubs.esdCase.desc',
        icon: 'zap',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.resources.tabs.cases.hubs.greenLog.title',
        description: 'mega.resources.tabs.cases.hubs.greenLog.desc',
        icon: 'globe',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.resources.tabs.cases.hubs.autoLine.title',
        description: 'mega.resources.tabs.cases.hubs.autoLine.desc',
        icon: 'wrench',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'quality',
    name: 'mega.resources.tabs.quality.name',
    hubs: [
      {
        title: 'mega.resources.tabs.quality.hubs.iso9001.title',
        description: 'mega.resources.tabs.quality.hubs.iso9001.desc',
        icon: 'shield',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.resources.tabs.quality.hubs.rohs.title',
        description: 'mega.resources.tabs.quality.hubs.rohs.desc',
        icon: 'globe',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.resources.tabs.quality.hubs.fda.title',
        description: 'mega.resources.tabs.quality.hubs.fda.desc',
        icon: 'package',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.resources.tabs.quality.hubs.cleanroomCert.title',
        description: 'mega.resources.tabs.quality.hubs.cleanroomCert.desc',
        icon: 'factory',
        bgColor: 'bg-indigo-50 text-indigo-600',
      }
    ]
  },
  {
    id: 'events',
    name: 'mega.resources.tabs.events.name',
    hubs: [
      {
        title: 'mega.resources.tabs.events.hubs.propak.title',
        description: 'mega.resources.tabs.events.hubs.propak.desc',
        icon: 'globe',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'mega.resources.tabs.events.hubs.biopack.title',
        description: 'mega.resources.tabs.events.hubs.biopack.desc',
        icon: 'users',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.resources.tabs.events.hubs.trainCourse.title',
        description: 'mega.resources.tabs.events.hubs.trainCourse.desc',
        icon: 'wrench',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.resources.tabs.events.hubs.calendar.title',
        description: 'mega.resources.tabs.events.hubs.calendar.desc',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      }
    ]
  }
];

const aboutData = [
  {
    id: 'hub-prod',
    name: 'mega.about.tabs.hubProd.name',
    hubs: [
      {
        title: 'mega.about.tabs.hubProd.hubs.about.title',
        description: 'mega.about.tabs.hubProd.hubs.about.desc',
        icon: 'package',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.about.tabs.hubProd.hubs.capacity.title',
        description: 'mega.about.tabs.hubProd.hubs.capacity.desc',
        icon: 'clipboard-list',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.about.tabs.hubProd.hubs.hanam.title',
        description: 'mega.about.tabs.hubProd.hubs.hanam.desc',
        icon: 'factory',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.about.tabs.hubProd.hubs.values.title',
        description: 'mega.about.tabs.hubProd.hubs.values.desc',
        icon: 'navigation',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.about.tabs.hubProd.hubs.partners.title',
        description: 'mega.about.tabs.hubProd.hubs.partners.desc',
        icon: 'wrench',
        bgColor: 'bg-violet-50 text-violet-650',
      },
      {
        title: 'mega.about.tabs.hubProd.hubs.rfq.title',
        description: 'mega.about.tabs.hubProd.hubs.rfq.desc',
        icon: 'clipboard-list',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.about.tabs.hubProd.hubs.sustain.title',
        description: 'mega.about.tabs.hubProd.hubs.sustain.desc',
        icon: 'users',
        bgColor: 'bg-emerald-50 text-emerald-600',
      }
    ]
  },
  {
    id: 'standards',
    name: 'mega.about.tabs.standards.name',
    hubs: [
      {
        title: 'mega.about.tabs.standards.hubs.qms.title',
        description: 'mega.about.tabs.standards.hubs.qms.desc',
        icon: 'shield',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.about.tabs.standards.hubs.foodSafety.title',
        description: 'mega.about.tabs.standards.hubs.foodSafety.desc',
        icon: 'package',
        bgColor: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'mega.about.tabs.standards.hubs.cleanroomStd.title',
        description: 'mega.about.tabs.standards.hubs.cleanroomStd.desc',
        icon: 'factory',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'mega.about.tabs.standards.hubs.materialSafety.title',
        description: 'mega.about.tabs.standards.hubs.materialSafety.desc',
        icon: 'archive',
        bgColor: 'bg-rose-50 text-rose-600',
      }
    ]
  },
  {
    id: 'eco',
    name: 'mega.about.tabs.eco.name',
    hubs: [
      {
        title: 'mega.about.tabs.eco.hubs.biodeg.title',
        description: 'mega.about.tabs.eco.hubs.biodeg.desc',
        icon: 'archive',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.about.tabs.eco.hubs.plasticReduce.title',
        description: 'mega.about.tabs.eco.hubs.plasticReduce.desc',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.about.tabs.eco.hubs.circular.title',
        description: 'mega.about.tabs.eco.hubs.circular.desc',
        icon: 'shield',
        bgColor: 'bg-violet-50 text-violet-600',
      },
      {
        title: 'mega.about.tabs.eco.hubs.cleanEnergy.title',
        description: 'mega.about.tabs.eco.hubs.cleanEnergy.desc',
        icon: 'zap',
        bgColor: 'bg-blue-50 text-blue-600',
      }
    ]
  },
  {
    id: 'careers',
    name: 'mega.about.tabs.careers.name',
    hubs: [
      {
        title: 'mega.about.tabs.careers.hubs.workEnv.title',
        description: 'mega.about.tabs.careers.hubs.workEnv.desc',
        icon: 'users',
        bgColor: 'bg-blue-50 text-blue-600',
      },
      {
        title: 'mega.about.tabs.careers.hubs.benefits.title',
        description: 'mega.about.tabs.careers.hubs.benefits.desc',
        icon: 'briefcase',
        bgColor: 'bg-orange-50 text-orange-600',
      },
      {
        title: 'mega.about.tabs.careers.hubs.positions.title',
        description: 'mega.about.tabs.careers.hubs.positions.desc',
        icon: 'grid',
        bgColor: 'bg-rose-50 text-rose-600',
      },
      {
        title: 'mega.about.tabs.careers.hubs.apply.title',
        description: 'mega.about.tabs.careers.hubs.apply.desc',
        icon: 'package',
        bgColor: 'bg-indigo-50 text-indigo-600',
      }
    ]
  },
  {
    id: 'contact',
    name: 'mega.about.tabs.contact.name',
    hubs: [
      {
        title: 'mega.about.tabs.contact.hubs.hotline.title',
        description: 'mega.about.tabs.contact.hubs.hotline.desc',
        icon: 'users',
        bgColor: 'bg-sky-50 text-sky-600',
      },
      {
        title: 'mega.about.tabs.contact.hubs.offices.title',
        description: 'mega.about.tabs.contact.hubs.offices.desc',
        icon: 'factory',
        bgColor: 'bg-amber-50 text-amber-600',
      },
      {
        title: 'mega.about.tabs.contact.hubs.social.title',
        description: 'mega.about.tabs.contact.hubs.social.desc',
        icon: 'globe',
        bgColor: 'bg-emerald-50 text-emerald-600',
      },
      {
        title: 'mega.about.tabs.contact.hubs.directRequest.title',
        description: 'mega.about.tabs.contact.hubs.directRequest.desc',
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
  const t = useTranslations('nav');
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
    <nav className="hidden flex-1 items-center justify-evenly xl:flex">
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
              className={`inline-flex items-center gap-1.5 text-header-desktop font-normal transition-all duration-200 ${isOpen ? 'text-brand font-medium' : 'text-[#141414] hover:text-brand hover:scale-[1.02]'
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
                            <span className="text-caption-responsive font-semibold text-slate-800">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 text-caption-responsive text-slate-500">
                                {child.description}
                              </span>
                            )}
                            <div className="mt-1 flex flex-col gap-0.5 pl-3 border-l border-slate-200">
                              {child.subChildren!.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setActiveMenu(null)}
                                  className="rounded-[3px] px-2 py-1.5 text-caption-responsive text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand"
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
                          <span className="text-caption-responsive font-semibold text-slate-800 transition-colors group-hover:text-brand">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 text-caption-responsive text-slate-500">
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
                <div className="page-container grid grid-cols-[340px_1fr]">
                  {/* Left Column: Categories List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pr-8">
                    <div className="flex flex-col gap-1.5">
                      {activeCategories.map((cat) => {
                        const isCatActive = activeCategory === cat.id;
                        return (
                          <Link
                            key={cat.id}
                            href={buildCategoryProductsHref(cat)}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              isCatActive
                                ? 'bg-blue-50/80 text-blue-600 font-bold shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                                : 'text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                            }`}
                            onMouseEnter={() => setActiveCategory(cat.id)}
                            onClick={() => setActiveMenu(null)}
                          >
                            {isCatActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-body-regular leading-none">{t(cat.name)}</span>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                isCatActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Grid and Banner */}
                  <div className="flex flex-col bg-white pt-8 pb-8 pl-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-body-regular font-bold text-slate-800">
                          {t('mega.headings.productsInCategory', { name: currentCategoryData ? t(currentCategoryData.name) : '' })}
                        </span>
                        <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {currentCategoryData?.products.map((prod, idx) => {
                          const IconComp = IconMap[prod.icon] || Package;
                          const productHref = prod.slug ? `/solutions/listProduct/${prod.slug}` : buildCategoryProductsHref(currentCategoryData);
                          return (
                            <Link
                              key={idx}
                              href={productHref}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-start gap-3.5 group p-3 -m-2 rounded-[6px] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50/40 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)]"
                            >
                              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${prod.bgColor} transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-sm`}>
                                <IconComp className="h-5.5 w-5.5" />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-body-regular font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                  {t(prod.title)}
                                </span>
                                <span className="mt-1 text-caption-responsive text-slate-400 leading-relaxed font-medium">
                                  {t(prod.description)}
                                </span>
                              </div>
                            </Link>
                          );
                        })}

                        {/* 9th Grid Item: View All Link */}
                        <div className="flex items-center">
                          <Link
                            href={buildCategoryProductsHref(currentCategoryData)}
                            onClick={() => setActiveMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-body-regular font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>
                              {t('mega.cta.viewAllProducts', {
                                name: t(viewAllLabels[currentCategoryData?.id || ''] || currentCategoryData?.name || 'mega.solutions.categories.packaging.name')
                              })}
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
                  <div className="page-container flex items-center py-3.5">
                    <span className="inline-flex items-center justify-center bg-blue-600 text-white text-caption-responsive font-bold px-2 py-0.5 rounded-[2px] tracking-wider">
                      {t('mega.badges.new')}
                    </span>
                    <span className="text-caption-responsive text-slate-500 font-bold ml-3">
                      {t('mega.promo.aiSolution')} —{' '}
                      <Link
                        href="/solutions"
                        onClick={() => setActiveMenu(null)}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {t('mega.cta.learnMore')}
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
                <div className="page-container grid grid-cols-[340px_1fr]">
                  {/* Left Column: Regions List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pr-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      {activeRegions.map((reg) => {
                        const isRegActive = activeRegion === reg.id;
                        return (
                          <div
                            key={reg.id}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              isRegActive
                                ? 'bg-blue-50/80 text-blue-600 font-bold shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                                : 'text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                            }`}
                            onMouseEnter={() => setActiveRegion(reg.id)}
                          >
                            {isRegActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-body-regular leading-none">{t(reg.name)}</span>
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
                      href="/regional-hubs/cum-2"
                      onClick={() => setActiveMenu(null)}
                      onMouseEnter={() => setActiveRegion('hub')}
                      className="flex items-center justify-between border border-[#F2994A] bg-[#FFF9F3] text-[#F2994A] pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#FFEEDB] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#F2994A,0_8px_25px_-5px_rgba(242,153,74,0.25)]"
                    >
                      <div className="flex items-center gap-2">
                        <Warehouse className="h-4 w-4 text-[#F2994A]" />
                        <span className="text-body-regular font-bold">{currentRegionData?.hubName || 'HUB Hà Nam'}</span>
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
                  <div className="flex flex-col bg-white pt-8 pb-8 pl-12">
                    <div className="flex-1">
                      {activeRegion === 'hub' ? (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-body-regular font-bold text-slate-800">
                              {t('mega.headings.becomePartner')}
                            </span>
                            <div className="h-[2px] w-8 bg-[#F2994A] rounded-full" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            {partnerItems.map((partner, idx) => {
                              const IconComp = IconMap[partner.icon] || Package;
                              return (
                                <Link
                                  key={idx}
                                  href="/regional-hubs/cum-2"
                                  onClick={() => setActiveMenu(null)}
                                  className="flex items-start gap-3.5 group p-3 -m-2 rounded-[6px] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50/40 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)]"
                                >
                                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${partner.bgColor} transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-sm`}>
                                    <IconComp className="h-5.5 w-5.5" />
                                  </div>

                                  <div className="flex flex-col">
                                    <span className="text-body-regular font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                      {t(partner.title)}
                                    </span>
                                    <span className="mt-1 text-caption-responsive text-slate-400 leading-relaxed font-medium">
                                      {t(partner.description)}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}

                            {/* 7th Grid Item: Join Partner Link */}
                            <div className="flex items-center">
                              <Link
                                href="/regional-hubs/cum-2"
                                onClick={() => setActiveMenu(null)}
                                className="group inline-flex items-center gap-1.5 text-body-regular font-bold text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                <span>{t('mega.cta.registerPartner')}</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-body-regular font-bold text-slate-850">
                              {t('mega.headings.parksInRegion', { name: currentRegionData ? t(currentRegionData.name) : '' })}
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
                                  className="flex items-start gap-3.5 group p-3 -m-2 rounded-[6px] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50/40 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)]"
                                >
                                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${hub.bgColor} transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-sm`}>
                                    <IconComp className="h-5.5 w-5.5" />
                                  </div>

                                  <div className="flex flex-col">
                                    <span className="text-body-regular font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                      {t(hub.title)}
                                    </span>
                                    <span className="mt-1 text-caption-responsive text-slate-400 leading-relaxed font-medium">
                                      {t(hub.description)}
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
                                className="group inline-flex items-center gap-1.5 text-body-regular font-bold text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                <span>{t('mega.cta.viewAllParks')}</span>
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
                  <div className="page-container flex items-center py-3.5">
                    <span className="inline-flex items-center justify-center bg-blue-600 text-white text-caption-responsive font-bold px-2 py-0.5 rounded-[2px] tracking-wider">
                      {t('mega.badges.new')}
                    </span>
                    <span className="text-caption-responsive text-slate-500 font-bold ml-3">
                      {t('mega.promo.aiSolution')} —{' '}
                      <Link
                        href="/solutions"
                        onClick={() => setActiveMenu(null)}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {t('mega.cta.learnMore')}
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
                <div className="page-container grid grid-cols-[340px_1fr]">
                  {/* Left Column: Industries List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pr-8">
                    <div className="flex flex-col gap-1.5">
                      {industriesData.map((ind) => {
                        const isIndActive = activeIndustry === ind.id;
                        const indHref = getIndustryHref(ind);
                        return (
                          <Link
                            key={ind.id}
                            href={indHref}
                            onClick={() => setActiveMenu(null)}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              isIndActive
                                ? 'bg-blue-50/80 text-blue-600 font-bold shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                                : 'text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                            }`}
                            onMouseEnter={() => setActiveIndustry(ind.id)}
                          >
                            {isIndActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-body-regular leading-none">{t(ind.name)}</span>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                isIndActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Grid and Banner */}
                  <div className="flex flex-col bg-white pt-8 pb-8 pl-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-body-regular font-bold text-slate-800">
                          {currentIndustryData?.id === 'food'
                            ? t('mega.headings.industrySolutionsFood')
                            : t('mega.headings.industrySolutions', { name: currentIndustryData ? t(currentIndustryData.name) : '' })}
                        </span>
                        <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {currentIndustryData?.hubs.map((hub, idx) => {
                          const IconComp = IconMap[hub.icon] || Package;
                          const industryHref = getIndustryHref(currentIndustryData);
                          return (
                            <Link
                              key={idx}
                              href={industryHref}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-start gap-3.5 group p-3 -m-2 rounded-[6px] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50/40 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)]"
                            >
                              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${hub.bgColor} transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-sm`}>
                                <IconComp className="h-5.5 w-5.5" />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-body-regular font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                  {t(hub.title)}
                                </span>
                                <span className="mt-1 text-caption-responsive text-slate-400 leading-relaxed font-medium">
                                  {t(hub.description)}
                                </span>
                              </div>
                            </Link>
                          );
                        })}

                        {/* 9th Grid Item: View All Link */}
                        <div className="flex items-center">
                          <Link
                            href={getIndustryHref(currentIndustryData)}
                            onClick={() => setActiveMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-body-regular font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>{t('mega.cta.viewAllIndustry', { name: currentIndustryData ? t(currentIndustryData.name) : '' })}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: spans edge-to-edge */}
                <div className="border-t border-slate-100 bg-[#F8FAFC] w-full">
                  <div className="page-container flex items-center py-3.5">
                    <span className="inline-flex items-center justify-center bg-blue-600 text-white text-caption-responsive font-bold px-2 py-0.5 rounded-[2px] tracking-wider">
                      MỚI
                    </span>
                    <span className="text-caption-responsive text-slate-500 font-bold ml-3">
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
                <div className="page-container grid grid-cols-[340px_1fr]">
                  {/* Left Column: Resources List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pr-8">
                    <div className="flex flex-col gap-1.5">
                      {resourcesData.map((res) => {
                        const isResActive = activeResourceTab === res.id;
                        return (
                          <div
                            key={res.id}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              isResActive
                                ? 'bg-blue-50/80 text-blue-600 font-bold shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                                : 'text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                            }`}
                            onMouseEnter={() => setActiveResourceTab(res.id)}
                          >
                            {isResActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-body-regular leading-none">{t(res.name)}</span>
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
                  <div className="flex flex-col bg-white pt-8 pb-8 pl-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-body-regular font-bold text-slate-800">
                          {t('mega.headings.resourcesKnowledge')}
                        </span>
                        <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {currentResourceData?.hubs.map((hub, idx) => {
                          const IconComp = IconMap[hub.icon] || Package;
                          const resourceHref = currentResourceData?.id === 'events' ? '/resources/events' : '/resources';
                          return (
                            <Link
                              key={idx}
                              href={resourceHref}
                              onClick={() => setActiveMenu(null)}
                              className="flex items-start gap-3.5 group p-3 -m-2 rounded-[6px] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50/40 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)]"
                            >
                              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${hub.bgColor} transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-sm`}>
                                <IconComp className="h-5.5 w-5.5" />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-body-regular font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                  {t(hub.title)}
                                </span>
                                <span className="mt-1 text-caption-responsive text-slate-400 leading-relaxed font-medium">
                                  {t(hub.description)}
                                </span>
                              </div>
                            </Link>
                          );
                        })}

                        {/* 9th Grid Item: View All Link */}
                        <div className="flex items-center">
                          <Link
                            href={currentResourceData?.id === 'events' ? '/resources/events' : '/resources'}
                            onClick={() => setActiveMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-body-regular font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>
                              {t('mega.cta.viewAllResources', {
                                name: currentResourceData ? t(currentResourceData.name) : t('resources')
                              })}
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
                  <div className="page-container flex items-center py-3.5">
                    <span className="inline-flex items-center justify-center bg-blue-600 text-white text-caption-responsive font-bold px-2 py-0.5 rounded-[2px] tracking-wider">
                      {t('mega.badges.new')}
                    </span>
                    <span className="text-caption-responsive text-slate-500 font-bold ml-3">
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
                <div className="page-container grid grid-cols-[340px_1fr]">
                  {/* Left Column: About Categories List */}
                  <div className="border-r border-slate-100 bg-white pt-8 pb-8 pr-8">
                    <div className="flex flex-col gap-1.5">
                      {aboutData.map((ab) => {
                        const isAbActive = activeAboutTab === ab.id;
                        return (
                          <div
                            key={ab.id}
                            className={`relative flex items-center justify-between pl-8 pr-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              isAbActive
                                ? 'bg-blue-50/80 text-blue-600 font-bold shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                                : 'text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-[0_0_0_1px_#1769E2,0_4px_15px_-3px_rgba(23,105,226,0.15)]'
                            }`}
                            onMouseEnter={() => setActiveAboutTab(ab.id)}
                          >
                            {isAbActive && (
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue-600 rounded-full" />
                            )}
                            <span className="text-body-regular leading-none">{t(ab.name)}</span>
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
                  <div className="flex flex-col bg-white pt-8 pb-8 pl-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-body-regular font-bold text-slate-800">
                          {activeAboutTab === 'hub-prod'
                            ? t('mega.headings.aboutHubProd')
                            : currentAboutData ? t(currentAboutData.name) : ''}
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
                              className="flex items-start gap-3.5 group p-3 -m-2 rounded-[6px] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50/40 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)]"
                            >
                              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${hub.bgColor} transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-sm`}>
                                <IconComp className="h-5.5 w-5.5" />
                              </div>

                              <div className="flex flex-col">
                                <span className="text-body-regular font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                  {t(hub.title)}
                                </span>
                                <span className="mt-1 text-caption-responsive text-slate-400 leading-relaxed font-medium">
                                  {t(hub.description)}
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
                            className="group inline-flex items-center gap-1.5 text-body-regular font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>{t('mega.cta.aboutMore')}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: spans edge-to-edge */}
                <div className="border-t border-slate-100 bg-[#F8FAFC] w-full">
                  <div className="page-container flex items-center py-3.5">
                    <span className="inline-flex items-center justify-center bg-blue-600 text-white text-caption-responsive font-bold px-2 py-0.5 rounded-[2px] tracking-wider">
                      {t('mega.badges.new')}
                    </span>
                    <span className="text-caption-responsive text-slate-500 font-bold ml-3">
                      {t('mega.promo.hiringBd')} —{' '}
                      <Link
                        href="/about"
                        onClick={() => setActiveMenu(null)}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {t('mega.cta.applyNow')}
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
