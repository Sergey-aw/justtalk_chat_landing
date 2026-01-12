import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: "./assets/inter_tight-var.ttf",
  variable: "--font-inter-tight",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JustTalk - AI-Powered Language Learning",
  description: "Next-generation AI-powered language learning classroom with real-time analytics for ESL teachers and students",
  authors: [{ name: "JustTalk" }],
  openGraph: {
    title: "JustTalk - AI-Powered Language Learning",
    description: "Next-generation AI-powered language learning classroom with real-time analytics for ESL teachers and students",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/vsWUyi8lgTNtEQSKxsBAf0Ssip92/social-images/social-1758484251747-BBJp4i6VeW2gRDoR6RkwAOAO4.png.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@JustTalkApp",
    images: [
      "https://storage.googleapis.com/gpt-engineer-file-uploads/vsWUyi8lgTNtEQSKxsBAf0Ssip92/social-images/social-1758484251747-BBJp4i6VeW2gRDoR6RkwAOAO4.png.webp",
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
