import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import { GoTracker } from "./GoTracker";
import { InAppEscape } from "./InAppEscape";

const APP_STORE_URL = "https://apps.apple.com/app/id6760475574";
const WEB_APP_URL = "https://chat.justtalk.ai";
const APP_ICON = "/justtalk_icon_appstore-iOS-Default-1024x1024@1x.png";

type Platform = "ios" | "android" | "other";

function detectPlatform(userAgent: string): Platform {
  if (/iphone|ipad|ipod/i.test(userAgent)) return "ios";
  if (/android/i.test(userAgent)) return "android";
  return "other";
}

// In-app browsers (TikTok, Instagram, Facebook, etc.) run inside a restricted
// WKWebView that refuses to hand `apps.apple.com` links off to the App Store
// — the tap fails with "Action can't be completed". We detect these so iOS
// users can be bounced out to real Safari first.
function isInAppBrowser(userAgent: string): boolean {
  return /FBAN|FBAV|FB_IAB|Instagram|musical_ly|Bytedance|TikTok|Trill|Snapchat|Pinterest|LinkedInApp|MicroMessenger|Line\/|WhatsApp|GSA/i.test(
    userAgent,
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
  );
}

export default async function Go({
  searchParams,
}: {
  searchParams: Promise<{ dl?: string }>;
}) {
  const h = await headers();
  const userAgent = h.get("user-agent") ?? "";
  const platform = detectPlatform(userAgent);
  const inApp = isInAppBrowser(userAgent);
  const { dl } = await searchParams;

  // Arrived in real Safari via the in-app escape (?dl=1) — now that the App
  // Store hand-off works, send the user straight there.
  if (dl === "1" && platform === "ios" && !inApp) {
    redirect(APP_STORE_URL);
  }

  // Absolute URL that the `x-safari-https://` scheme reopens in real Safari.
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "justtalk.ai";
  const escapeUrl = `x-safari-https://${host}/go?dl=1`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-just_white px-6 py-12">
      <GoTracker platform={platform} inApp={inApp} />
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <Image
          src={APP_ICON}
          alt="JustTalk"
          width={120}
          height={120}
          priority
          className="rounded-[26px] shadow-lg"
        />

        <h1 className="mt-7 text-3xl font-semibold tracking-[-0.5px] text-just_cod-gray">
          JustTalk
        </h1>

        {platform === "ios" && inApp && (
          <>
            <p className="mt-3 text-base leading-normal tracking-[-0.17px] text-just_scorpion">
              Practice speaking with AI. Tap below to open in Safari and install
              the app.
            </p>
            <InAppEscape escapeUrl={escapeUrl} />
          </>
        )}

        {platform === "ios" && !inApp && (
          <>
            <p className="mt-3 text-base leading-normal tracking-[-0.17px] text-just_scorpion">
              Practice speaking with AI. Download the app for iPhone and iPad.
            </p>
            <TrackedLink
              href={APP_STORE_URL}
              eventName="go_redirect_clicked"
              eventProperties={{ platform: "ios", target: "app_store" }}
              className="mt-8 w-full"
            >
              <Button size="lg" className="w-full cursor-pointer">
                <AppleIcon />
                Download
              </Button>
            </TrackedLink>
          </>
        )}

        {platform === "android" && (
          <>
            <p className="mt-3 text-base leading-normal tracking-[-0.17px] text-just_scorpion">
              Practice speaking with AI. Open JustTalk right in your browser.
            </p>
            <TrackedLink
              href={WEB_APP_URL}
              eventName="go_redirect_clicked"
              eventProperties={{ platform: "android", target: "web_app" }}
              className="mt-8 w-full"
            >
              <Button size="lg" className="w-full cursor-pointer">
                Open web app
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
              </Button>
            </TrackedLink>
          </>
        )}

        {platform === "other" && (
          <>
            <p className="mt-3 text-base leading-normal tracking-[-0.17px] text-just_scorpion">
              Practice speaking with AI. Get the iOS app or open JustTalk in your browser.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3">
              <TrackedLink
                href={APP_STORE_URL}
                eventName="go_redirect_clicked"
                eventProperties={{ platform: "other", target: "app_store" }}
                className="w-full"
              >
                <Button size="lg" className="w-full cursor-pointer">
                  <AppleIcon />
                  Download for iPhone
                </Button>
              </TrackedLink>
              <TrackedLink
                href={WEB_APP_URL}
                eventName="go_redirect_clicked"
                eventProperties={{ platform: "other", target: "web_app" }}
                className="w-full"
              >
                <Button variant="outline" size="lg" className="w-full cursor-pointer">
                  Open web app
                </Button>
              </TrackedLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
