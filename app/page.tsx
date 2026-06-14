"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Phone, MapPin, Mail, Clock,
  BookOpen, Heart, Users, ShoppingBag, Star, CheckCircle,
} from "lucide-react";

// SVG inline karena lucide-react v1.x belum include Facebook/Instagram
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
import ScrollReveal from "../components/ScrollReveal";
import { useLang } from "../components/LangContext";
import { t } from "./i18n";
import { MOSQUE, STATS, PROGRAMS, PRAYER_SCHEDULE, KOPERASI_PRODUCTS, KOPERASI_BENEFITS, GALLERY_ITEMS } from "./data";
import { PENGUMUMAN_MASJID, type PengumumanMasjid } from "./data";

const PROGRAM_ICONS: Record<string, React.ReactNode> = {
  mosque:  <span className="text-2xl">🕌</span>,
  book:    <BookOpen className="w-6 h-6 text-green-700" />,
  school:  <span className="text-2xl">📖</span>,
  heart:   <Heart className="w-6 h-6 text-green-700" />,
  youth:   <Users className="w-6 h-6 text-green-700" />,
  store:   <ShoppingBag className="w-6 h-6 text-green-700" />,
};

// ── Helper: hitung waktu Jumat dari Dhuhr ────────────────────
function calcJumat(dhuhrStr: string) {
  if (!dhuhrStr) return { adzan: "--:--", mulai: "--:--", selesai: "--:--" };
  const [h, m] = dhuhrStr.split(":").map(Number);
  const totalMenit = h * 60 + m;

  const mulaiRaw = totalMenit - 20;
  const mulai = Math.floor(mulaiRaw / 5) * 5;

  const selesaiRaw = totalMenit + 40;
  const selesai = Math.ceil(selesaiRaw / 5) * 5;

  const fmt = (t: number) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

  return { adzan: dhuhrStr, mulai: fmt(mulai), selesai: fmt(selesai) };
}

