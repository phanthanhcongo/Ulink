import { readItems } from '@directus/sdk';
import { publicDirectus } from '@/lib/directus';
import { MOCK_RESOURCES, MOST_VIEWED_ARTICLES } from './mock-data';
import { ResourceItem } from './types';

function currentDateLabel() {
  return new Date().toLocaleDateString('en-GB');
}

function getDocumentDescription(doc: any) {
  const type = doc.doc_type;
  switch (type) {
    case 'tds':
      return {
        vi: `Tài liệu thông số kỹ thuật chi tiết (Technical Data Sheet) của sản phẩm ${doc.title || ''}, phục vụ kiểm thử chất lượng phòng sạch.`,
        en: `Detailed Technical Data Sheet (TDS) for ${doc.title || 'product'}, supporting cleanroom quality control and compliance.`,
        ja: `${doc.title || '製品'}の詳細な技術データシート（TDS）。クリーンルームの品質管理と準拠をサポートします。`
      };
    case 'msds':
      return {
        vi: `Bảng chỉ dẫn an toàn hóa chất (MSDS) cho sản phẩm ${doc.title || ''}, cung cấp hướng dẫn chi tiết về bảo quản và an toàn lao động.`,
        en: `Material Safety Data Sheet (MSDS) for ${doc.title || 'product'}, providing detailed guidelines for storage, handling, and workplace safety.`,
        ja: `${doc.title || '製品'}の安全データシート（MSDS）。保管、取り扱い、および職場安全に関する詳細なガイドラインを提供します。`
      };
    case 'brochure':
      return {
        vi: `Tài liệu giới thiệu (Brochure), catalog tính năng và hướng dẫn ứng dụng thực tiễn của dòng sản phẩm ${doc.title || ''}.`,
        en: `Product Brochure and catalog detailing features, applications, and general specifications for ${doc.title || 'product'}.`,
        ja: `${doc.title || '製品'}の機能、用途、および一般仕様を詳しく説明する製品パンフレット và カタログ。`
      };
    default:
      return {
        vi: `Tài liệu hướng dẫn kỹ thuật chi tiết và thông tin kiểm định chất lượng chính thức từ hệ thống ULink Industries.`,
        en: `Detailed technical reference guide and official quality assurance documentation from ULink Industries.`,
        ja: `ULink Industriesからの詳細な技術リファレンスガイドおよび公式の品質保証文書。`
      };
  }
}

function getIsoDescription(iso: any) {
  return {
    vi: `Chứng nhận tiêu chuẩn chất lượng quốc tế ${iso.name || ''} (Mã số: ${iso.number || 'N/A'}) chính thức áp dụng tại hệ thống kho vận ULink.`,
    en: `Official international quality standard certification ${iso.name || ''} (Cert No: ${iso.number || 'N/A'}) implemented across ULink facilities.`,
    ja: `ULink施設全体で実施されている公式の国際品質標準認証 ${iso.name || ''}（認証番号：${iso.number || 'N/A'}）。`
  };
}

function mapDocumentToResource(doc: any): ResourceItem {
  return {
    id: `doc-${doc.id}`,
    category: 'guide',
    badge: { vi: 'Cẩm nang kỹ thuật', en: 'Technical Guide', ja: '技術ガイド' },
    title: { vi: doc.title || '', en: doc.title || '', ja: doc.title || '' },
    description: getDocumentDescription(doc),
    date: currentDateLabel(),
    image: '/images/solutions/nitrile_gloves.png',
    contentType: 'tech-doc',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: '', en: '', ja: '' },
      avatar: ''
    },
    readTime: { vi: '', en: '', ja: '' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    isDirectDownloadOnly: true,
    fileId: doc.file
  };
}

function mapIsoToResource(iso: any): ResourceItem {
  return {
    id: `iso-${iso.id}`,
    category: 'standard',
    badge: { vi: 'Chứng chỉ chất lượng', en: 'Certificates', ja: '品質認証書' },
    title: { vi: iso.name || '', en: iso.name || '', ja: iso.name || '' },
    description: getIsoDescription(iso),
    date: currentDateLabel(),
    image: '/images/about/iso-9001.webp',
    contentType: 'certificate',
    author: {
      name: { vi: 'ULink', en: 'ULink', ja: 'ULink' },
      role: { vi: '', en: '', ja: '' },
      avatar: ''
    },
    readTime: { vi: '', en: '', ja: '' },
    sections: [],
    aiSummary: { intro: { vi: '', en: '', ja: '' }, bullets: [] },
    audioDuration: '0',
    audioSecs: 0,
    isDirectDownloadOnly: true,
    fileId: iso.file
  };
}

export async function loadResourceCatalog() {
  return [...MOCK_RESOURCES, ...MOST_VIEWED_ARTICLES];
}

export async function loadResourceBySlug(slug: string) {
  const catalog = await loadResourceCatalog();
  return catalog.find((item) => item.id.toLowerCase() === slug.toLowerCase());
}
