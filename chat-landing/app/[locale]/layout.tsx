import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";
import { locales, type Locale } from '@/i18n/config';

const interTight = localFont({
  src: "../assets/inter_tight-var.ttf",
  variable: "--font-inter-tight",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://justtalk.ai'),
  title: "JustTalk - AI-Powered Language Learning",
  description: "Practice speaking inside realistic scenarios with AI-enhanced personalities.",
  authors: [{ name: "JustTalk" }],
  itunes: {
    appId: "6760475574",
  },
  openGraph: {
    title: "JustTalk - AI-Powered Language Learning",
    description: "Practice speaking inside realistic scenarios. Our AI personalities remember previous conversations, allowing you to pick up right where you left off.",
    type: "website",
    url: "https://justtalk.ai",
    siteName: "JustTalk",
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
        <link rel="preconnect" href="https://us-assets.i.posthog.com" />
        <link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />
      </head>
      <body
        className={`${interTight.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
