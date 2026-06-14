"use client";
import { useState, useEffect, useMemo } from "react";
import { BookOpen, Heart, Users, ShoppingBag, Zap } from "lucide-react";
import { useLang } from "../../components/LangContext";
import { t } from "../i18n";
import { PROGRAMS } from "../data";

type ProgramItem = {
  id: string;
  slug: string;
  title: { id: string; en: string; ko: string };
  description: { id: string; en: string; ko: string };
  icon: string;
  imageUrl: string | null;
  schedule?: { id: string; en: string; ko: string };
  aktif: boolean;
};

const PROGRAM_ICONS: Record<string, React.ReactNode> = {
  mosque:  <span className="text-3xl">🕌</span>,
  book:    <BookOpen className="w-8 h-8 text-green-700" />,
  school:  <span className="text-3xl">📖</span>,
  heart:   <Heart className="w-8 h-8 text-green-700" />,
  youth:   <Users className="w-8 h-8 text-green-700" />,
  store:   <ShoppingBag className="w-8 h-8 text-green-700" />,
  zap:     <Zap className="w-8 h-8 text-green-700" />,
};

export default function ProgramsPage() {
  const { lang } = useLang();
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("/api/contentful/programs");
        if (res.ok) {
          const data = await res.json();
          setPrograms(data);
        } else {
          const fallback = PROGRAMS.map(p => ({
            id: p.slug,
            slug: p.slug,
            title: p.title,
            description: p.description,
            icon: p.icon ?? "mosque",
            imageUrl: null,
            schedule: undefined,
            aktif: true,
          }));
          setPrograms(fallback);
        }
      } catch (err) {
        console.error("Error fetching programs:", err);
        const fallback = PROGRAMS.map(p => ({
          id: p.slug,
          slug: p.slug,
          title: p.title,
          description: p.description,
          icon: p.icon ?? "mosque",
          imageUrl: null,
          schedule: undefined,
          aktif: true,
        }));
        setPrograms(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

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
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
                  Masjid Hidayatullah
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {t(lang, "programs_title1")} <em className="not-italic" style={{ color: "#4ade80" }}>{t(lang, "programs_title2")}</em>
              </h1>
              <p className="text-green-200 text-sm max-w-md">{t(lang, "programs_desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading && (
          <div className="text-center py-20 text-gray-400">
            <Zap className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
            <p>{t(lang, "programs_loading")}</p>
          </div>
        )}

        {!loading && programs.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{t(lang, "programs_empty")}</p>
          </div>
        )}

        {!loading && programs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map(program => {
              const title = program.title[lang as keyof typeof program.title];
              const description = program.description[lang as keyof typeof program.description];
              const schedule = program.schedule?.[lang as keyof typeof program.schedule];
              const icon = PROGRAM_ICONS[program.icon] || PROGRAM_ICONS.mosque;

              return (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
                >
                  {program.imageUrl ? (
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={program.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                      <div className="text-center">
                        {icon}
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 leading-snug">
                      {title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                      {description}
                    </p>

                    {schedule && (
                      <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-xs text-green-700 font-semibold">{t(lang, "programs_schedule")}</p>
                        <p className="text-sm text-green-900 mt-1">{schedule}</p>
                      </div>
                    )}

                    <a href="#contact" className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors">
                      {t(lang, "programs_learn_more")} →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 p-6 rounded-xl border border-dashed border-green-200 bg-green-50 text-center">
          <p className="text-green-700 text-sm">
            💡 {t(lang, "programs_contentful_note")} <a href="https://contentful.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-green-900">Contentful CMS</a>. {t(lang, "programs_contentful_guide")} <code className="bg-green-100 px-1 rounded text-xs">lib/contentful.ts</code>.
          </p>
        </div>
      </div>
    </div>
  );
}