import type { Metadata } from "next";
import { Hind_Vadodara, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const display = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const body = Hind_Vadodara({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Levent Koleji",
    template: "%s | Levent Koleji",
  },
  description:
    "Levent Koleji — akademik başarı, rehberlik ve karakter gelişimini bir arada sunan eğitim kurumu.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
