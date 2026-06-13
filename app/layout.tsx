import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "../components/LangContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Masjid Hidayatullah – Jangnim, Busan",
  description: "Website resmi Masjid Hidayatullah Jangnim. Pusat ibadah, pendidikan, dan kegiatan sosial komunitas muslim di Jangnim Korea Selatan.",
  openGraph: {
    title: "Masjid Hidayatullah – Jangnim, Busan",
    description: "Pusat ibadah, pendidikan, dan kegiatan sosial masyarakat.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <LangProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}