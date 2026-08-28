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
    hero: '/images/home/section1/homeBanner.svg',
    heroMobile: '/images/home/section1/HomeBanner-mobile.png',
    iconNation: '/images/home/section1/nation.webp',
    iconAdapter: '/images/home/section1/adapter.webp',
    iconFile: '/images/home/section1/file.webp',
    iconSecurity: '/images/home/section1/security.webp',
    iconSend: '/images/home/section1/send.webp',
    solutionCleanroom: '/images/home/section2/solution-cleanroom.svg',
    solutionPackaging: '/images/home/section2/solution-packaging.svg',
    productCutGloves: '/images/home/section2/product-cut-gloves.svg',
    productHvacTape: '/images/home/section2/product-hvac-tape.svg',
    productCustomPkg: '/images/home/section2/product-custom-pkg.svg',
    cateCleanroom: '/images/home/section2/cate_01.svg',
    catePackaging: '/images/home/section2/cate_02.svg',
    cateCutProtection: '/images/home/section2/cate_03.svg',
    cateHvacTape: '/images/home/section2/cate_04.svg',
    cateCustomPackaging: '/images/home/section2/cate_05.svg',
    /** Section 3: Industry Solutions */
    indElectronics: '/images/home/section3/chip.svg',
    indFood: '/images/home/section3/food_beverage.svg',
    indLogistics: '/images/home/section3/logistics.svg',
    indPharma: '/images/home/section3/pharma_medical.svg',
    indFurniture: '/images/home/section3/furniture_wood.svg',
    indConstruction: '/images/home/section3/construction_hvac.svg',
    /** Section 4: Về chúng tôi (About Us) */
    companyFactory: '/images/home/section4/companyu.webp',
    iconSlack: '/images/home/section4/slack.webp',
    iconShield: '/images/home/section4/shield.webp',
    iconTag: '/images/home/section4/tag.webp',
    iconTruck: '/images/home/section4/truck.webp',
    /** Section 5: Đối tác tiêu biểu & Chứng nhận ISO */
    partnerSamsung: '/images/partners-certifications/samsung.svg',
    partnerCanon: '/images/partners-certifications/canon.svg',
    partnerPanasonic: '/images/partners-certifications/panasonic.svg',
    partnerIbm: '/images/partners-certifications/ibm.svg',
    partnerTraphaco: '/images/partners-certifications/traphaco.svg',
    partnerCocaCola: '/images/partners-certifications/coca-cola.svg',
    partnerVinfast: '/images/partners-certifications/vinfast-seeklogo.svg',
    partnerLg: '/images/partners-certifications/logo-lg.svg',
    partnerAmkor: '/images/partners-certifications/Amkor_Technology_logo_(B).svg',
    partnerVinamilk: '/images/partners-certifications/vinamilk.svg',
    partner3m: '/images/partners-certifications/3M_wordmark.svg',
    partnerByd: '/images/partners-certifications/BYD Logo - Colored - zonalogo.com.svg',
    partnerRow1: '/images/partners-certifications/Partner_1.svg',
    partnerRow2: '/images/partners-certifications/partner_2.svg',
    /** Chứng nhận ISO & Tiêu chuẩn */
    certIso9001: '/images/partners-certifications/iso-9001-2015.svg',
    certSgs: '/images/partners-certifications/sgs.svg',
    certRohs: '/images/partners-certifications/rohs.svg',
    certMsds: '/images/partners-certifications/msds.svg',
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
    news4Eco: '/images/home/news/news4_eco.jpg',
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
  /** Logo đối tác (WebP) */
  partners: {
    samsung: '/images/partners-certifications/samsung.webp',
    lg: '/images/partners-certifications/lg.webp',
    canon: '/images/partners-certifications/canon.webp',
    amkor: '/images/partners-certifications/amkor.webp'
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
