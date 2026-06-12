"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "../app/i18n";

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; }
const Ctx = createContext<LangCtx>({ lang: "id", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }
