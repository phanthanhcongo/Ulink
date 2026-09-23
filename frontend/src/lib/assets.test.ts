import test from 'node:test';
import assert from 'node:assert/strict';
import { ASSETS } from './assets';

test('ASSETS contains all logo variants', () => {
  assert(ASSETS.logo.full);
  assert(ASSETS.logo.mark);
  assert(ASSETS.logo.white);
  assert(ASSETS.logo.main);
  assert(ASSETS.logo.full.endsWith('.svg'));
});

test('ASSETS contains banners', () => {
  assert(ASSETS.banners.loginHero);
  assert(ASSETS.banners.loginHero.endsWith('.webp'));
});

test('ASSETS contains home section images', () => {
  assert(ASSETS.home.hero);
  assert(ASSETS.home.heroMobile);
  assert(ASSETS.home.iconNation);
  assert(ASSETS.home.iconAdapter);
  assert(ASSETS.home.iconFile);
  assert(ASSETS.home.iconSecurity);
  assert(ASSETS.home.iconSend);
});

test('ASSETS contains home section 2 images', () => {
  assert(ASSETS.home.solutionCleanroom);
  assert(ASSETS.home.solutionPackaging);
  assert(ASSETS.home.productCutGloves);
  assert(ASSETS.home.productHvacTape);
  assert(ASSETS.home.productCustomPkg);
});

test('ASSETS contains industry solution icons', () => {
  assert(ASSETS.home.indElectronics);
  assert(ASSETS.home.indFood);
  assert(ASSETS.home.indLogistics);
  assert(ASSETS.home.indPharma);
  assert(ASSETS.home.indFurniture);
  assert(ASSETS.home.indConstruction);
});

test('ASSETS contains company section images', () => {
  assert(ASSETS.home.companyFactory);
  assert(ASSETS.home.iconSlack);
  assert(ASSETS.home.iconShield);
  assert(ASSETS.home.iconTag);
  assert(ASSETS.home.iconTruck);
});

test('ASSETS contains partner logos', () => {
  assert(ASSETS.home.partnerSamsung);
  assert(ASSETS.home.partnerCanon);
  assert(ASSETS.home.partnerPanasonic);
  assert(ASSETS.home.partnerIbm);
  assert(ASSETS.home.partnerTraphaco);
  assert(ASSETS.home.partnerCocaCola);
  assert(ASSETS.home.partnerVinfast);
  assert(ASSETS.home.partnerLg);
});

test('ASSETS contains certifications', () => {
  assert(ASSETS.home.certIso9001);
  assert(ASSETS.home.certSgs);
  assert(ASSETS.home.certRohs);
  assert(ASSETS.home.certMsds);
});

test('ASSETS contains case study images', () => {
  assert(ASSETS.home.case1Banner);
  assert(ASSETS.home.case2Banner);
  assert(ASSETS.home.case3Banner);
  assert(ASSETS.home.case4Banner);
});

test('ASSETS contains avatar images', () => {
  assert(ASSETS.home.avatar1);
  assert(ASSETS.home.avatar2);
  assert(ASSETS.home.avatar3);
  assert(ASSETS.home.avatar4);
});

test('ASSETS contains news images', () => {
  assert(ASSETS.home.news1);
  assert(ASSETS.home.news2);
  assert(ASSETS.home.news3);
  assert(ASSETS.home.news4);
  assert(ASSETS.home.news4Eco);
  assert(ASSETS.home.news5);
  assert(ASSETS.home.news6);
});

test('ASSETS contains resource icons', () => {
  assert(ASSETS.home.docIcon1);
  assert(ASSETS.home.docIcon2);
  assert(ASSETS.home.docIcon3);
  assert(ASSETS.home.docIcon4);
});

test('ASSETS contains footer assets', () => {
  assert(ASSETS.footer.boCongThuong);
  assert(ASSETS.footer.qrCode);
  assert(ASSETS.footer.facebook);
  assert(ASSETS.footer.linkedin);
  assert(ASSETS.footer.tiktok);
  assert(ASSETS.footer.youtube);
});

test('ASSETS contains partner WebP logos', () => {
  assert(ASSETS.partners.samsung);
  assert(ASSETS.partners.lg);
  assert(ASSETS.partners.canon);
  assert(ASSETS.partners.amkor);
  assert(ASSETS.partners.samsung.endsWith('.webp'));
});

test('ASSETS contains illustrations', () => {
  assert(ASSETS.illustrations.vietnamMap);
});

test('ASSETS contains about section images', () => {
  assert(ASSETS.about.heroWarehouse);
  assert(ASSETS.about.locationAerial);
  assert(ASSETS.about.opWarehouse);
  assert(ASSETS.about.opWms);
  assert(ASSETS.about.opTruck);
  assert(ASSETS.about.opTeam);
});

test('ASSETS contains quality certifications', () => {
  assert(ASSETS.about.iso9001);
  assert(ASSETS.about.iso14001);
  assert(ASSETS.about.iso45001);
  assert(ASSETS.about.isoEsd);
  assert(ASSETS.about.iso13485);
});

test('ASSETS contains OG image', () => {
  assert(ASSETS.og.default);
  assert(ASSETS.og.default.includes('og-default'));
});

test('ASSETS paths start with slash', () => {
  const checkPath = (path: string) => assert(path.startsWith('/'));
  checkPath(ASSETS.logo.full);
  checkPath(ASSETS.banners.loginHero);
  checkPath(ASSETS.home.hero);
  checkPath(ASSETS.footer.facebook);
  checkPath(ASSETS.og.default);
});
