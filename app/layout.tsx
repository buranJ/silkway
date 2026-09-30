import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionShell } from "@/components/MotionShell";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://silkway.kg"),
  title: { default: "Silk Way — индустриальный парк в Кыргызстане", template: "%s | Silk Way" },
  description: "Многопрофильный промышленно-торговый комплекс Silk Way: торговые, тканевые, промышленные и жилые объекты.",
  openGraph: {
    title: "Silk Way — индустриальный парк",
    description: "Масштабная территория для бизнеса, производства, торговли и жизни.",
    type: "website",
    locale: "ru_KG",
    images: [{ url: "/assets/photo/hero-1.jpg", width: 2400, height: 1350, alt: "Индустриальный парк Silk Way" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <MotionShell>
          <Header />
          {children}
          <Footer />
        </MotionShell>
      </body>
    </html>
  );
}
