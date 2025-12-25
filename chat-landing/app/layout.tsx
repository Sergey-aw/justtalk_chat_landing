import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: "./assets/inter_tight-var.ttf",
  variable: "--font-inter-tight",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JustTalk AI - Get Better at Speaking by Speaking",
  description: "Natural voice conversations that help you improve as you talk. Join the JustTalk platform for one-on-one English learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
