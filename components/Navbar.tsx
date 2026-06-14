"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "./LangContext";
import { t } from "../app/i18n";
import type { Lang } from "../app/i18n";

const LANGS: { code: Lang; label: string }[] = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "ko", label: "한국어" },
];

// Nav links: href = page path, anchor = section id on home page (if any)
const links: { href: string; anchor?: string; key: keyof typeof import("../app/i18n").TRANSLATIONS.id }[] = [
  { href: "/",           anchor: "about",   key: "nav_about"      },
  { href: "/programs",                      key: "nav_services"   },
  { href: "/pengumuman",                    key: "nav_pengumuman" },
  { href: "/",           anchor: "jadwal",  key: "nav_jadwal"     },
  { href: "/koperasi",                      key: "nav_koperasi"   },
  { href: "/galeri",                        key: "nav_gallery"    },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const { lang, setLang }           = useLang();
  const router                      = useRouter();
  const pathname                    = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to anchor after navigation (handles cross-page anchor links)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
    const tryScroll = (attempts = 0) => {
      const target = document.getElementById(id);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };
    tryScroll();
  }, [pathname]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    anchor?: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);

    if (anchor) {
      if (pathname === "/") {
        // Already on home — scroll directly
        const target = document.getElementById(anchor);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      } else {
        // Navigate to home then scroll via hash
        router.push(`/#${anchor}`);
      }
    } else {
      router.push(href);
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    if (pathname === "/") {
      const target = document.getElementById("contact");
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      router.push("/#contact");
    }
  };

  const getHref = (href: string, anchor?: string) =>
    anchor ? (href === "/" ? `/#${anchor}` : href) : href;

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="w-full px-4 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-15 h-15 flex items-center justify-center flex-shrink-0 rounded-full">
            <img
              src="/mosque_logo.png"
              alt="Logo Masjid Hidayatullah"
              className="w-15 h-15 flex-shrink-0 object-contain"
            />
          </div>
          <div className="leading-tight">
            <div
              className={`font-semibold text-sm tracking-wide transition-colors duration-300${
                scrolled ? " text-green-800" : " text-white"
              }`}
            >
              Masjid Hidayatullah
            </div>
            <div
              className={`text-xs transition-colors duration-300${
                scrolled ? " text-green-600" : " text-white/60"
              }`}
            >
              Jangnim, Busan
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(({ href, anchor, key }) => (
            <a
              key={key}
              href={getHref(href, anchor)}
              className="nav-link"
              onClick={(e) => handleClick(e, href, anchor)}
            >
              {t(lang, key)}
            </a>
          ))}

          {/* Language switcher */}
          <div className="relative">
            <button
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded transition-all${
                scrolled
                  ? " text-green-700 hover:bg-green-50"
                  : " text-white/80 hover:text-white"
              }`}
              onClick={() => setLangOpen((v) => !v)}
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg rounded py-1 z-50 min-w-[90px]">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 transition-colors${
                      lang === code
                        ? " text-green-700 font-semibold"
                        : " text-gray-700"
                    }`}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="/#contact"
            className="px-5 py-2.5 text-white text-sm font-semibold transition-colors duration-200 rounded"
            style={{ background: "#15803d" }}
            onClick={handleContactClick}
          >
            {t(lang, "nav_cta")}
          </a>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="relative">
            <button
              className={`flex items-center gap-1 text-sm px-2 py-1 rounded${
                scrolled ? " text-green-700" : " text-white"
              }`}
              onClick={() => setLangOpen((v) => !v)}
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg rounded py-1 z-50 min-w-[80px]">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-green-50${
                      lang === code
                        ? " text-green-700 font-semibold"
                        : " text-gray-700"
                    }`}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="p-2"
            style={{ color: scrolled ? "#15803d" : "white" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
          <div className="flex flex-col gap-1 pt-4 px-6">
            {links.map(({ href, anchor, key }) => (
              <a
                key={key}
                href={getHref(href, anchor)}
                className="nav-link py-2.5 border-b border-white/10 last:border-0"
                onClick={(e) => handleClick(e, href, anchor)}
              >
                {t(lang, key)}
              </a>
            ))}

            {/* Hubungi Kami button — mobile only */}
            <a
              href="/#contact"
              className="mt-3 px-5 py-2.5 text-center text-white text-sm font-semibold rounded transition-colors duration-200"
              style={{ background: "#15803d" }}
              onClick={handleContactClick}
            >
              {t(lang, "nav_cta")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}