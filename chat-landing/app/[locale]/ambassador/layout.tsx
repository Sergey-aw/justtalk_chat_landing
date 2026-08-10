import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ambassadorPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `https://justtalk.ai/${locale}/ambassador`,
      siteName: "JustTalk",
      images: [{ url: "/og_1.jpg" }],
    },
  };
}

export default function AmbassadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
