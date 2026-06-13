// ─── Mosque Data ──────────────────────────────────────────────────────────────
// Edit these values, or connect Contentful (see lib/contentful.ts)

export const MOSQUE = {
  NAME:      "Masjid Hidayatullah",
  LOCATION:  "Jangnim, Busan. Korea Selatan",
  ADDRESS:   "328-16 Jangnim 1(il)-dong, Saha-gu, Busan, Korea Selatan",
  PHONE:     "+62 812-3456-7890",
  EMAIL:     "dkm.hidayatullah@gmail.com",
  FOUNDED:   "2016",
  FACEBOOK:  "https://www.facebook.com/MasjidHidayatullah2016",
  INSTAGRAM: "https://www.instagram.com/dkm_hidayatullah/",
};

export const STATS = [
  { number: "500+",  key: "stat_jamaah"  as const },
  { number: "12",    key: "stat_program" as const },
  { number: "2016",  key: "stat_tahun"   as const },
  { number: "8",     key: "stat_kajian"  as const },
];

// ─── Programs / Services ──────────────────────────────────────────────────────
export const PROGRAMS = [
  {
    icon: "mosque",
    title:    { id: "Sholat Berjamaah",         en: "Congregational Prayer",       ko: "집단 예배" },
    desc:     { id: "Lima waktu sholat berjamaah setiap hari, dilengkapi dengan dzikir dan doa bersama.",
                en: "Five daily congregational prayers with collective dhikr and supplication.",
                ko: "매일 5번의 집단 예배, 공동 디크르 및 기도 포함." },
    slug: "sholat",
  },
  {
    icon: "book",
    title:    { id: "Kajian & Pengajian",        en: "Islamic Study Circles",       ko: "이슬람 학습 모임" },
    desc:     { id: "Kajian rutin mingguan dan bulanan dengan ustadz berpengalaman membahas fiqih, tafsir, dan akhlak.",
                en: "Weekly and monthly study circles with experienced scholars covering fiqh, tafsir, and ethics.",
                ko: "경험 있는 학자들과 함께하는 주간 및 월간 학습 모임." },
    slug: "kajian",
  },
  {
    icon: "school",
    title:    { id: "TPA / Pendidikan Al-Qur'an", en: "Quran Education (TPA)",      ko: "꾸란 교육" },
    desc:     { id: "Taman Pendidikan Al-Qur'an untuk anak-anak dengan metode iqro dan tahsin.",
                en: "Quran education center for children using the iqro and tahsin method.",
                ko: "이크로 및 타흐신 방법을 사용한 어린이 꾸란 교육 센터." },
    slug: "tpa",
  },
  {
    icon: "heart",
    title:    { id: "Sosial & Zakat",            en: "Social & Zakat Programs",     ko: "사회 & 자카트 프로그램" },
    desc:     { id: "Pengelolaan zakat, infaq, sedekah, dan program sosial untuk membantu masyarakat yang membutuhkan.",
                en: "Management of zakat, infaq, charity, and social programs to help those in need.",
                ko: "자카트, 인파크, 자선 및 사회 프로그램 관리." },
    slug: "sosial",
  },
  {
    icon: "youth",
    title:    { id: "Remaja Masjid",             en: "Youth Organization",          ko: "청소년 조직" },
    desc:     { id: "Organisasi kepemudaan yang aktif dalam kegiatan dakwah, olahraga, dan pengembangan diri.",
                en: "Active youth organization in da'wah, sports, and self-development activities.",
                ko: "다와, 스포츠, 자기 개발 활동에 적극적인 청소년 조직." },
    slug: "remaja",
  },
  {
    icon: "store",
    title:    { id: "Koperasi Masjid",           en: "Mosque Cooperative",          ko: "모스크 협동조합" },
    desc:     { id: "Toko dan koperasi yang melayani kebutuhan jamaah sekaligus mendukung operasional masjid.",
                en: "Store and cooperative serving congregation needs while supporting mosque operations.",
                ko: "신도들의 필요를 충족하고 모스크 운영을 지원하는 상점 및 협동조합." },
    slug: "koperasi",
  },
];

// ─── Prayer Schedule ──────────────────────────────────────────────────────────
export const PRAYER_SCHEDULE = [
  { key: "jadwal_subuh"   as const, time_adzan: "04:35", time_iqomah: "04:50" },
  { key: "jadwal_dzuhur"  as const, time_adzan: "12:00", time_iqomah: "12:15" },
  { key: "jadwal_ashar"   as const, time_adzan: "15:20", time_iqomah: "15:30" },
  { key: "jadwal_maghrib" as const, time_adzan: "17:58", time_iqomah: "18:05" },
  { key: "jadwal_isya"    as const, time_adzan: "19:10", time_iqomah: "19:20" },
];

