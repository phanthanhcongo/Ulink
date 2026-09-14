/**
 * Seed V2 — Inventory Stock & Movements
 *
 * Tồn kho ban đầu cho 31 SKU × 3 Hub.
 * HUB Hà Nam (Bắc) có tồn kho lớn nhất, HUB Đà Nẵng (Trung) ít nhất.
 * 
 * Mỗi record: skuCode + hubSlug → resolve FK khi seed.
 * movement_type: 'inbound' | 'outbound' | 'adjustment' | 'transfer'
 */

// ═══════════════════════════════════════════════════════════════
// INVENTORY STOCK — Snapshot tồn kho hiện tại
// ═══════════════════════════════════════════════════════════════

export const inventoryStock = [
  // ── BĂNG KEO NHÔM (16 SKU × 3 Hub = 48 records) ──

  // HUB Miền Bắc (tồn kho lớn — kho chính)
  { skuCode: 'BKN-HVAC48-001',     hubSlug: 'hub-mien-bac', quantity: 5000,  min_quantity: 500,   max_quantity: 10000 },
  { skuCode: 'BKN-CN72-001',       hubSlug: 'hub-mien-bac', quantity: 2500,  min_quantity: 300,   max_quantity: 5000  },
  { skuCode: 'BKN-STT-001',        hubSlug: 'hub-mien-bac', quantity: 1800,  min_quantity: 200,   max_quantity: 4000  },
  { skuCode: 'BKN-BO96-001',       hubSlug: 'hub-mien-bac', quantity: 1200,  min_quantity: 150,   max_quantity: 3000  },
  { skuCode: 'BKN-3M425-001',      hubSlug: 'hub-mien-bac', quantity: 4000,  min_quantity: 400,   max_quantity: 8000  },
  { skuCode: 'BKN-NITTO950-001',   hubSlug: 'hub-mien-bac', quantity: 3500,  min_quantity: 350,   max_quantity: 7000  },
  { skuCode: 'BKN-DUCT-001',       hubSlug: 'hub-mien-bac', quantity: 8000,  min_quantity: 800,   max_quantity: 15000 },
  { skuCode: 'BKN-CACHN-001',      hubSlug: 'hub-mien-bac', quantity: 4500,  min_quantity: 500,   max_quantity: 9000  },
  { skuCode: 'BKN-CHAY-001',       hubSlug: 'hub-mien-bac', quantity: 3000,  min_quantity: 300,   max_quantity: 6000  },
  { skuCode: 'BKN-MAKEM-001',      hubSlug: 'hub-mien-bac', quantity: 4000,  min_quantity: 400,   max_quantity: 8000  },
  { skuCode: 'BKN-TUDINH-001',     hubSlug: 'hub-mien-bac', quantity: 6000,  min_quantity: 600,   max_quantity: 12000 },
  { skuCode: 'BKN-CN-001',         hubSlug: 'hub-mien-bac', quantity: 10000, min_quantity: 1000,  max_quantity: 20000 },
  { skuCode: 'BKN-HVAC-KG',        hubSlug: 'hub-mien-bac', quantity: 2000,  min_quantity: 200,   max_quantity: 5000  },
  { skuCode: 'BKN-VAR-KG',         hubSlug: 'hub-mien-bac', quantity: 1500,  min_quantity: 200,   max_quantity: 4000  },
  { skuCode: 'BD-SX-KG',           hubSlug: 'hub-mien-bac', quantity: 1800,  min_quantity: 200,   max_quantity: 4000  },
  { skuCode: 'MQP-DK-KG',          hubSlug: 'hub-mien-bac', quantity: 2500,  min_quantity: 300,   max_quantity: 5000  },

  // HUB Miền Trung (tồn kho vừa — kho trung chuyển)
  { skuCode: 'BKN-HVAC48-001',     hubSlug: 'hub-mien-trung', quantity: 1200, min_quantity: 150,  max_quantity: 3000  },
  { skuCode: 'BKN-CN72-001',       hubSlug: 'hub-mien-trung', quantity: 600,  min_quantity: 100,  max_quantity: 1500  },
  { skuCode: 'BKN-STT-001',        hubSlug: 'hub-mien-trung', quantity: 400,  min_quantity: 50,   max_quantity: 1000  },
  { skuCode: 'BKN-BO96-001',       hubSlug: 'hub-mien-trung', quantity: 300,  min_quantity: 50,   max_quantity: 800   },
  { skuCode: 'BKN-3M425-001',      hubSlug: 'hub-mien-trung', quantity: 1000, min_quantity: 100,  max_quantity: 2500  },
  { skuCode: 'BKN-NITTO950-001',   hubSlug: 'hub-mien-trung', quantity: 800,  min_quantity: 100,  max_quantity: 2000  },
  { skuCode: 'BKN-DUCT-001',       hubSlug: 'hub-mien-trung', quantity: 2000, min_quantity: 200,  max_quantity: 4000  },
  { skuCode: 'BKN-CACHN-001',      hubSlug: 'hub-mien-trung', quantity: 1000, min_quantity: 100,  max_quantity: 2500  },
  { skuCode: 'BKN-CHAY-001',       hubSlug: 'hub-mien-trung', quantity: 700,  min_quantity: 100,  max_quantity: 1500  },
  { skuCode: 'BKN-MAKEM-001',      hubSlug: 'hub-mien-trung', quantity: 900,  min_quantity: 100,  max_quantity: 2000  },
  { skuCode: 'BKN-TUDINH-001',     hubSlug: 'hub-mien-trung', quantity: 1500, min_quantity: 150,  max_quantity: 3000  },
  { skuCode: 'BKN-CN-001',         hubSlug: 'hub-mien-trung', quantity: 2500, min_quantity: 300,  max_quantity: 5000  },
  { skuCode: 'BKN-HVAC-KG',        hubSlug: 'hub-mien-trung', quantity: 500,  min_quantity: 50,   max_quantity: 1500  },
  { skuCode: 'BKN-VAR-KG',         hubSlug: 'hub-mien-trung', quantity: 400,  min_quantity: 50,   max_quantity: 1000  },
  { skuCode: 'BD-SX-KG',           hubSlug: 'hub-mien-trung', quantity: 500,  min_quantity: 50,   max_quantity: 1000  },
  { skuCode: 'MQP-DK-KG',          hubSlug: 'hub-mien-trung', quantity: 600,  min_quantity: 100,  max_quantity: 1500  },

  // HUB Miền Nam (tồn kho lớn — kho thứ hai)
  { skuCode: 'BKN-HVAC48-001',     hubSlug: 'hub-mien-nam', quantity: 3500,  min_quantity: 350,   max_quantity: 7000  },
  { skuCode: 'BKN-CN72-001',       hubSlug: 'hub-mien-nam', quantity: 1800,  min_quantity: 200,   max_quantity: 3500  },
  { skuCode: 'BKN-STT-001',        hubSlug: 'hub-mien-nam', quantity: 1200,  min_quantity: 150,   max_quantity: 2500  },
  { skuCode: 'BKN-BO96-001',       hubSlug: 'hub-mien-nam', quantity: 800,   min_quantity: 100,   max_quantity: 2000  },
  { skuCode: 'BKN-3M425-001',      hubSlug: 'hub-mien-nam', quantity: 2800,  min_quantity: 300,   max_quantity: 5500  },
  { skuCode: 'BKN-NITTO950-001',   hubSlug: 'hub-mien-nam', quantity: 2400,  min_quantity: 250,   max_quantity: 5000  },
  { skuCode: 'BKN-DUCT-001',       hubSlug: 'hub-mien-nam', quantity: 5500,  min_quantity: 500,   max_quantity: 10000 },
  { skuCode: 'BKN-CACHN-001',      hubSlug: 'hub-mien-nam', quantity: 3200,  min_quantity: 300,   max_quantity: 6000  },
  { skuCode: 'BKN-CHAY-001',       hubSlug: 'hub-mien-nam', quantity: 2000,  min_quantity: 200,   max_quantity: 4000  },
  { skuCode: 'BKN-MAKEM-001',      hubSlug: 'hub-mien-nam', quantity: 2800,  min_quantity: 300,   max_quantity: 5500  },
  { skuCode: 'BKN-TUDINH-001',     hubSlug: 'hub-mien-nam', quantity: 4200,  min_quantity: 400,   max_quantity: 8000  },
  { skuCode: 'BKN-CN-001',         hubSlug: 'hub-mien-nam', quantity: 7000,  min_quantity: 700,   max_quantity: 14000 },
  { skuCode: 'BKN-HVAC-KG',        hubSlug: 'hub-mien-nam', quantity: 1400,  min_quantity: 150,   max_quantity: 3000  },
  { skuCode: 'BKN-VAR-KG',         hubSlug: 'hub-mien-nam', quantity: 1000,  min_quantity: 100,   max_quantity: 2500  },
  { skuCode: 'BD-SX-KG',           hubSlug: 'hub-mien-nam', quantity: 1200,  min_quantity: 150,   max_quantity: 3000  },
  { skuCode: 'MQP-DK-KG',          hubSlug: 'hub-mien-nam', quantity: 1800,  min_quantity: 200,   max_quantity: 3500  },

  // ── BAO BÌ & ĐÓNG GÓI (11 SKU × 3 Hub = 33 records) ──

  // HUB Miền Bắc
  { skuCode: 'BB-MQP-KG',          hubSlug: 'hub-mien-bac', quantity: 3000,  min_quantity: 300,   max_quantity: 6000  },
  { skuCode: 'BB-CT5L-001',        hubSlug: 'hub-mien-bac', quantity: 8000,  min_quantity: 1000,  max_quantity: 15000 },
  { skuCode: 'BB-OPP-001',         hubSlug: 'hub-mien-bac', quantity: 6000,  min_quantity: 500,   max_quantity: 12000 },
  { skuCode: 'BB-TPECN-KG',        hubSlug: 'hub-mien-bac', quantity: 2000,  min_quantity: 200,   max_quantity: 5000  },
  { skuCode: 'BB-PALLET-001',      hubSlug: 'hub-mien-bac', quantity: 500,   min_quantity: 50,    max_quantity: 1000  },
  { skuCode: 'BB-DAIPP-001',       hubSlug: 'hub-mien-bac', quantity: 4000,  min_quantity: 400,   max_quantity: 8000  },
  { skuCode: 'BB-POF-KG',          hubSlug: 'hub-mien-bac', quantity: 1500,  min_quantity: 150,   max_quantity: 3000  },
  { skuCode: 'BB-GCA-KG',          hubSlug: 'hub-mien-bac', quantity: 1000,  min_quantity: 100,   max_quantity: 2500  },
  { skuCode: 'BB-PESF-KG',         hubSlug: 'hub-mien-bac', quantity: 2500,  min_quantity: 250,   max_quantity: 5000  },
  { skuCode: 'BB-TPEKT-KG',        hubSlug: 'hub-mien-bac', quantity: 2000,  min_quantity: 200,   max_quantity: 4000  },
  { skuCode: 'BB-ZIPKT-KG',        hubSlug: 'hub-mien-bac', quantity: 1800,  min_quantity: 200,   max_quantity: 3500  },

  // HUB Miền Trung
  { skuCode: 'BB-MQP-KG',          hubSlug: 'hub-mien-trung', quantity: 800,  min_quantity: 100,  max_quantity: 2000  },
  { skuCode: 'BB-CT5L-001',        hubSlug: 'hub-mien-trung', quantity: 2000, min_quantity: 200,  max_quantity: 4000  },
  { skuCode: 'BB-OPP-001',         hubSlug: 'hub-mien-trung', quantity: 1500, min_quantity: 150,  max_quantity: 3000  },
  { skuCode: 'BB-TPECN-KG',        hubSlug: 'hub-mien-trung', quantity: 500,  min_quantity: 50,   max_quantity: 1200  },
  { skuCode: 'BB-PALLET-001',      hubSlug: 'hub-mien-trung', quantity: 120,  min_quantity: 20,   max_quantity: 300   },
  { skuCode: 'BB-DAIPP-001',       hubSlug: 'hub-mien-trung', quantity: 1000, min_quantity: 100,  max_quantity: 2000  },
  { skuCode: 'BB-POF-KG',          hubSlug: 'hub-mien-trung', quantity: 400,  min_quantity: 50,   max_quantity: 1000  },
  { skuCode: 'BB-GCA-KG',          hubSlug: 'hub-mien-trung', quantity: 300,  min_quantity: 30,   max_quantity: 800   },
  { skuCode: 'BB-PESF-KG',         hubSlug: 'hub-mien-trung', quantity: 600,  min_quantity: 80,   max_quantity: 1500  },
  { skuCode: 'BB-TPEKT-KG',        hubSlug: 'hub-mien-trung', quantity: 500,  min_quantity: 50,   max_quantity: 1200  },
  { skuCode: 'BB-ZIPKT-KG',        hubSlug: 'hub-mien-trung', quantity: 400,  min_quantity: 50,   max_quantity: 1000  },

  // HUB Miền Nam
  { skuCode: 'BB-MQP-KG',          hubSlug: 'hub-mien-nam', quantity: 2200,  min_quantity: 200,   max_quantity: 4500  },
  { skuCode: 'BB-CT5L-001',        hubSlug: 'hub-mien-nam', quantity: 5500,  min_quantity: 600,   max_quantity: 10000 },
  { skuCode: 'BB-OPP-001',         hubSlug: 'hub-mien-nam', quantity: 4200,  min_quantity: 400,   max_quantity: 8000  },
  { skuCode: 'BB-TPECN-KG',        hubSlug: 'hub-mien-nam', quantity: 1400,  min_quantity: 150,   max_quantity: 3000  },
  { skuCode: 'BB-PALLET-001',      hubSlug: 'hub-mien-nam', quantity: 350,   min_quantity: 40,    max_quantity: 700   },
  { skuCode: 'BB-DAIPP-001',       hubSlug: 'hub-mien-nam', quantity: 2800,  min_quantity: 300,   max_quantity: 5500  },
  { skuCode: 'BB-POF-KG',          hubSlug: 'hub-mien-nam', quantity: 1000,  min_quantity: 100,   max_quantity: 2200  },
  { skuCode: 'BB-GCA-KG',          hubSlug: 'hub-mien-nam', quantity: 700,   min_quantity: 80,    max_quantity: 1800  },
  { skuCode: 'BB-PESF-KG',         hubSlug: 'hub-mien-nam', quantity: 1800,  min_quantity: 180,   max_quantity: 3500  },
  { skuCode: 'BB-TPEKT-KG',        hubSlug: 'hub-mien-nam', quantity: 1500,  min_quantity: 150,   max_quantity: 3000  },
  { skuCode: 'BB-ZIPKT-KG',        hubSlug: 'hub-mien-nam', quantity: 1200,  min_quantity: 120,   max_quantity: 2500  },

  // ── VẬT TƯ PHÒNG SẠCH (4 SKU × 3 Hub = 12 records) ──

  // HUB Miền Bắc
  { skuCode: 'PS-GTNCL1000-001',   hubSlug: 'hub-mien-bac', quantity: 80000,  min_quantity: 10000, max_quantity: 150000 },
  { skuCode: 'PS-GTNYT-001',       hubSlug: 'hub-mien-bac', quantity: 50000,  min_quantity: 5000,  max_quantity: 100000 },
  { skuCode: 'PS-THAMPS-001',      hubSlug: 'hub-mien-bac', quantity: 3000,   min_quantity: 300,   max_quantity: 6000   },
  { skuCode: 'PS-KLWIPER-001',     hubSlug: 'hub-mien-bac', quantity: 200,    min_quantity: 20,    max_quantity: 500    },

  // HUB Miền Trung
  { skuCode: 'PS-GTNCL1000-001',   hubSlug: 'hub-mien-trung', quantity: 20000, min_quantity: 3000,  max_quantity: 50000  },
  { skuCode: 'PS-GTNYT-001',       hubSlug: 'hub-mien-trung', quantity: 12000, min_quantity: 2000,  max_quantity: 30000  },
  { skuCode: 'PS-THAMPS-001',      hubSlug: 'hub-mien-trung', quantity: 800,   min_quantity: 100,   max_quantity: 2000   },
  { skuCode: 'PS-KLWIPER-001',     hubSlug: 'hub-mien-trung', quantity: 50,    min_quantity: 5,     max_quantity: 150    },

  // HUB Miền Nam
  { skuCode: 'PS-GTNCL1000-001',   hubSlug: 'hub-mien-nam', quantity: 60000,  min_quantity: 8000,  max_quantity: 120000 },
  { skuCode: 'PS-GTNYT-001',       hubSlug: 'hub-mien-nam', quantity: 35000,  min_quantity: 4000,  max_quantity: 70000  },
  { skuCode: 'PS-THAMPS-001',      hubSlug: 'hub-mien-nam', quantity: 2200,   min_quantity: 200,   max_quantity: 4500   },
  { skuCode: 'PS-KLWIPER-001',     hubSlug: 'hub-mien-nam', quantity: 150,    min_quantity: 15,    max_quantity: 400    }
];


// ═══════════════════════════════════════════════════════════════
// INVENTORY MOVEMENTS — Lịch sử nhập hàng ban đầu (inbound)
// Mỗi SKU × Hub có 1 movement "Nhập kho ban đầu" khớp với quantity ở trên.
// ═══════════════════════════════════════════════════════════════

/**
 * Auto-generate initial inbound movements from inventoryStock.
 * Gọi hàm này khi seed thay vì list thủ công.
 */
export function generateInitialMovements() {
  const now = new Date('2026-09-01T08:00:00+07:00');
  return inventoryStock.map((stock, idx) => ({
    skuCode: stock.skuCode,
    hubSlug: stock.hubSlug,
    movement_type: 'inbound',
    quantity: stock.quantity,
    reference: `INIT-${String(idx + 1).padStart(4, '0')}`,
    notes: 'Nhập kho ban đầu — seed data',
    date_created: new Date(now.getTime() + idx * 60000).toISOString() // stagger 1 min apart
  }));
}