export default function Home() {
  const [cmsPrograms, setCmsPrograms] = useState<any[] | null>(null);
  const displayPrograms: any[] = cmsPrograms ?? PROGRAMS;
  const router = useRouter();
  const { lang } = useLang();
  const year = new Date().getFullYear();
  const [notifDismissed, setNotifDismissed] = useState(false);
  const notifPinned = PENGUMUMAN_MASJID.find(p => p.pinned && p.aktif);

  // ── Aladhan API ──────────────────────────────────────────────
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string>>({});
  const [prayerLoading, setPrayerLoading] = useState(true);
  const [prayerDate, setPrayerDate] = useState("");

  useEffect(() => {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Busan&country=KR&method=3")
      .then(r => r.json())
      .then(data => {
        setPrayerTimes(data.data.timings);
        setPrayerDate(data.data.date.readable);
        setPrayerLoading(false);
      })
      .catch(() => setPrayerLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/contentful/programs")
      .then(r => r.json())
      .then(data => {
        if (data?.length > 0) setCmsPrograms(data);
      })
      .catch(() => {}); // fallback ke data statis
  }, []);

  const PRAYER_LIVE = [
    { key: "jadwal_subuh"   as const, apiKey: "Fajr"    },
    { key: "jadwal_dzuhur"  as const, apiKey: "Dhuhr"   },
    { key: "jadwal_ashar"   as const, apiKey: "Asr"     },
    { key: "jadwal_maghrib" as const, apiKey: "Maghrib" },
    { key: "jadwal_isya"    as const, apiKey: "Isha"    },
  ];

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
               {/* style={{ background: "linear-gradient(160deg, #052e16 0%, #14532d 40%, #166534 100%)" }}> */}

        {/* Islamic geometric pattern overlay */}
        {/* <div className="absolute inset-0 islamic-pattern" /> */}

        {/* Decorative crescent glow */}
        {/* <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
             style={{ background: "radial-gradient(circle, #22c55e, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8"
             style={{ background: "radial-gradient(circle, #4ade80, transparent 70%)", transform: "translate(-40%, 40%)" }} /> */}

        <div className="absolute inset-0"
             style={{ backgroundImage: "url('/crew.jpg')", backgroundSize: "cover",
                      backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(5,10,15,0.72)" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-7 opacity-0 animate-fade-up"
                 style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <div className="w-8 h-px" style={{ background: "#4ade80" }} />
              <span className="text-xs font-semibold uppercase" style={{ color: "#4ade80", letterSpacing: "0.25em" }}>
                {t(lang, "hero_eyebrow")}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-3 opacity-0 animate-fade-up"
                style={{ fontFamily: "var(--font-display)", lineHeight: "1.05", animationDelay: "0.2s", animationFillMode: "forwards" }}>
              {t(lang, "hero_title1")}
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 opacity-0 animate-fade-up"
                style={{ fontFamily: "var(--font-display)", lineHeight: "1.05", animationDelay: "0.25s", animationFillMode: "forwards",
                         background: "linear-gradient(135deg, #4ade80, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t(lang, "hero_title2")}
            </h1>

            <p className="text-green-100 text-lg md:text-xl leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-up"
               style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
              {t(lang, "hero_desc")}
            </p>

            <div className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-up"
                 style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              <a href="#jadwal" className="btn-primary text-base px-8 py-4">
                {t(lang, "hero_cta1")} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-outline text-base px-8 py-4">
                {t(lang, "hero_cta2")}
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-15 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-400 text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 animate-pulse" style={{ background: "linear-gradient(to bottom, #4ade80, transparent)" }} />
        </div>

        {/* Notifikasi pinned */}
        {notifPinned && !notifDismissed && (
          <div className="absolute bottom-0 left-0 right-0 z-10"
               style={{ background: "rgba(5,46,22,0.85)", backdropFilter: "blur(8px)",
                        borderTop: "1px solid rgba(74,222,128,0.3)" }}>
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
              <span className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                    style={{ background: "#4ade80", color: "#052e16" }}>
                {t(lang, "pengumuman_pinned")}
              </span>
              <p className="text-green-100 text-sm flex-1 truncate">
                {notifPinned.judul[lang as keyof typeof notifPinned.judul]}
                {" — "}
                <span className="text-green-300">
                  {notifPinned.isi[lang as keyof typeof notifPinned.isi]}
                </span>
              </p>
              <button onClick={() => setNotifDismissed(true)}
                      className="text-green-400 hover:text-white text-xs flex-shrink-0 transition-colors px-2 py-1 rounded hover:bg-white/10">
                {t(lang, "pengumuman_notif_close")} ✕
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════════════════════════ */}
      <section id="about" className="mt-28 mb-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <ScrollReveal direction="left">
              <span className="section-eyebrow">{t(lang, "about_eyebrow")}</span>
              <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}>
                {t(lang, "about_title1")}<br />
                <em className="not-italic" style={{ color: "#15803d" }}>{t(lang, "about_title2")}</em>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">{t(lang, "about_desc1")}</p>
              <p className="text-gray-500 leading-relaxed mb-8">{t(lang, "about_desc2")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-lg" style={{ background: "#f0fdf4", borderLeft: "4px solid #15803d" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4" style={{ color: "#15803d" }} />
                    <span className="font-semibold text-sm" style={{ color: "#166534" }}>{t(lang, "about_vision_title")}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{t(lang, "about_vision")}</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-lg" style={{ borderLeft: "4px solid #d1d5db" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-gray-700 text-sm">{t(lang, "about_mission_title")}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{t(lang, "about_mission")}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 p-8 text-white rounded-lg"
                     style={{ background: "linear-gradient(135deg, #166534, #15803d)" }}>
                  <div className="text-3xl mb-3">🕌</div>
                  <p className="text-xl leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                    &ldquo;{t(lang, "about_quote")}&rdquo;
                  </p>
                </div>
                <div className="p-6 flex flex-col justify-center text-white rounded-lg"
                     style={{ background: "#052e16" }}>
                  <div className="text-4xl" style={{ fontFamily: "var(--font-display)", color: "#4ade80" }}>
                    {MOSQUE.FOUNDED}
                  </div>
                  <div className="text-green-300 text-sm mt-1">{t(lang, "about_founded")}</div>
                </div>
                <div className="p-6 flex flex-col justify-center text-white rounded-lg"
                     style={{ background: "#14532d" }}>
                  <div className="text-4xl" style={{ fontFamily: "var(--font-display)" }}>500+</div>
                  <div className="text-sm mt-1" style={{ color: "#86efac" }}>{t(lang, "stat_jamaah")}</div>
                </div>
                <div className="col-span-2 bg-green-50 p-6 flex items-center gap-4 rounded-lg border border-green-100">
                  <MapPin className="w-8 h-8 flex-shrink-0" style={{ color: "#15803d" }} />
                  <div>
                    <div className="font-semibold text-gray-900">{t(lang, "about_founded")}</div>
                    <div className="text-gray-500 text-sm">{MOSQUE.FOUNDED} · {t(lang, "about_location")}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* ══ PENGUMUMAN MASJID ════════════════════════════════════════════════ */}
        <section id="pengumuman" className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <ScrollReveal className="mb-12">
              <span className="section-eyebrow">{t(lang, "pengumuman_eyebrow")}</span>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}>
                  {t(lang, "pengumuman_title1")}{" "}
                  <em className="not-italic" style={{ color: "#15803d" }}>{t(lang, "pengumuman_title2")}</em>
                </h2>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <p className="text-gray-500 max-w-sm">{t(lang, "pengumuman_desc")}</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PENGUMUMAN_MASJID.filter(p => p.aktif).map((item, i) => {
                const KAT_STYLE: Record<string, { bg: string; text: string; icon: string }> = {
                  kajian:   { bg: "#dbeafe", text: "#1e40af", icon: "📖" },
                  sosial:   { bg: "#fce7f3", text: "#9d174d", icon: "❤️" },
                  kegiatan: { bg: "#fef9c3", text: "#a16207", icon: "📅" },
                  umum:     { bg: "#f3f4f6", text: "#374151", icon: "📢" },
                };
                const style = KAT_STYLE[item.kategori] ?? KAT_STYLE.umum;
                const katKey = `pengumuman_kat_${item.kategori}` as any;
              
                return (
                  <ScrollReveal key={item.id} delay={i * 0.08}>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col h-full"
                         style={{ borderTop: item.pinned ? "3px solid #15803d" : undefined }}>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                              style={{ background: style.bg, color: style.text }}>
                          {style.icon} {t(lang, katKey)}
                        </span>
                        {item.pinned && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded"
                                style={{ background: "#f0fdf4", color: "#15803d" }}>
                            📌 {t(lang, "pengumuman_pinned")}
                          </span>
                        )}
                      </div>
                      
                      {/* Content */}
                      <h3 className="font-semibold text-gray-900 mb-2 leading-snug">
                        {item.judul[lang as keyof typeof item.judul]}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">
                        {item.isi[lang as keyof typeof item.isi]}
                      </p>
                      
                      {/* Footer */}
                      <div className="mt-4 pt-4 flex items-center justify-between"
                           style={{ borderTop: "1px solid #f3f4f6" }}>
                        <span className="text-gray-400 text-xs">📅 {item.tanggal}</span>
                        <a href="#contact"
                           className="text-xs font-semibold flex items-center gap-1 transition-colors"
                           style={{ color: "#15803d" }}>
                          {t(lang, "pengumuman_selengkapnya")} →
                        </a>
                      </div>
                    </div>
                  </ScrollReveal>   
                );
              })}
            </div>
            <div className="mt-20 flex flex-col items-start sm:items-end gap-2">
              <a href="/pengumuman" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-md transition-colors">
                        {t(lang, "pengumuman_lihat_semua")} <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
      </section>

      {/* ══ PROGRAMS ══════════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <ScrollReveal className="flex-1">
              <span className="section-eyebrow">{t(lang, "programs_eyebrow")}</span>
              <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}>
                {t(lang, "programs_title1")}<br />
                <em className="not-italic" style={{ color: "#15803d" }}>{t(lang, "programs_title2")}</em>
              </h2>
              <p className="text-gray-500 mt-4 text-lg leading-relaxed">{t(lang, "programs_desc")}</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPrograms.map((prog: any, i) => (
              <ScrollReveal key={prog.slug} delay={i * 0.08}>
                <div className="program-card">
                  <div className="program-icon">
                    {PROGRAM_ICONS[prog.icon] ?? <span className="text-2xl">🕌</span>}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">
                    {/* CMS: title string langsung, data.ts: title object {id, en} */}
                    {typeof prog.title === "string"
                      ? prog.title
                      : prog.title[lang as keyof typeof prog.title]}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {typeof prog.desc === "string"
                      ? prog.desc
                      : prog.desc?.[lang as keyof typeof prog.desc]}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-20 flex flex-col items-start sm:items-end gap-2">
            <a href="/programs" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-md transition-colors flex-shrink-0">
              {t(lang, "programs_lihat_semua")} <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* ══ PRAYER SCHEDULE ═══════════════════════════════════════════════════ */}
      <section id="jadwal" className="py-28 overflow-hidden"
               style={{ background: "linear-gradient(160deg, #052e16 0%, #166534 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-14">
            <span className="section-eyebrow mx-auto justify-center" style={{ color: "#4ade80" }}>
              {t(lang, "jadwal_eyebrow")}
            </span>
            <h2 className="text-4xl md:text-5xl text-white leading-tight"
                style={{ fontFamily: "var(--font-display)" }}>
              {t(lang, "jadwal_title1")}{" "}
              <em className="not-italic" style={{ color: "#4ade80" }}>{t(lang, "jadwal_title2")}</em>
            </h2>
            {prayerDate && (
              <p className="text-green-400 text-sm mt-3">
                📅 {prayerDate} · {t(lang, "jadwal_lokasi")}
              </p>
            )}
          </ScrollReveal>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {PRAYER_LIVE.map((prayer, i) => (
              <ScrollReveal key={prayer.key} delay={i * 0.08}>
                <div className="prayer-card">
                  <div className="text-2xl mb-2">🕐</div>
                  <div className="text-green-200 text-xs font-semibold uppercase tracking-wider mb-2">
                    {t(lang, prayer.key)}
                  </div>
                  <div className="text-white text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {prayerLoading ? (
                      <span className="text-green-500 text-sm animate-pulse">...</span>
                    ) : (
                      prayerTimes[prayer.apiKey] ?? "--:--"
                    )}
                  </div>
                  {!prayerLoading && prayerTimes[prayer.apiKey] && (() => {
                    const [h, m] = prayerTimes[prayer.apiKey].split(":").map(Number);
                    const iqomahTotal = h * 60 + m + 5;
                    const iqStr = `${String(Math.floor(iqomahTotal / 60)).padStart(2,"0")}:${String(iqomahTotal % 60).padStart(2,"0")}`;
                    return <div className="text-green-400 text-xs mt-1">{t(lang, "jadwal_iqomah")}: {iqStr}</div>;
                  })()}
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Friday prayer special card */}
          <ScrollReveal>
            {(() => {
              const { adzan, mulai, selesai } = calcJumat(prayerTimes["Dhuhr"] ?? "");
              return (
                <div className="rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 text-white"
                     style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div className="text-4xl">🕌</div>
                  <div className="text-center sm:text-left">
                    <div className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-2">
                      {t(lang, "jadwal_jumat")}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <div>
                        <div className="text-green-400 text-xs mb-0.5">{t(lang, "jadwal_adzan")}</div>
                        <div className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                          {prayerLoading ? <span className="animate-pulse text-green-500">...</span> : adzan}
                        </div>
                      </div>
                      <div className="text-green-600 text-lg">→</div>
                      <div>
                        <div className="text-green-400 text-xs mb-0.5">{t(lang, "jadwal_mulai")}</div>
                        <div className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                          {prayerLoading ? <span className="animate-pulse text-green-500">...</span> : mulai}
                        </div>
                      </div>
                      <div className="text-green-600 text-lg">–</div>
                      <div>
                        <div className="text-green-400 text-xs mb-0.5">{t(lang, "jadwal_selesai")}</div>
                        <div className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                          {prayerLoading ? <span className="animate-pulse text-green-500">...</span> : selesai}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-300 text-sm mt-2">{t(lang, "jadwal_khatib")}</div>
                  </div>
                  <div className="sm:ml-auto flex items-center gap-2 text-green-300 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{t(lang, "jadwal_setiap_jumat")}</span>
                  </div>
                </div>
              );
            })()}
          </ScrollReveal>
                
          <ScrollReveal>
            <p className="text-center text-green-400 text-sm mt-6">{t(lang, "jadwal_note")}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ KOPERASI ══════════════════════════════════════════════════════════ */}
      <section id="koperasi" className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <ScrollReveal className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex-1">
                <span className="section-eyebrow">{t(lang, "koperasi_eyebrow")}</span>
                <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}>
                  {t(lang, "koperasi_title1")}{" "}
                  <em className="not-italic" style={{ color: "#15803d" }}>{t(lang, "koperasi_title2")}</em>
                </h2>
                <p className="text-gray-500 mt-4 max-w-2xl text-lg leading-relaxed">
                  {t(lang, "koperasi_desc")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Products */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-green-700" />
                  {t(lang, "koperasi_produk")}
                </h3>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {KOPERASI_PRODUCTS.map((prod, i) => (
                  <ScrollReveal key={prod.id} delay={i * 0.06}>
                    <div
                      className="
                        kop-card
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:shadow-lg
                      "
                      onClick={() => router.push("/koperasi")}
                    >
                      <div className="text-3xl mb-3">{prod.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {prod.name[lang as keyof typeof prod.name]}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {prod.desc[lang as keyof typeof prod.desc]}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <div className="mt-10 flex flex-col items-start sm:items-start gap-2">
              <a href="/koperasi" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-md transition-colors flex-shrink-0">
                {t(lang, "koperasi_lihat_semua")} <ArrowRight className="w-6 h-6" />
              </a>
            </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <ScrollReveal>
                <div className="rounded-xl p-6 border border-green-100"
                     style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-700" />
                    {t(lang, "koperasi_benefit")}
                  </h3>
                  <ul className="space-y-3">
                    {KOPERASI_BENEFITS.map(b => (
                      <li key={b.id} className="flex items-start gap-2 text-sm text-green-800">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                        {b.text[lang as keyof typeof b.text]}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Hours */}
              <ScrollReveal delay={0.1}>
                <div className="rounded-xl p-6 bg-gray-50 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-700" />
                    {t(lang, "koperasi_jam")}
                  </h3>
                  <p className="text-gray-700 text-sm mb-1">{t(lang, "koperasi_jam_val")}</p>
                  <p className="text-gray-500 text-sm">{t(lang, "koperasi_jam_val2")}</p>
                </div>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal delay={0.15}>
                <div className="rounded-xl p-6 text-white"
                     style={{ background: "linear-gradient(135deg, #15803d, #16a34a)" }}>
                  <h3 className="text-lg font-semibold mb-3">{t(lang, "koperasi_cta")}</h3>
                  <p className="text-green-100 text-sm mb-4">Daftarkan diri Anda sebagai anggota koperasi Masjid Hidayatullah.</p>
                  <a href="#contact" className="inline-flex items-center gap-2 bg-white text-green-800 px-4 py-2 rounded text-sm font-semibold hover:bg-green-50 transition-colors">
                    {t(lang, "koperasi_hubungi")} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═══════════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-28 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left">
              <div className="flex-1">
                <span className="section-eyebrow">{t(lang, "gallery_eyebrow")}</span>
                <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}>
                  {t(lang, "gallery_title1")}{" "}
                  <em className="not-italic" style={{ color: "#15803d" }}>{t(lang, "gallery_title2")}</em>
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.06}
                            className={i === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""}>
                <div className="gallery-item" style={{ height: i === 0 ? "340px" : "160px" }}>
                  {/* Placeholder – replace with <Image> from Contentful */}
                  <div className="w-full h-full flex items-center justify-center"
                       style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}99)` }}>
                    <span className="text-4xl">🕌</span>
                  </div>
                  <div className="gallery-overlay">
                    <span className="text-white text-sm font-semibold text-center px-4">
                      {item.label[lang as keyof typeof item.label]}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
            <a href="/galeri" className="inline-flex mt-20 items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-md transition-colors flex-shrink-0">
              {t(lang, "gallery_lihat_semua")} <ArrowRight className="w-6 h-6" />
            </a>
        </div>
      </section>

      {/* ══ CTA BAND ══════════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
               style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 100%)" }}>
        <div className="absolute inset-0 islamic-pattern" />
        <div className="absolute left-0 top-0 bottom-0 w-1"
             style={{ background: "linear-gradient(to bottom, #4ade80, #22c55e)" }} />
        <ScrollReveal className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="section-eyebrow justify-center mx-auto" style={{ color: "#4ade80" }}>
            {t(lang, "cta_eyebrow")}
          </span>
          <h2 className="text-4xl md:text-5xl text-white mt-3 mb-5 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}>
            {t(lang, "cta_title1")}<br />
            <em className="not-italic" style={{ color: "#4ade80" }}>{t(lang, "cta_title2")}</em>
          </h2>
          <p className="text-green-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {t(lang, "cta_desc")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn-primary text-base px-8 py-4">
              {t(lang, "cta_btn1")} <ArrowRight className="w-4 h-4" />
            </a>
            <a href={`tel:${MOSQUE.PHONE}`} className="btn-gold text-base px-8 py-4">
              💰 {t(lang, "cta_btn2")}
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <ScrollReveal direction="left">
              <span className="section-eyebrow">{t(lang, "contact_eyebrow")}</span>
              <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}>
                {t(lang, "contact_title1")}{" "}
                <em className="not-italic" style={{ color: "#15803d" }}>{t(lang, "contact_title2")}</em>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">{t(lang, "contact_desc")}</p>
              <div className="space-y-5">
                {[
                  { icon: <MapPin className="w-4 h-4" style={{ color: "#15803d" }} />, label: t(lang, "contact_address"), content: <span className="text-gray-500 text-sm">{MOSQUE.ADDRESS}</span> },
                  { icon: <Phone className="w-4 h-4" style={{ color: "#15803d" }} />, label: t(lang, "contact_phone"), content: <a href={`tel:${MOSQUE.PHONE}`} className="text-gray-500 text-sm hover:text-green-700">{MOSQUE.PHONE}</a> },
                  { icon: <Mail className="w-4 h-4" style={{ color: "#15803d" }} />, label: t(lang, "contact_email"), content: <a href={`mailto:${MOSQUE.EMAIL}`} className="text-gray-500 text-sm hover:text-green-700">{MOSQUE.EMAIL}</a> },
                ].map(({ icon, label, content }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg"
                         style={{ background: "#f0fdf4" }}>
                      {icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-0.5">{label}</div>
                      {content}
                    </div>
                  </div>
                ))}

                {/* Social links */}
                <div className="pt-4 flex gap-4">
                  <a href={MOSQUE.FACEBOOK} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded transition-colors"
                     style={{ background: "#1877f2" }}>
                    <FacebookIcon className="w-4 h-4" /> Facebook
                  </a>
                  <a href={MOSQUE.INSTAGRAM} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded transition-colors"
                     style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t(lang, "contact_name")}</label>
                  <input type="text" className="form-input" placeholder={t(lang, "contact_placeholder_name")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t(lang, "contact_email")}</label>
                  <input type="email" className="form-input" placeholder={t(lang, "contact_placeholder_email")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t(lang, "contact_phone")}</label>
                  <input type="tel" className="form-input" placeholder="081 xxxx xxxx" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t(lang, "contact_msg")}</label>
                  <textarea className="form-input" rows={5} placeholder={t(lang, "contact_placeholder_msg")} />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                  {t(lang, "contact_send")} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  );
}