import type { Metadata, Viewport } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "NomorKu - Nomor Rumah Akrilik Premium & Estetik",
  description: "Ubah fasad rumah Anda menjadi karya seni minimalis. Nomor rumah custom dengan material premium yang tahan segala cuaca.",
  openGraph: {
    title: "NomorKu - Nomor Rumah Akrilik Premium",
    description: "Nomor rumah custom dengan material premium yang tahan segala cuaca.",
    url: "https://yourdomain.com",
    siteName: "NomorKu",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NomorKu",
    "image": "https://yourdomain.com/logo.png",
    "description": "Pembuat nomor rumah akrilik premium custom",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID"
    },
    "priceRange": "$$"
  };

  return (
    <html
      lang="id"
      className={`scroll-smooth ${notoSerif.variable} ${manrope.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-background text-on-surface font-body selection:bg-primary/20 min-h-full flex flex-col">
        <div className="fixed inset-0 grain-overlay z-[100]"></div>
        {children}
      </body>
    </html>
  );
}
