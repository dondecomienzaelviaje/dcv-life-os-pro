import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const DESCRIPCION =
  "Organiza tareas, hábitos, metas y finanzas en un solo lugar. Gratis con tu cuenta DCV ID.";

export const metadata: Metadata = {
  metadataBase: new URL("https://life.dcvcorp.com"),
  title: {
    default: "DCV LIFE OS: tu sistema operativo personal",
    template: "%s | DCV LIFE OS",
  },
  description: DESCRIPCION,
  applicationName: "DCV LIFE OS",
  openGraph: {
    title: "DCV LIFE OS: tu sistema operativo personal",
    description: DESCRIPCION,
    url: "/",
    siteName: "DCV LIFE OS",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DCV LIFE OS: tu sistema operativo personal",
    description: DESCRIPCION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body
          className={`${spaceGrotesk.variable} ${manrope.variable} font-body antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}