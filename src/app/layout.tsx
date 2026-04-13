import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/Navigation/Navbar";
import { Footer } from "@/components/Footer/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "22nd Avenue — Creative Talent Management",
    template: "%s | 22nd Avenue",
  },
  description:
    "Where Talent Meets The Spotlight. 22nd Avenue is a creative talent management agency specializing in artist management, brand collaborations, live events, and entertainment-led partnerships.",
  keywords: [
    "talent management",
    "creative agency",
    "artist management",
    "brand collaborations",
    "live events",
    "entertainment",
    "22nd Avenue",
  ],
  authors: [{ name: "22nd Avenue Creative Talent Management" }],
  openGraph: {
    title: "22nd Avenue — Creative Talent Management",
    description:
      "Where Talent Meets The Spotlight. Creative talent management for artists, brands, and live entertainment.",
    url: "https://22ndavenue.com",
    siteName: "22nd Avenue",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "22nd Avenue — Creative Talent Management",
    description:
      "Where Talent Meets The Spotlight. Creative talent management for artists, brands, and live entertainment.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
