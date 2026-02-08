import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: "./assets/inter_tight-var.ttf",
  variable: "--font-inter-tight",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://justtalk.ai'),
  title: "JustTalk - AI-Powered Language Learning",
  description: "Practice speaking inside realistic scenarios with AI-enhanced personalities.",
  authors: [{ name: "JustTalk" }],
  openGraph: {
    title: "JustTalk - AI-Powered Language Learning",
    description: "Practice speaking inside realistic scenarios. Our AI personalities remember previous conversations, allowing you to pick up right where you left off.",
    type: "website",
    images: [
      {
        url: "/og_1.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@JustTalkApp",
    images: [
      "/og_1.jpg",
    ],
  },
  icons: {
    icon: "/justtalk-favicon.png",
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
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
        <link rel="preconnect" href="https://us-assets.i.posthog.com" />
        <link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />
      </head>
      <body
        className={`${interTight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