// ─── Koperasi Products ────────────────────────────────────────────────────────
export const KOPERASI_PRODUCTS = [
  { id: "p1", name: { id: "Kebutuhan Pokok",      en: "Basic Necessities",      ko: "기본 필수품" },
    desc: { id: "Beras, minyak, gula, dan sembako lainnya", en: "Rice, oil, sugar, and other staples", ko: "쌀, 기름, 설탕 등 생필품" }, icon: "🛒" },
  { id: "p2", name: { id: "Pakaian Muslim",        en: "Muslim Clothing",        ko: "무슬림 의류" },
    desc: { id: "Baju koko, gamis, mukena, sarung, dan peci", en: "Koko shirts, gamis, mukena, sarung, and kopiah", ko: "코코 셔츠, 가미스, 무케나, 사룽, 코피아" }, icon: "👔" },
  { id: "p3", name: { id: "Perlengkapan Ibadah",  en: "Worship Supplies",       ko: "예배 용품" },
    desc: { id: "Sajadah, tasbih, Al-Qur'an, dan buku-buku islami", en: "Prayer rugs, tasbih, Quran, and Islamic books", ko: "기도 매트, 타스비흐, 꾸란, 이슬람 도서" }, icon: "📿" },
  { id: "p4", name: { id: "Makanan & Minuman",    en: "Food & Beverages",       ko: "식음료" },
    desc: { id: "Snack halal, minuman, dan produk makanan olahan", en: "Halal snacks, beverages, and processed food", ko: "할랄 스낵, 음료, 가공 식품" }, icon: "🍱" },
  { id: "p5", name: { id: "Simpan Pinjam",        en: "Savings & Loans",        ko: "저축 및 대출" },
    desc: { id: "Layanan simpan pinjam tanpa riba untuk anggota koperasi", en: "Interest-free savings and loan services for cooperative members", ko: "협동조합 회원을 위한 무이자 저축 및 대출 서비스" }, icon: "💰" },
  { id: "p6", name: { id: "Pembayaran Online",    en: "Online Payments",        ko: "온라인 결제" },
    desc: { id: "Bayar listrik, BPJS, pulsa, dan tagihan lainnya", en: "Pay electricity, BPJS, mobile credit, and other bills", ko: "전기요금, BPJS, 통신요금 등 결제 서비스" }, icon: "📱" },
];

export const KOPERASI_BENEFITS = [
  { id: "b1", text: { id: "Dividen tahunan dari keuntungan koperasi",     en: "Annual dividends from cooperative profits",       ko: "협동조합 이익으로부터 연간 배당" } },
  { id: "b2", text: { id: "Layanan simpan pinjam tanpa riba",             en: "Interest-free savings and loan services",         ko: "무이자 저축 및 대출 서비스" } },
  { id: "b3", text: { id: "Diskon pembelian produk di toko masjid",       en: "Purchase discounts at the mosque store",          ko: "모스크 상점에서 구매 할인" } },
  { id: "b4", text: { id: "Ikut berpartisipasi dalam RAT (Rapat Anggota)", en: "Participate in the Annual Members Meeting (RAT)", ko: "연간 회원 회의(RAT) 참여" } },
  { id: "b5", text: { id: "Mendukung operasional dan program masjid",     en: "Support mosque operations and programs",          ko: "모스크 운영 및 프로그램 지원" } },
];

// ─── Gallery Items ────────────────────────────────────────────────────────────
// Replace src with actual images from Contentful or /public
export const GALLERY_ITEMS = [
  { id: "g1", label: { id: "Sholat Berjamaah",    en: "Congregational Prayer", ko: "집단 예배" },  color: "#14532d" },
  { id: "g2", label: { id: "Kajian Rutin",         en: "Regular Study Circle", ko: "정기 학습 모임" }, color: "#166534" },
  { id: "g3", label: { id: "Kegiatan TPA",         en: "TPA Activities",       ko: "TPA 활동" },   color: "#15803d" },
  { id: "g4", label: { id: "Bakti Sosial",         en: "Social Charity",       ko: "사회 자선" },   color: "#16a34a" },
  { id: "g5", label: { id: "Koperasi Masjid",      en: "Mosque Cooperative",   ko: "모스크 협동조합" }, color: "#22c55e" },
  { id: "g6", label: { id: "Peringatan Hari Besar", en: "Islamic Celebrations", ko: "이슬람 기념행사" }, color: "#4ade80" },
];
