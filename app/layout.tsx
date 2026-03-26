import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Charta — ThinkCell for Google Slides",
  description:
    "Build waterfall, Mekko, and 10+ chart types natively in Google Slides. AI-powered. Free to start.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Charta",
  description:
    "ThinkCell-quality charts inside Google Slides. Build waterfall, Mekko, stacked bar, and 10+ chart types natively — AI-powered, no PowerPoint required.",
  url: "https://getcharta.ai",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Productivity",
  operatingSystem: "Web, Google Workspace",
  softwareVersion: "beta",
  inLanguage: "en",
  keywords:
    "Google Slides charts, waterfall chart, Mekko chart, ThinkCell alternative, consultant charts, presentation charts, AI chart generator",
  featureList: [
    "Waterfall charts",
    "Mekko charts",
    "Stacked bar charts",
    "10+ chart types",
    "AI-powered chart generation",
    "Google Sheets integration",
    "Native Google Slides Add-on",
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "5 AI credits/day, all chart types, unlimited manual edits",
    },
    {
      "@type": "Offer",
      name: "Plus",
      price: "9",
      priceCurrency: "USD",
      description:
        "20 AI credits/day, priority AI generation, Google Sheets integration",
    },
    {
      "@type": "Offer",
      name: "Business",
      price: "29",
      priceCurrency: "USD",
      description:
        "Unlimited AI credits, team sharing, Sheets import, Slides API access",
    },
  ],
  publisher: {
    "@type": "Organization",
    name: "Charta",
    url: "https://getcharta.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
