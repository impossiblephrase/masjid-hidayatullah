"use client";
import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Calendar, Tag, Image as ImageIcon, Megaphone } from "lucide-react";
import Link from "next/link";
import { useLang } from "../../components/LangContext";
import { t } from "../i18n";
import { PENGUMUMAN_MASJID } from "../data";

type AnnouncementWithImage = {
  id: string;
  judul: { id: string; en: string; ko: string };
  isi: { id: string; en: string; ko: string };
  tanggal: string;
  kategori: "kajian" | "sosial" | "kegiatan" | "umum";
  pinned: boolean;
  aktif: boolean;
  gambar?: string;
};

const KATEGORI_STYLE: Record<string, { bg: string; text: string; icon: string; label: { id: string; en: string; ko: string } }> = {
  kajian:   { bg: "#dbeafe", text: "#1e40af", icon: "📖", label: { id: "Kajian", en: "Study Circle", ko: "학습 모임" } },
  sosial:   { bg: "#fce7f3", text: "#9d174d", icon: "❤️", label: { id: "Sosial", en: "Social", ko: "사회" } },
  kegiatan: { bg: "#fef9c3", text: "#a16207", icon: "📅", label: { id: "Kegiatan", en: "Events", ko: "행사" } },
  umum:     { bg: "#f3f4f6", text: "#374151", icon: "📢", label: { id: "Umum", en: "General", ko: "일반" } },
};

export default function PengumumanPage() {
  const { lang } = useLang();
  const [pengumuman, setPengumuman] = useState<AnnouncementWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKat, setSelectedKat] = useState<string | null>(null);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const res = await fetch("/api/contentful/pengumuman");
        if (res.ok) {
          const data = await res.json();
          setPengumuman(data);
        } else {
          setPengumuman(PENGUMUMAN_MASJID as AnnouncementWithImage[]);
        }
      } catch (err) {
        console.error("Error fetching pengumuman:", err);
        setPengumuman(PENGUMUMAN_MASJID as AnnouncementWithImage[]);
      } finally {
        setLoading(false);
      }
    };

    fetchPengumuman();
  }, []);

  const filtered = useMemo(() => {
    return pengumuman
      .filter(p => p.aktif)
      .filter(p => !selectedKat || p.kategori === selectedKat)
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
        return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
      });
  }, [pengumuman, selectedKat]);

  const categories = useMemo(() => {
    const cats = new Set(pengumuman.filter(p => p.aktif).map(p => p.kategori));
    return Array.from(cats);
  }, [pengumuman]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white py-36 px-6"
           style={{ background: "linear-gradient(135deg, #052e16 0%, #15803d 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                     style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Megaphone className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
                  Masjid Hidayatullah
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {t(lang, "pengumuman_page_title1")} <em className="not-italic" style={{ color: "#4ade80" }}>{t(lang, "pengumuman_page_title2")}</em>
              </h1>
              <p className="text-green-200 text-sm max-w-md">{t(lang, "pengumuman_page_desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedKat(null)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: !selectedKat ? "#15803d" : "white",
                  color: !selectedKat ? "white" : "#374151",
                  border: !selectedKat ? "1px solid #15803d" : "1px solid #e5e7eb",
                  boxShadow: !selectedKat ? "0 2px 8px rgba(21,128,61,0.3)" : undefined,
                }}
              >
                {t(lang, "pengumuman_filter_all")}
              </button>
              {categories.map(kat => {
                const style = KATEGORI_STYLE[kat];
                return (
                  <button
                    key={kat}
                    onClick={() => setSelectedKat(kat)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5"
                    style={{
                      background: selectedKat === kat ? style.bg : "white",
                      color: selectedKat === kat ? style.text : "#374151",
                      border: selectedKat === kat ? `1px solid ${style.text}` : "1px solid #e5e7eb",
                      boxShadow: selectedKat === kat ? `0 2px 8px ${style.bg}` : undefined,
                    }}
                  >
                    <span>{style.icon}</span>
                    {style.label[lang as keyof typeof style.label]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-20 text-gray-400">
            <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p>{t(lang, "pengumuman_loading")}</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{t(lang, "pengumuman_empty")}</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map(item => {
              const style = KATEGORI_STYLE[item.kategori] ?? KATEGORI_STYLE.umum;
              const judul = item.judul[lang as keyof typeof item.judul];
              const isi = item.isi[lang as keyof typeof item.isi];
              const katLabel = style.label[lang as keyof typeof style.label];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
                >
                  {item.gambar ? (
                    <div className="h-48 overflow-hidden bg-gray-100 relative">
                      <img
                        src={item.gambar}
                        alt={judul}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {item.pinned && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                             style={{ background: "#fef9c3", color: "#a16207" }}>
                          ⭐ {t(lang, "pengumuman_pinned")}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">{t(lang, "pengumuman_no_image")}</p>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                            style={{ background: style.bg, color: style.text }}>
                        <span>{style.icon}</span>
                        {katLabel}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.tanggal).toLocaleDateString(lang === "id" ? "id-ID" : lang === "ko" ? "ko-KR" : "en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2 leading-snug line-clamp-2">
                      {judul}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                      {isi}
                    </p>

                    <a href="#" className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors">
                      {t(lang, "pengumuman_read_more")} →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 p-6 rounded-xl border border-dashed border-green-200 bg-green-50 text-center">
          <p className="text-green-700 text-sm">
            💡 {t(lang, "pengumuman_contentful_note")} <a href="https://contentful.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-green-900">Contentful CMS</a>. {t(lang, "pengumuman_contentful_guide")} <code className="bg-green-100 px-1 rounded text-xs">lib/contentful.ts</code>.
          </p>
        </div>
      </div>
    </div>
  );
}