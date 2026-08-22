/**
 * Đường dẫn tài nguyên TĨNH tập trung một nơi (tránh rải chuỗi path khắp code).
 * Xem quy ước tại public/images/README.md. Ảnh nội dung (sản phẩm, hub…) đến từ Directus.
 */
export const ASSETS = {
  logo: {
    full: '/images/logo/Main Logo-01.png',
    mark: '/images/logo/ulink-mark.svg',
    white: '/images/logo/Main Logo-01.png',
    main: '/images/logo/Main Logo-01.png'
  },
  banners: {
    /** Ảnh nền trang đăng nhập — KHÔNG kèm chữ. */
    loginHero: '/images/banners/login-hero.webp'
  },
  /** Ảnh trang chủ — chỉ giữ lại những ảnh đang được sử dụng. */
  home: {
    /** Section 1: Hero & Feature Bar */
    hero: '/images/home/section1/HomeBanner.webp',
    heroMobile: '/images/home/section1/HomeBanner-mobile.png',
    iconNation: '/images/home/section1/nation.webp',
    iconAdapter: '/images/home/section1/adapter.webp',
    iconFile: '/images/home/section1/file.webp',
    iconSecurity: '/images/home/section1/security.webp',
    iconSend: '/images/home/section1/send.webp',
    /** Section 2: Product Categories & Solutions */
    solutionCleanroom: '/images/home/section2/solution-cleanroom.webp',
    solutionPackaging: '/images/home/section2/solution-packaging.webp',
    productCutGloves: '/images/home/section2/product-cut-gloves.webp',
    productHvacTape: '/images/home/section2/product-hvac-tape.webp',
    productCustomPkg: '/images/home/section2/product-custom-pkg.webp',
    cateCleanroom: '/images/home/section2/cate_01.png',
    catePackaging: '/images/home/section2/cate_02.png',
    cateCutProtection: '/images/home/section2/cate_03.png',
    cateHvacTape: '/images/home/section2/cate_04.png',
    cateCustomPackaging: '/images/home/section2/cate_05.png',
    /** Section 3: Industry Solutions */
    indElectronics: '/images/home/section3/chip.webp',
    indFood: '/images/home/section3/Icon_Thực phẩm.webp',
    indLogistics: '/images/home/section3/iocn_logistics 2 [Vectorized].webp',
    indPharma: '/images/home/section3/iocn_Pharmacity 1 [Vectorized].webp',
    indFurniture: '/images/home/section3/funiture.webp',
    indConstruction: '/images/home/section3/iocn_Xây dựng 1 [Vectorized].webp',
    /** Section 4: Về chúng tôi (About Us) */
    companyFactory: '/images/home/section4/companyu.webp',
    iconSlack: '/images/home/section4/slack.webp',
    iconShield: '/images/home/section4/shield.webp',
    iconTag: '/images/home/section4/tag.webp',
    iconTruck: '/images/home/section4/truck.webp',
    /** Section 5: Đối tác tiêu biểu & Chứng nhận ISO */
    partnerSamsung: '/images/home/section5/Samsung-Logo-Blue.webp',
    partnerCanon: '/images/home/section5/logo canon.webp',
    partnerPanasonic: '/images/home/section5/panasonic-logo-.webp',
    partnerIbm: '/images/home/section5/logo-ibm-vector-06.webp',
    partnerTraphaco: '/images/home/section5/9383_Traphaco.webp',
    partnerCocaCola: '/images/home/section5/coca-cola-logo.webp',
    partnerVinfast: '/images/home/section5/logo-vinfast-vector-thumbnail.webp',
    partnerLg: '/images/home/section5/logo-lg-vector-inkythuatso-01-30-13-53-58.webp',
    partnerAmkor: '/images/home/section5/Amkor.webp',
    partnerVinamilk: '/images/home/section5/logo-vinamilk-vector-01.webp',
    partner3m: '/images/home/section5/3m-logo-png_seeklogo-806.webp',
    partnerByd: '/images/home/section5/BYD.webp',
    /** Chứng nhận ISO & Tiêu chuẩn */
    certIso9001: '/images/home/section5/mc-iso-9001-2015.webp',
    certSgs: '/images/home/section5/sgs.webp',
    certRohs: '/images/home/section5/RoHS-Logo.webp',
    certMsds: '/images/home/section5/mdsss.webp',
    /** Placeholder */
    factory: '/images/banners/login-hero.webp',
    /** Case Studies banners & Avatars */
    case1Banner: '/images/home/section7/image (5).png',
    case2Banner: '/images/home/section7/image (6).png',
    case3Banner: '/images/home/section7/image (7).png',
    case4Banner: '/images/home/section7/image (8).png',
    avatar1: '/images/home/section5/image (1).png',
    avatar2: '/images/home/section5/image (2).png',
    avatar3: '/images/home/section5/image (3).png',
    avatar4: '/images/home/section5/image (4).png',
    /** News section images */
    news1: '/images/home/news/image (9).png',
    news2: '/images/home/news/image (10).png',
    news3: '/images/home/news/image (11).png',
    news4: '/images/home/news/image (12).png',
    news5: '/images/home/news/image (13).png',
    news6: '/images/home/news/image (14).png',
    /** Resource section images (Document icons) */
    docIcon1: '/images/home/resource/icon_1.png',
    docIcon2: '/images/home/resource/icon_2.png',
    docIcon3: '/images/home/resource/icon_3.png',
    docIcon4: '/images/home/resource/icon_4.png'
  },
  /** Footer assets */
  footer: {
    boCongThuong: '/images/home/section6/Logo - Đã Thông Báo.webp',
    qrCode: '/images/footer/qr-code.svg',
    facebook: '/images/home/section6/fb.webp',
    linkedin: '/images/home/section6/linked.webp',
    tiktok: '/images/home/section6/tik.webp',
    youtube: '/images/home/section6/youtube.webp'
  },
  /** Logo đối tác (SVG) */
  partners: {
    samsung: '/images/partners/samsung.svg',
    lg: '/images/partners/lg.svg',
    canon: '/images/partners/canon.svg',
    mider: '/images/partners/mider.svg',
    fujifilm: '/images/partners/fujifilm.svg',
    mkor: '/images/partners/mkor.svg'
  },
  /** Illustrations */
  illustrations: {
    vietnamMap: '/images/illustrations/vietnam-map.svg'
  },
  /** Ảnh trang Về chúng tôi — Trung tâm phân phối Hà Nam */
  about: {
    heroWarehouse: '/images/about/hero-warehouse.webp',
    locationAerial: '/images/about/location-aerial.webp',
    opWarehouse: '/images/about/op-warehouse.webp',
    opWms: '/images/about/op-wms.webp',
    opTruck: '/images/about/op-truck.webp',
    opTeam: '/images/about/op-team.webp',
    iso9001: '/images/about/iso-9001.webp',
    iso14001: '/images/about/iso-14001.webp',
    iso45001: '/images/about/iso-45001.webp',
    isoEsd: '/images/about/iso-esd.webp',
    iso13485: '/images/about/iso-13485.webp',
    qualityHeroBg: '/images/about/quality-hero-bg.webp',
    qualityLab: '/images/about/quality-lab.webp'
  },
  og: {
    default: '/og/og-default.png'
  }
} as const;
