"use client";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLang } from "./LangContext";
import { t } from "../app/i18n";
import { MOSQUE, PROGRAMS } from "../app/data";

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

export default function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="text-gray-400" style={{ background: "#031c0e" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-5">
              <div className="w-13 h-13 flex items-center justify-center rounded-full flex-shrink-0">
                <img 
                  src="/mosque_logo.png" 
                  alt="Logo Masjid Hidayatullah" 
                  className="w-15 h-15 flex-shrink-0 object-contain"
                />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Masjid Hidayatullah</div>
                <div className="text-xs text-green-500">DKM Hidayatullah</div>
              </div>
            </a>
            <p className="text-sm leading-relaxed text-green-700 max-w-xs mb-6">
              {t(lang, "footer_tagline")}
            </p>

            <div className="mb-4">
              <p className="text-xs text-white uppercase font-semibold tracking-wider mb-3">
                {t(lang, "footer_social")}
              </p>
              <div className="flex gap-3">
                <a href={MOSQUE.FACEBOOK} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 border border-green-700 hover:border-green-400"
                   aria-label="Facebook DKM Hidayatullah">
                  <FacebookIcon className="w-4 h-4 text-green-700" />
                </a>
                <a href={MOSQUE.INSTAGRAM} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 border border-green-700 hover:border-green-400"
                   aria-label="Instagram DKM Hidayatullah">
                  <InstagramIcon className="w-4 h-4 text-green-700" />
                </a>
              </div>
            </div>

            <p className="text-xs text-green-700">
              Est. {MOSQUE.FOUNDED} · {MOSQUE.LOCATION}
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t(lang, "footer_program")}</h4>
            <ul className="space-y-2.5 text-sm">
              {PROGRAMS.map(p => (
                <li key={p.slug}>
                  <a href="/programs" className="text-green-700 hover:text-green-400 transition-colors">
                    {p.title[lang as keyof typeof p.title]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{t(lang, "footer_links")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-700" />
                <span className="leading-relaxed text-green-700">{MOSQUE.ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0 text-green-700" />
                <a href={`tel:${MOSQUE.PHONE}`} className="text-green-700 hover:text-green-400 transition-colors">
                  {MOSQUE.PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0 text-green-700" />
                <a href={`mailto:${MOSQUE.EMAIL}`} className="text-green-700 hover:text-green-400 transition-colors">
                  {MOSQUE.EMAIL}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-green-900"
             style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p>&copy; {year} {t(lang, "footer_copy")}</p>
          <p>{MOSQUE.LOCATION}</p>
        </div>
      </div>
    </footer>
  );
}