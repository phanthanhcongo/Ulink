/**
 * Seed V2 — Regional Hubs
 *
 * 3 HUB vùng miền, tên Hub khớp với Figma/UI:
 *   - HUB Hà Nam   (Miền Bắc)
 *   - HUB Đà Nẵng  (Miền Trung)
 *   - HUB Miền Nam  (Miền Nam)
 */

export const regionalHubs = [
  // ═══════════════════════════════════════════════
  // MIỀN BẮC — HUB Hà Nam
  // ═══════════════════════════════════════════════
  {
    slug: 'hub-mien-bac',
    hub_code: 'HUB-MB-001',
    name: 'HUB Hà Nam',
    region: 'north',
    provinceCode: 'vn-ha-noi',
    detail_address: 'KCN Đồng Văn IV, huyện Duy Tiên, tỉnh Hà Nam',
    operating_status: 'active',
    coordinates: '20.5500,105.9200',
    warehouse_total_area: 15000,
    warehouse_utilized_area: 8500,
    warehouse_available_area: 6500,
    warehouse_storage_tons: 2000,
    warehouse_pallets: 3500,
    standard_delivery_time: '12-24 giờ',
    sla_details: {
      'Hà Nội': '4-6h',
      'Bắc Ninh / Bắc Giang': '6-8h',
      'Hải Phòng / Hải Dương': '8-12h',
      'Hưng Yên / Hà Nam': '4-6h',
      'Ninh Bình / Nam Định': '8-12h',
      'Quảng Ninh': '12-24h',
      'Phú Thọ / Vĩnh Phúc': '12-18h',
      'Thái Nguyên': '12-18h'
    },
    on_time_rate: 98.5,
    on_time_rate_delta: '+1.2%',
    orders_today: 0,
    order_capacity_per_day: 5000,
    avg_delivery_time: '10 giờ',
    avg_delivery_distance: 65.0,
    person_in_charge_name: 'Trần Thị Mai',
    person_in_charge_title: 'Giám đốc vùng Miền Bắc',
    person_in_charge_phone: '0987654321',
    current_personnel_count: 85,
    status: 'published',

    translations: {
      vi: { name: 'HUB Hà Nam' },
      en: { name: 'Ha Nam Hub' },
      ja: { name: 'ハナムハブ' }
    }
  },

  // ═══════════════════════════════════════════════
  // MIỀN TRUNG — HUB Đà Nẵng
  // ═══════════════════════════════════════════════
  {
    slug: 'hub-mien-trung',
    hub_code: 'HUB-MT-001',
    name: 'HUB Đà Nẵng',
    region: 'central',
    provinceCode: 'vn-da-nang',
    provinceAbbr: 'DNG',
    detail_address: 'KCN Hòa Khánh, quận Liên Chiểu, TP. Đà Nẵng',
    operating_status: 'active',
    coordinates: '16.0544,108.2022',
    warehouse_total_area: 5000,
    warehouse_utilized_area: 2800,
    warehouse_available_area: 2200,
    warehouse_storage_tons: 600,
    warehouse_pallets: 1200,
    standard_delivery_time: '24-48 giờ',
    sla_details: {
      'Đà Nẵng': '4-6h',
      'Thừa Thiên Huế': '8-12h',
      'Quảng Nam': '8-12h',
      'Quảng Ngãi': '12-18h',
      'Bình Định': '18-24h',
      'Thanh Hóa / Nghệ An': '24-36h',
      'Khánh Hòa': '18-24h'
    },
    on_time_rate: 96.8,
    on_time_rate_delta: '+0.8%',
    orders_today: 0,
    order_capacity_per_day: 1500,
    avg_delivery_time: '18 giờ',
    avg_delivery_distance: 120.0,
    person_in_charge_name: 'Nguyễn Hoàng Sơn',
    person_in_charge_title: 'Giám đốc vùng Miền Trung',
    person_in_charge_phone: '0912345678',
    current_personnel_count: 30,
    status: 'published',

    translations: {
      vi: { name: 'HUB Đà Nẵng' },
      en: { name: 'Da Nang Hub' },
      ja: { name: 'ダナンハブ' }
    }
  },

  // ═══════════════════════════════════════════════
  // MIỀN NAM — HUB Miền Nam
  // ═══════════════════════════════════════════════
  {
    slug: 'hub-mien-nam',
    hub_code: 'HUB-MN-001',
    name: 'HUB Miền Nam',
    region: 'south',
    provinceCode: 'vn-ho-chi-minh',
    provinceAbbr: 'HCM',
    detail_address: 'KCN VSIP II-A, TX. Tân Uyên, tỉnh Bình Dương',
    operating_status: 'active',
    coordinates: '10.9600,106.6600',
    warehouse_total_area: 12000,
    warehouse_utilized_area: 7200,
    warehouse_available_area: 4800,
    warehouse_storage_tons: 1800,
    warehouse_pallets: 3000,
    standard_delivery_time: '12-24 giờ',
    sla_details: {
      'TP.HCM': '4-6h',
      'Bình Dương': '4-6h',
      'Đồng Nai': '6-8h',
      'Long An': '8-12h',
      'Bà Rịa - Vũng Tàu': '8-12h',
      'Tây Ninh': '12-18h',
      'Cần Thơ / ĐBSCL': '18-24h'
    },
    on_time_rate: 98.2,
    on_time_rate_delta: '+1.0%',
    orders_today: 0,
    order_capacity_per_day: 4000,
    avg_delivery_time: '12 giờ',
    avg_delivery_distance: 55.0,
    person_in_charge_name: 'Lê Văn Tùng',
    person_in_charge_title: 'Giám đốc vùng Miền Nam',
    person_in_charge_phone: '0934567890',
    current_personnel_count: 65,
    status: 'published',

    translations: {
      vi: { name: 'HUB Miền Nam' },
      en: { name: 'Southern Hub' },
      ja: { name: '南部ハブ' }
    }
  }
];
