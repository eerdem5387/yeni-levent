import type { Metadata } from "next";
import { Hind, Lexend_Deca } from "next/font/google";
import "./globals.css";

const display = Lexend_Deca({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Hind({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Levent College Concept – Levent College",
    template: "%s | Levent College",
  },
  description:
    "Levent College Concept — akademik başarı, rehberlik ve karakter gelişimini bir arada sunan eğitim kurumu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
