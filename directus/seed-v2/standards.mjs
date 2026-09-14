/**
 * Seed V2 — Standards (Tiêu chuẩn chất lượng)
 *
 * Tiêu chuẩn ISO, UL, ASTM... áp dụng cho sản phẩm.
 */

export const standards = [
  // ── Tiêu chuẩn chung ──
  {
    name: 'ISO 9001:2015',
    slug: 'iso-9001',
    status: 'published',
    description: 'Hệ thống quản lý chất lượng',
    translations: {
      vi: { name: 'ISO 9001:2015' },
      en: { name: 'ISO 9001:2015 — Quality Management System' },
      ja: { name: 'ISO 9001:2015 — 品質マネジメントシステム' }
    }
  },

  // ── Băng keo ──
  {
    name: 'UL 723',
    slug: 'ul-723',
    status: 'published',
    description: 'Tiêu chuẩn chống cháy lan bề mặt (Surface Burning Characteristics)',
    translations: {
      vi: { name: 'UL 723 — Chống cháy lan' },
      en: { name: 'UL 723 — Surface Burning Characteristics' },
      ja: { name: 'UL 723 — 表面燃焼特性' }
    }
  },
  {
    name: 'ASTM D3359',
    slug: 'astm-d3359',
    status: 'published',
    description: 'Tiêu chuẩn đo độ bám dính (Adhesion by Tape Test)',
    translations: {
      vi: { name: 'ASTM D3359 — Độ bám dính' },
      en: { name: 'ASTM D3359 — Adhesion by Tape Test' },
      ja: { name: 'ASTM D3359 — テープ試験による付着性' }
    }
  },

  // ── Bao bì & Thực phẩm ──
  {
    name: 'ISO 22000',
    slug: 'iso-22000',
    status: 'published',
    description: 'Hệ thống quản lý an toàn thực phẩm',
    translations: {
      vi: { name: 'ISO 22000 — An toàn thực phẩm' },
      en: { name: 'ISO 22000 — Food Safety Management' },
      ja: { name: 'ISO 22000 — 食品安全マネジメント' }
    }
  },
  {
    name: 'ISTA 3A',
    slug: 'ista-3a',
    status: 'published',
    description: 'Tiêu chuẩn thử nghiệm bao bì vận chuyển',
    translations: {
      vi: { name: 'ISTA 3A — Bao bì vận chuyển' },
      en: { name: 'ISTA 3A — Transport Packaging Testing' },
      ja: { name: 'ISTA 3A — 輸送包装試験' }
    }
  },
  {
    name: 'RoHS',
    slug: 'rohs',
    status: 'published',
    description: 'Chỉ thị hạn chế chất nguy hại (Restriction of Hazardous Substances)',
    translations: {
      vi: { name: 'RoHS — Hạn chế chất nguy hại' },
      en: { name: 'RoHS — Restriction of Hazardous Substances' },
      ja: { name: 'RoHS — 有害物質使用制限' }
    }
  },

  // ── Phòng sạch ──
  {
    name: 'ISO 14644-1',
    slug: 'iso-14644-1',
    status: 'published',
    description: 'Phân loại độ sạch không khí phòng sạch',
    translations: {
      vi: { name: 'ISO 14644-1 — Phân loại phòng sạch' },
      en: { name: 'ISO 14644-1 — Cleanroom Classification' },
      ja: { name: 'ISO 14644-1 — クリーンルーム分類' }
    }
  },
  {
    name: 'IEC 61340-5-1',
    slug: 'iec-61340-5-1',
    status: 'published',
    description: 'Bảo vệ linh kiện điện tử khỏi tĩnh điện (ESD)',
    translations: {
      vi: { name: 'IEC 61340-5-1 — Chống tĩnh điện ESD' },
      en: { name: 'IEC 61340-5-1 — ESD Protection' },
      ja: { name: 'IEC 61340-5-1 — ESD保護' }
    }
  },
  {
    name: 'EN ISO 374',
    slug: 'en-iso-374',
    status: 'published',
    description: 'Găng tay bảo vệ chống hóa chất và vi sinh vật',
    translations: {
      vi: { name: 'EN ISO 374 — Găng tay bảo hộ' },
      en: { name: 'EN ISO 374 — Protective Gloves against Chemicals' },
      ja: { name: 'EN ISO 374 — 化学物質用保護手袋' }
    }
  }
];
