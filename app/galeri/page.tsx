"use client";
import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useLang } from "../../components/LangContext";
import { t } from "../i18n";
import { GALLERY_ITEMS } from "../data";

type GalleryItem = {
  id: string;
  title: string;
  imageUrl: string | null;
  category: string;
};

export default function GaleriPage() {
  const { lang } = useLang();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/contentful/gallery");
        if (res.ok) {
          const data = await res.json();
          setGallery(data);
        } else {
          const fallback = GALLERY_ITEMS.map((item, idx) => ({
            id: item.id,
            title: item.label[lang as keyof typeof item.label],
            imageUrl: null,
            category: item.label[lang as keyof typeof item.label],
          }));
          setGallery(fallback);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
        const fallback = GALLERY_ITEMS.map((item) => ({
          id: item.id,
          title: item.label[lang as keyof typeof item.label],
          imageUrl: null,
          category: item.label[lang as keyof typeof item.label],
        }));
        setGallery(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [lang]);

  const filtered = useMemo(() => {
    return gallery.filter(item => !selectedCat || item.category === selectedCat);
  }, [gallery, selectedCat]);

  const categories = useMemo(() => {
    const cats = new Set(gallery.map(item => item.category));
    return Array.from(cats).sort();
  }, [gallery]);

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
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
                  Masjid Hidayatullah
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {t(lang, "galeri_page_title1")} <em className="not-italic" style={{ color: "#4ade80" }}>{t(lang, "galeri_page_title2")}</em>
              </h1>
              <p className="text-green-200 text-sm max-w-md">{t(lang, "galeri_page_desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {categories.length > 0 && (
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-3 font-medium">{t(lang, "galeri_filter_label")}</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCat(null)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: !selectedCat ? "#15803d" : "white",
                  color: !selectedCat ? "white" : "#374151",
                  border: !selectedCat ? "1px solid #15803d" : "1px solid #e5e7eb",
                  boxShadow: !selectedCat ? "0 2px 8px rgba(21,128,61,0.3)" : undefined,
                }}
              >
                {t(lang, "galeri_filter_all")}
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: selectedCat === cat ? "#15803d" : "white",
                    color: selectedCat === cat ? "white" : "#374151",
                    border: selectedCat === cat ? "1px solid #15803d" : "1px solid #e5e7eb",
                    boxShadow: selectedCat === cat ? "0 2px 8px rgba(21,128,61,0.3)" : undefined,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-20 text-gray-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p>{t(lang, "galeri_loading")}</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{t(lang, "galeri_empty")}</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(item => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg bg-gray-200 aspect-square cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-green-300">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {selectedImage.imageUrl ? (
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-gray-800 rounded-lg">
                <ImageIcon className="w-16 h-16 text-gray-600" />
              </div>
            )}
            <div className="mt-4 text-white">
              <h2 className="text-xl font-bold">{selectedImage.title}</h2>
              <p className="text-sm text-gray-300 mt-1">{selectedImage.category}</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="mt-16 max-w-7xl mx-auto px-6 p-6 rounded-xl border border-dashed border-green-200 bg-green-50 text-center">
        <p className="text-green-700 text-sm">
          💡 {t(lang, "galeri_contentful_note")} <a href="https://contentful.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-green-900">Contentful CMS</a>. {t(lang, "galeri_contentful_guide")} <code className="bg-green-100 px-1 rounded text-xs">lib/contentful.ts</code>.
        </p>
      </div>
    </div>
  );
}