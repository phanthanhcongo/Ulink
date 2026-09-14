/**
 * Seed V2 — Product Attributes & Options
 *
 * Thuộc tính lọc sản phẩm theo V1 (Kích cỡ, Màu sắc).
 */

export const productAttributes = [
  // ── Kích cỡ ──
  {
    name: 'Kích cỡ',
    slug: 'size',
    type: 'select',
    translations: {
      vi: { name: 'Kích cỡ' },
      en: { name: 'Size' },
      ja: { name: 'サイズ' }
    },
    options: [
      { value: 'S', label: 'S', translations: { en: 'S', ja: 'S' } },
      { value: 'M', label: 'M', translations: { en: 'M', ja: 'M' } },
      { value: 'L', label: 'L', translations: { en: 'L', ja: 'L' } },
      { value: 'XL', label: 'XL', translations: { en: 'XL', ja: 'XL' } }
    ]
  },

  // ── Màu sắc ──
  {
    name: 'Màu sắc',
    slug: 'color',
    type: 'select',
    translations: {
      vi: { name: 'Màu sắc' },
      en: { name: 'Color' },
      ja: { name: '色' }
    },
    options: [
      { value: 'blue', label: 'Xanh dương', translations: { en: 'Blue', ja: '青' } },
      { value: 'white', label: 'Trắng', translations: { en: 'White', ja: '白' } },
      { value: 'green', label: 'Xanh lá', translations: { en: 'Green', ja: '緑' } },
      { value: 'pink', label: 'Hồng', translations: { en: 'Pink', ja: 'ピンク' } }
    ]
  },

  // ── Trọng lượng cuộn ──
  {
    name: 'Trọng lượng cuộn',
    slug: 'roll-weight',
    type: 'select',
    translations: {
      vi: { name: 'Trọng lượng cuộn' },
      en: { name: 'Roll Weight' },
      ja: { name: 'ロール重量' }
    },
    options: [
      { value: '2.4kg', label: '2.4 kg', translations: { en: '2.4 kg', ja: '2.4 kg' } },
      { value: '3.0kg', label: '3.0 kg', translations: { en: '3.0 kg', ja: '3.0 kg' } },
      { value: '4.0kg', label: '4.0 kg', translations: { en: '4.0 kg', ja: '4.0 kg' } }
    ]
  }
];
