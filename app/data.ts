// ─── Mosque Data ──────────────────────────────────────────────────────────────
// Edit these values, or connect Contentful (see lib/contentful.ts)

export const MOSQUE = {
  NAME:      "Masjid Hidayatullah",
  LOCATION:  "Jangnim, Busan. Korea Selatan",
  ADDRESS:   "328-16 Jangnim 1(il)-dong, Saha-gu, Busan, South Korea",
  PHONE:     "(WA) +62 896-5465-9685",
  EMAIL:     "dkm.hidayatullah@gmail.com",
  FOUNDED:   "Tahun 2000",
  FACEBOOK:  "https://www.facebook.com/MasjidHidayatullah2016",
  INSTAGRAM: "https://www.instagram.com/dkm_hidayatullah/",
};

export const STATS = [
  { number: "500+",  key: "stat_jamaah"  as const },
  { number: "12",    key: "stat_program" as const },
  { number: "2000",  key: "stat_tahun"   as const },
  { number: "8",     key: "stat_kajian"  as const },
];

// ─── Programs / Services ──────────────────────────────────────────────────────
export const PROGRAMS = [
  {
    icon: "mosque",
    title:    { id: "Sholat Berjamaah",         en: "Congregational Prayer",       ko: "집단 예배" },
    description:     { id: "Lima waktu sholat berjamaah setiap hari, dilengkapi dengan dzikir dan doa bersama.",
                en: "Five daily congregational prayers with collective dhikr and supplication.",
                ko: "매일 5번의 집단 예배, 공동 디크르 및 기도 포함." },
    slug: "sholat",
  },
  {
    icon: "book",
    title:    { id: "Kajian & Pengajian",        en: "Islamic Study Circles",       ko: "이슬람 학습 모임" },
    description:     { id: "Kajian rutin mingguan dan bulanan dengan ustadz berpengalaman membahas fiqih, tafsir, dan akhlak.",
                en: "Weekly and monthly study circles with experienced scholars covering fiqh, tafsir, and ethics.",
                ko: "경험 있는 학자들과 함께하는 주간 및 월간 학습 모임." },
    slug: "kajian",
  },
  {
    icon: "school",
    title:    { id: "Pendidikan Al-Qur'an", en: "Quran Education",      ko: "꾸란 교육" },
    description:     { id: "Taman Pendidikan Al-Qur'an untuk anak-anak dengan metode iqro dan tahsin.",
                en: "Quran education center for children using the iqro and tahsin method.",
                ko: "이크로 및 타흐신 방법을 사용한 어린이 꾸란 교육 센터." },
    slug: "tpa",
  },
  {
    icon: "heart",
    title:    { id: "Sosial & Zakat",            en: "Social & Zakat Programs",     ko: "사회 & 자카트 프로그램" },
    description:     { id: "Pengelolaan zakat, infaq, sedekah, dan program sosial untuk membantu masyarakat yang membutuhkan.",
                en: "Management of zakat, infaq, charity, and social programs to help those in need.",
                ko: "자카트, 인파크, 자선 및 사회 프로그램 관리." },
    slug: "sosial",
  },
  {
    icon: "youth",
    title:    { id: "Remaja Masjid",             en: "Youth Organization",          ko: "청소년 조직" },
    description:     { id: "Organisasi kepemudaan yang aktif dalam kegiatan dakwah, olahraga, dan pengembangan diri.",
                en: "Active youth organization in da'wah, sports, and self-development activities.",
                ko: "다와, 스포츠, 자기 개발 활동에 적극적인 청소년 조직." },
    slug: "remaja",
  },
  {
    icon: "store",
    title:    { id: "Koperasi Masjid",           en: "Mosque Cooperative",          ko: "모스크 협동조합" },
    description:     { id: "Toko dan koperasi yang melayani kebutuhan jamaah sekaligus mendukung operasional masjid.",
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

// ─── Koperasi Page Data (fallback jika Contentful tidak terhubung) ──────────
export type KategoriKey = "semua" | "pokok" | "ibadah" | "pakaian" | "makanan" | "layanan";

export const KATEGORI_LIST: { key: KategoriKey; label: { id: string; en: string; ko: string } }[] = [
  { key: "semua",   label: { id: "Semua",           en: "All",            ko: "전체" } },
  { key: "pokok",   label: { id: "Kebutuhan Pokok", en: "Basic Needs",    ko: "기본 필수품" } },
  { key: "ibadah",  label: { id: "Perlengkapan Ibadah", en: "Worship Supplies", ko: "예배 용품" } },
  { key: "pakaian", label: { id: "Pakaian Muslim",  en: "Muslim Clothing", ko: "무슬림 의류" } },
  { key: "makanan", label: { id: "Makanan & Minuman", en: "Food & Drinks", ko: "식음료" } },
  { key: "layanan", label: { id: "Layanan",         en: "Services",       ko: "서비스" } },
];

export type Produk = {
  id: string;
  nama: { id: string; en: string; ko: string };
  deskripsi: { id: string; en: string; ko: string };
  harga: string | null; // null = hubungi untuk harga
  kategori: KategoriKey;
  emoji: string;
  tersedia: boolean;
};

export const PRODUK_LIST: Produk[] = [
  {
    id: "p1", emoji: "🌾", kategori: "pokok", tersedia: true, harga: "Rp 13.000/kg",
    nama: { id: "Beras Premium", en: "Premium Rice", ko: "프리미엄 쌀" },
    deskripsi: { id: "Beras pulen kualitas premium, cocok untuk keluarga.", en: "Premium quality soft rice, perfect for the family.", ko: "가족을 위한 프리미엄 품질의 부드러운 쌀." },
  },
  {
    id: "p2", emoji: "🫒", kategori: "pokok", tersedia: true, harga: "Rp 18.000/ltr",
    nama: { id: "Minyak Goreng Halal", en: "Halal Cooking Oil", ko: "할랄 식용유" },
    deskripsi: { id: "Minyak goreng bersertifikat halal MUI.", en: "MUI halal-certified cooking oil.", ko: "MUI 할랄 인증 식용유." },
  },
  {
    id: "p3", emoji: "📿", kategori: "ibadah", tersedia: true, harga: "Rp 25.000",
    nama: { id: "Tasbih Kayu", en: "Wooden Tasbih", ko: "나무 타스비흐" },
    deskripsi: { id: "Tasbih kayu berkualitas untuk dzikir sehari-hari.", en: "Quality wooden tasbih for daily dhikr.", ko: "매일 디크르를 위한 품질 좋은 나무 타스비흐." },
  },
  {
    id: "p4", emoji: "🕌", kategori: "ibadah", tersedia: true, harga: "Rp 75.000",
    nama: { id: "Sajadah Premium", en: "Premium Prayer Rug", ko: "프리미엄 기도 매트" },
    deskripsi: { id: "Sajadah tebal dan lembut dengan motif islami.", en: "Thick and soft prayer rug with Islamic motif.", ko: "이슬람 문양의 두껍고 부드러운 기도 매트." },
  },
  {
    id: "p5", emoji: "📖", kategori: "ibadah", tersedia: true, harga: "Rp 85.000",
    nama: { id: "Al-Qur'an Terjemahan", en: "Quran with Translation", ko: "번역본 꾸란" },
    deskripsi: { id: "Al-Qur'an dengan terjemahan Bahasa Indonesia.", en: "Quran with Indonesian language translation.", ko: "인도네시아어 번역본 꾸란." },
  },
  {
    id: "p6", emoji: "👔", kategori: "pakaian", tersedia: true, harga: "Rp 120.000",
    nama: { id: "Baju Koko Pria", en: "Men's Koko Shirt", ko: "남성 코코 셔츠" },
    deskripsi: { id: "Baju koko bahan katun premium, tersedia berbagai ukuran.", en: "Premium cotton koko shirt, available in various sizes.", ko: "다양한 사이즈의 프리미엄 면 코코 셔츠." },
  },
  {
    id: "p7", emoji: "🧕", kategori: "pakaian", tersedia: true, harga: "Rp 95.000",
    nama: { id: "Mukena Putih", en: "White Mukena", ko: "흰색 무케나" },
    deskripsi: { id: "Mukena bahan katun putih halus untuk sholat wanita.", en: "Fine white cotton mukena for women's prayer.", ko: "여성 예배용 부드러운 흰색 면 무케나." },
  },
  {
    id: "p8", emoji: "🍱", kategori: "makanan", tersedia: true, harga: "Rp 8.000",
    nama: { id: "Kurma Ajwa", en: "Ajwa Dates", ko: "아즈와 대추야자" },
    deskripsi: { id: "Kurma Ajwa premium impor dari Madinah, per 100gr.", en: "Premium Ajwa dates imported from Madinah, per 100gr.", ko: "마디나에서 수입한 프리미엄 아즈와 대추야자, 100gr 단위." },
  },
  {
    id: "p9", emoji: "💰", kategori: "layanan", tersedia: true, harga: null,
    nama: { id: "Simpan Pinjam", en: "Savings & Loans", ko: "저축 및 대출" },
    deskripsi: { id: "Layanan simpan pinjam bebas riba khusus anggota koperasi.", en: "Interest-free savings and loan service for cooperative members.", ko: "협동조합 회원 전용 무이자 저축 및 대출 서비스." },
  },
  {
    id: "p10", emoji: "📱", kategori: "layanan", tersedia: true, harga: null,
    nama: { id: "Pembayaran Tagihan", en: "Bill Payments", ko: "청구서 결제" },
    deskripsi: { id: "Bayar listrik, air, BPJS, pulsa, dan tagihan lainnya.", en: "Pay electricity, water, BPJS, phone credit, and other bills.", ko: "전기, 수도, BPJS, 통신비 등 각종 청구서 결제." },
  },
];

export type Pengumuman = {
  id: string;
  judul: { id: string; en: string; ko: string };
  isi: { id: string; en: string; ko: string };
  tanggal: string;
  tipe: "promo" | "info" | "penting";
  aktif: boolean;
};

export const PENGUMUMAN_LIST: Pengumuman[] = [
  {
    id: "a1", tipe: "promo", aktif: true, tanggal: "2026-06-01",
    judul: { id: "Diskon Ramadan 10%", en: "Ramadan 10% Discount", ko: "라마단 10% 할인" },
    isi: { id: "Dapatkan diskon 10% untuk semua produk perlengkapan ibadah selama bulan Ramadan.", en: "Get 10% discount on all worship supplies during Ramadan.", ko: "라마단 기간 동안 모든 예배 용품 10% 할인." },
  },
  {
    id: "a2", tipe: "info", aktif: true, tanggal: "2026-06-10",
    judul: { id: "Stok Al-Qur'an Baru Tiba", en: "New Quran Stock Arrived", ko: "새 꾸란 재입고" },
    isi: { id: "Al-Qur'an edisi terbaru dengan terjemahan dan tafsir ringkas sudah tersedia di toko.", en: "New edition Quran with translation and concise tafsir is now available at the store.", ko: "번역 및 간략한 타프시르가 포함된 최신 판 꾸란이 입고되었습니다." },
  },
];

// ─── Pengumuman Masjid (fallback) ────────────────────────────────────────────
export type PengumumanMasjid = {
  id: string;
  judul: { id: string; en: string; ko: string };
  isi: { id: string; en: string; ko: string };
  tanggal: string;
  kategori: "kajian" | "sosial" | "kegiatan" | "umum";
  pinned: boolean;
  aktif: boolean;
};

export const PENGUMUMAN_MASJID: PengumumanMasjid[] = [
  {
    id: "m1", kategori: "kajian", pinned: true, aktif: true, tanggal: "2026-06-13",
    judul: {
      id: "Kajian Ahad Pagi",
      en: "Sunday Morning Study Circle",
      ko: "일요일 아침 학습 모임",
    },
    isi: {
      id: "Kajian rutin setiap Ahad pagi pukul 08.00 WIB bersama Ustadz Ahmad. Tema: Fiqih Muamalah.",
      en: "Regular Sunday morning study circle at 08:00 with Ustadz Ahmad. Topic: Fiqh of Transactions.",
      ko: "매주 일요일 오전 8시 우스타즈 아흐마드와 함께하는 정기 학습 모임. 주제: 무아말라 피크.",
    },
  },
  {
    id: "m2", kategori: "kegiatan", pinned: false, aktif: true, tanggal: "2026-06-20",
    judul: {
      id: "Bakti Sosial Ramadan",
      en: "Ramadan Social Charity",
      ko: "라마단 사회 봉사",
    },
    isi: {
      id: "Kegiatan bakti sosial pembagian sembako untuk warga kurang mampu di sekitar masjid. Daftar sebagai relawan!",
      en: "Social charity event distributing basic necessities to underprivileged residents near the mosque. Register as a volunteer!",
      ko: "모스크 주변 저소득층 주민들에게 생필품을 배분하는 사회 봉사 행사. 자원봉사자로 등록하세요!",
    },
  },
  {
    id: "m3", kategori: "umum", pinned: false, aktif: true, tanggal: "2026-06-15",
    judul: {
      id: "Renovasi Tempat Wudhu",
      en: "Ablution Area Renovation",
      ko: "우두 공간 리모델링",
    },
    isi: {
      id: "Tempat wudhu putra sedang direnovasi mulai 15–22 Juni. Jamaah mohon menggunakan tempat wudhu alternatif.",
      en: "The men's ablution area is under renovation from June 15–22. Congregation please use the alternative ablution area.",
      ko: "남성 우두 공간이 6월 15~22일 리모델링 중입니다. 신도들은 대체 우두 공간을 이용해 주세요.",
    },
  },
];