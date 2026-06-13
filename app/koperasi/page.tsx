"use client";
import { useState, useMemo, useEffect } from "react";
import { Search, ShoppingBag, Phone, Clock, Tag, Megaphone, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "../../components/LangContext";
import { t } from "../i18n";
import { PRODUK_LIST, PENGUMUMAN_LIST, KATEGORI_LIST, type KategoriKey } from "../data";
import { MOSQUE } from "../data";

const TIPE_BADGE: Record<string, { bg: string; text: string; label: { id: string; en: string; ko: string } }> = {
  promo:   { bg: "#fef9c3", text: "#a16207", label: { id: "Promo",     en: "Promo",       ko: "프로모션" } },
  info:    { bg: "#dbeafe", text: "#1e40af", label: { id: "Info",      en: "Info",        ko: "정보" } },
  penting: { bg: "#fee2e2", text: "#991b1b", label: { id: "Penting",   en: "Important",   ko: "중요" } },
};

export default function KoperasiPage() {
  const { lang } = useLang();
  const [activeKat, setActiveKat] = useState<KategoriKey>("semua");
  const [search, setSearch]       = useState("");
  const [produkCMS, setProdukCMS] = useState<any[] | null>(null);
  const [pengumumanCMS, setPengumumanCMS] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch dari Contentful
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, pengRes] = await Promise.all([
          fetch("/api/contentful/koperasi"),
          fetch("/api/contentful/pengumuman-koperasi")
        ]);
        
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProdukCMS(prodData);
        }
        
        if (pengRes.ok) {
          const pengData = await pengRes.json();
          setPengumumanCMS(pengData);
        }
      } catch (err) {
        console.error("Error fetching koperasi data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gunakan data dari Contentful jika ada isinya, jika kosong fallback ke data statis
  const displayProduk = produkCMS && produkCMS.length > 0 ? produkCMS : PRODUK_LIST;
  const displayPengumuman =
    pengumumanCMS && pengumumanCMS.length > 0 ? pengumumanCMS : PENGUMUMAN_LIST;

  const produkFiltered = useMemo(() => {
    return displayProduk.filter(p => {
      const matchKat  = activeKat === "semua" || p.kategori === activeKat;
      
      // Handle both static data (with localized names) and CMS data (with nama object)
      let nameLower = "";
      if (typeof p.nama === "string") {
        nameLower = p.nama.toLowerCase();
      } else if (p.nama && typeof p.nama === "object") {
        nameLower = (p.nama[lang as keyof typeof p.nama] || "").toLowerCase();
      }
      
      const matchSearch = search === "" || nameLower.includes(search.toLowerCase());
      return matchKat && matchSearch;
    });
  }, [activeKat, search, lang, displayProduk]);

  const pengumumanAktif = displayPengumuman.filter(p => p.aktif);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <div className="text-white py-16 px-6"
           style={{ background: "linear-gradient(135deg, #052e16 0%, #15803d 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-green-300 text-sm hover:text-white transition-colors mb-6">
            {t(lang, "kop_back")}
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                     style={{ background: "rgba(255,255,255,0.15)" }}>
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
                  Masjid Hidayatullah
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {t(lang, "kop_section_title1")}{" "}
                <em className="not-italic" style={{ color: "#4ade80" }}>{t(lang, "kop_section_title2")}</em>
              </h1>
              <p className="text-green-200 text-sm max-w-md">{t(lang, "kop_page_desc")}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-green-300" />
                <div>
                  <div className="text-green-200 text-xs">{t(lang, "koperasi_jam")}</div>
                  <div className="text-white font-medium">{t(lang, "koperasi_jam_val")}</div>
                </div>
              </div>
              <a href={`tel:${MOSQUE.PHONE}`}
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                <Phone className="w-4 h-4 text-green-300" />
                <div>
                  <div className="text-green-200 text-xs">{t(lang, "contact_phone")}</div>
                  <div className="text-white font-medium">{MOSQUE.PHONE}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Pengumuman / Promo ── */}
        {pengumumanAktif.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-5 h-5" style={{ color: "#15803d" }} />
              <h2 className="font-semibold text-gray-900">{t(lang, "kop_promo_title")}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pengumumanAktif.map(p => {
                // Determine badge style - for CMS data use tipe field, for static data use tipe
                const tipeField = p.tipe || "info";
                const badge = TIPE_BADGE[tipeField] ?? TIPE_BADGE.info;
                
                // Handle both static (localized) and CMS data
                const judulText = typeof p.judul === "string" 
                  ? p.judul 
                  : p.judul[lang as keyof typeof p.judul];
                const isiText = typeof p.isi === "string"
                  ? p.isi
                  : p.isi[lang as keyof typeof p.isi];
                
                return (
                  <div key={p.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                         style={{ background: badge.bg }}>
                      <Megaphone className="w-4 h-4" style={{ color: badge.text }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded"
                              style={{ background: badge.bg, color: badge.text }}>
                          {badge.label[lang as keyof typeof badge.label]}
                        </span>
                        <span className="text-gray-400 text-xs">{p.tanggal}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {judulText}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {isiText}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Filter + Search ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Kategori tabs */}
          <div className="flex flex-wrap gap-2 flex-1">
            {KATEGORI_LIST.map(kat => (
              <button key={kat.key}
                      onClick={() => setActiveKat(kat.key)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: activeKat === kat.key ? "#15803d" : "white",
                        color: activeKat === kat.key ? "white" : "#374151",
                        border: activeKat === kat.key ? "1px solid #15803d" : "1px solid #e5e7eb",
                        boxShadow: activeKat === kat.key ? "0 2px 8px rgba(21,128,61,0.3)" : undefined,
                      }}>
                <Tag className="w-3 h-3" />
                {kat.label[lang as keyof typeof kat.label]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                   placeholder={t(lang, "kop_search")}
                   className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm outline-none focus:border-green-500 bg-white w-full sm:w-56 transition-colors" />
          </div>
        </div>

        {/* ── Product Grid ── */}
        {produkFiltered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{t(lang, "kop_empty")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {produkFiltered.map(prod => {
              // Handle both static data (with localized names) and CMS data (with nama object)
              const nama = typeof prod.nama === "string"
                ? prod.nama
                : prod.nama[lang as keyof typeof prod.nama];
              const desc = typeof prod.deskripsi === "string"
                ? prod.deskripsi
                : prod.deskripsi[lang as keyof typeof prod.deskripsi];
              const katLabel = KATEGORI_LIST.find(k => k.key === prod.kategori)?.label[lang as keyof typeof KATEGORI_LIST[0]["label"]] ?? prod.kategori;

              return (
                <div key={prod.id}
                     className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">

                  {/* Image / Emoji area */}
                  {prod.gambarUrl ? (
                    <div className="h-36 overflow-hidden bg-gray-100">
                      <img
                        src={prod.gambarUrl}
                        alt={nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-36 flex items-center justify-center text-5xl"
                         style={{ background: prod.tersedia
                           ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
                           : "#f9fafb" }}>
                      {prod.emoji}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    {/* Kategori + stok badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">
                        {katLabel}
                      </span>
                      <span className={`flex items-center gap-1 text-xs font-medium ${prod.tersedia ? "text-green-600" : "text-red-400"}`}>
                        {prod.tersedia
                          ? <><CheckCircle className="w-3 h-3" />{t(lang, "kop_tersedia")}</>
                          : <><XCircle className="w-3 h-3" />{t(lang, "kop_stok_habis")}</>}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-snug">{nama}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-3">{desc}</p>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <div>
                        {prod.harga ? (
                          <div className="font-bold text-green-700 text-sm">{prod.harga}</div>
                        ) : (
                          <div className="text-gray-400 text-xs italic">{t(lang, "kop_price")}: —</div>
                        )}
                      </div>
                      <a href={`https://wa.me/${MOSQUE.PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(`Halo, saya ingin menanyakan produk: ${nama}`)}`}
                         target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-white"
                         style={{ background: prod.tersedia ? "#15803d" : "#9ca3af",
                                  pointerEvents: prod.tersedia ? undefined : "none" }}>
                        {t(lang, "kop_hubungi_beli")} <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Contentful note ── */}
        <div className="mt-16 p-6 rounded-xl border border-dashed border-green-200 bg-green-50 text-center">
          <p className="text-green-700 text-sm">
            💡 Konten produk dan pengumuman dapat dikelola melalui{" "}
            <a href="https://contentful.com" target="_blank" rel="noopener noreferrer"
               className="font-semibold underline hover:text-green-900">Contentful CMS</a>.
            {" "}Lihat <code className="bg-green-100 px-1 rounded text-xs">lib/contentful.ts</code> untuk panduan setup.
          </p>
        </div>
      </div>
    </div>
  );
}