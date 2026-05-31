# Implementation Plan: ChatGPT-Style i18n with next-intl

## Overview

This document outlines the implementation of a professional internationalization (i18n) solution for the JustTalk landing page, following the same URL-based locale pattern used by ChatGPT (e.g., `/ru-RU/page/`, `/es-ES/page/`).

## Current State Analysis

### Existing Setup
- **Framework**: Next.js 16.1.1 with App Router
- **React**: 19.2.3
- **Current Language Selector**: Static button in [`Footer.tsx`](chat-landing/components/Footer.tsx:77) showing "English (US)" with no functionality
- **Pages to Translate**:
  - [`app/page.tsx`](chat-landing/app/page.tsx) - Main landing page (~23KB of content)
  - [`app/platform/page.tsx`](chat-landing/app/platform/page.tsx) - Tutors platform page (~31KB)
  - [`app/becometeacher/page.tsx`](chat-landing/app/becometeacher/page.tsx) - Teacher signup page (~13KB)
  - [`app/terms/page.tsx`](chat-landing/app/terms/page.tsx) - Terms of Use (~29KB)
- **Components with Text**: Header, Footer, PricingSection, various carousels and UI elements

### Text Content Categories
1. **Navigation**: Menu items, buttons, links
2. **Hero Section**: Headlines, subheadlines, CTAs
3. **Feature Descriptions**: Titles and explanations
4. **Pricing**: Plans, features, pricing text
5. **Legal**: Terms of Use, Privacy Policy
6. **UI Elements**: Buttons, labels, error messages

---

## Recommended Solution: next-intl

### Why next-intl?
- **Native App Router Support**: Built specifically for Next.js App Router
- **URL-based Routing**: `/en-US/`, `/ru-RU/`, `/es-ES/` patterns
- **Server Components**: Full support for RSC
- **SEO Optimized**: Automatic hreflang tags, localized metadata
- **Lightweight**: Tree-shakeable, minimal bundle impact
- **Active Maintenance**: 1.5k+ GitHub stars, regular updates

### Alternative Considered
| Library | Pros | Cons |
|---------|------|------|
| **next-intl** | App Router native, URL routing, RSC support | Learning curve |
| next-i18next | Mature, large community | Pages Router focused, complex setup |
| next-translate | Simple, lightweight | Less features for App Router |
| paraglide-next | Type-safe, minimal | Newer, smaller community |

---

## Architecture Design

### URL Structure
```
justtalk.ai/              → redirects to /en-US/
justtalk.ai/en-US/        → English (default)
justtalk.ai/ru-RU/        → Russian
justtalk.ai/es-ES/        → Spanish
justtalk.ai/pt-BR/        → Portuguese (Brazil)
justtalk.ai/zh-CN/        → Chinese (Simplified)
justtalk.ai/ja-JP/        → Japanese
```

### Directory Structure
```
chat-landing/
├── app/
│   └── [locale]/           # Locale dynamic segment
│       ├── layout.tsx      # Locale-aware layout
│       ├── page.tsx        # Localized home
│       ├── platform/
│       │   └── page.tsx    # Localized platform
│       ├── becometeacher/
│       │   └── page.tsx    # Localized teacher signup
│       └── terms/
│           └── page.tsx    # Localized terms
├── messages/               # Translation files
│   ├── en-US.json
│   ├── ru-RU.json
│   ├── es-ES.json
│   ├── pt-BR.json
│   ├── zh-CN.json
│   └── ja-JP.json
├── i18n/
│   ├── config.ts           # Locale configuration
│   ├── routing.ts          # Next-intl routing setup
│   └── request.ts          # Request handler
└── middleware.ts           # Locale detection & redirect
```

---

## Implementation Steps

### Phase 1: Setup and Configuration

#### Step 1.1: Install Dependencies
```bash
npm install next-intl
```

#### Step 1.2: Create i18n Configuration
Create `i18n/config.ts`:
```typescript
export const locales = ['en-US', 'ru-RU', 'es-ES', 'pt-BR', 'zh-CN', 'ja-JP'] as const;
export const defaultLocale = 'en-US';
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  'en-US': 'English (US)',
  'ru-RU': 'Русский',
  'es-ES': 'Español',
  'pt-BR': 'Português (BR)',
  'zh-CN': '简体中文',
  'ja-JP': '日本語',
};
```

#### Step 1.3: Create Routing Configuration
Create `i18n/routing.ts`:
```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter, getPathname } = 
  createNavigation(routing);
```

#### Step 1.4: Create Request Handler
Create `i18n/request.ts`:
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

#### Step 1.5: Create Middleware
Create `middleware.ts` (root level):
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
```

#### Step 1.6: Update Next.js Config
Update `next.config.ts`:
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // existing config
};

export default withNextIntl(nextConfig);
```

---

### Phase 2: Restructure App Directory

#### Step 2.1: Move Pages to [locale] Directory
Move all page files:
```
app/page.tsx          → app/[locale]/page.tsx
app/platform/page.tsx → app/[locale]/platform/page.tsx
app/becometeacher/    → app/[locale]/becometeacher/
app/terms/            → app/[locale]/terms/
```

#### Step 2.2: Update Root Layout
Create `app/[locale]/layout.tsx`:
```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

### Phase 3: Create Translation Files

#### Step 3.1: Extract All Text Content
Create `messages/en-US.json` with all extracted text:

```json
{
  "metadata": {
    "title": "JustTalk - AI-Powered Language Learning",
    "description": "Practice speaking inside realistic scenarios with AI-enhanced personalities."
  },
  "nav": {
    "justtalkAi": "JustTalk AI",
    "justtalkTutors": "JustTalk Tutors",
    "becomeTeacher": "Become a Teacher",
    "login": "Log in",
    "signup": "Sign up",
    "apply": "Apply"
  },
  "hero": {
    "headline": "Build real speaking confidence in English",
    "subheadline": "Practice English through realistic conversations with AI that remembers how you speak and builds every session on the last.",
    "getStarted": "Get Started"
  },
  "features": {
    "platform": {
      "title": "Talking works—when it's tracked",
      "description": "Most speaking tools let you talk but don't track real progress. JustTalk AI analyzes what you say and builds every session on your history—so improvement is cumulative, not random."
    },
    "exploreMore": "Explore more features in JustTalk AI",
    "improvement": {
      "title": "How improvement actually happens",
      "description": "One conversation doesn't change much. But when every session is tracked, understood, and used to shape the next one, progress compounds naturally."
    },
    "personalities": {
      "title": "Talk with different personalities",
      "description": "Some are supportive. Some challenge you. All help you practice real conversations"
    },
    "memory": {
      "title": "They remember you",
      "description": "Our AI personalities remember previous conversations, allowing you to pick up right where you left off."
    },
    "scenarios": {
      "title": "Practice speaking inside realistic scenarios",
      "description": "Choose the situation, the role, and the difficulty—and build skill inside a consistent context."
    },
    "roleplay": {
      "title": "Ongoing roleplay with memory and personality",
      "description": "Some scenarios unfold over multiple sessions. This isn't one-off roleplay. It's sustained speaking practice with continuity."
    },
    "personalized": {
      "title": "Personalized scenarios created for you",
      "description": "Teachers can design custom roleplay scenarios tailored to your goals, interests, and skill level—giving you practice that's uniquely relevant to what you need."
    }
  },
  "footer": {
    "justtalkAi": "JustTalk AI",
    "justtalkTutors": "JustTalk Tutors",
    "help": "Help",
    "status": "Status",
    "termsOfUse": "Terms of Use",
    "privacyPolicy": "Privacy Policy",
    "copyright": "JustTalk AI ©2025–2026",
    "manageCookies": "Manage cookies"
  }
}
```

#### Step 3.2: Generate Initial Translations
Use AI (ChatGPT/Claude) or translation API to generate initial translations:

```bash
# Example using a script to translate
npm run translate -- --from en-US --to ru-RU,es-ES,pt-BR,zh-CN,ja-JP
```

---

### Phase 4: Update Components

#### Step 4.1: Update Header Component
```typescript
// components/Header.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Header() {
  const t = useTranslations('nav');
  
  return (
    <header>
      <nav>
        <Link href="/">{t('justtalkAi')}</Link>
        <Link href="/platform">{t('justtalkTutors')}</Link>
        <Link href="/becometeacher">{t('becomeTeacher')}</Link>
      </nav>
      <Button>{t('login')}</Button>
      <Button>{t('signup')}</Button>
    </header>
  );
}
```

#### Step 4.2: Update Footer with Language Selector
```typescript
// components/Footer.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { locales, localeNames, type Locale } from '@/i18n/config';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <footer>
      {/* ... existing footer content using t() ... */}
      
      {/* Language Selector */}
      <select 
        value={locale} 
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="..."
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </footer>
  );
}
```

#### Step 4.3: Update Page Components
```typescript
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('hero');
  
  return (
    <main>
      <h1>{t('headline')}</h1>
      <p>{t('subheadline')}</p>
    </main>
  );
}
```

---

### Phase 5: SEO and Metadata

#### Step 5.1: Generate Localized Metadata
```typescript
// app/[locale]/layout.tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://justtalk.ai/${locale}`,
      languages: {
        'en-US': 'https://justtalk.ai/en-US',
        'ru-RU': 'https://justtalk.ai/ru-RU',
        'es-ES': 'https://justtalk.ai/es-ES',
        // ... other locales
      }
    }
  };
}
```

#### Step 5.2: Update Sitemap
```typescript
// app/sitemap.ts
import { locales } from '@/i18n/config';

export default function sitemap() {
  const pages = ['', '/platform', '/becometeacher', '/terms'];
  
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `https://justtalk.ai/${locale}${page}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `https://justtalk.ai/${l}${page}`])
        )
      }
    }))
  );
}
```

---

## Translation Strategy

### Option A: Professional Translation (Recommended)
1. Extract all text to JSON files
2. Export to CSV/XLIFF format
3. Send to professional translation service
4. Import completed translations

### Option B: AI-Assisted Translation
1. Use ChatGPT/Claude API to generate initial translations
2. Have native speakers review and refine
3. Iterate based on user feedback

### Option C: Hybrid Approach
1. Use AI for initial translation
2. Prioritize professional review for:
   - Legal pages (Terms, Privacy)
   - Marketing copy
   - CTAs and key messaging

---

## Best Practices

### 1. Translation Key Naming Convention
```
namespace.element.property
Examples:
- nav.login
- hero.headline
- features.improvement.title
- pricing.plans.premium.price
```

### 2. Avoid String Concatenation
❌ Bad:
```typescript
`${t('greeting')} ${userName}!`
```

✅ Good:
```typescript
t('greeting', { name: userName })
// In JSON: "greeting": "Hello, {name}!"
```

### 3. Pluralization
```json
{
  "itemsCount": "{count, plural, =0 {No items} =1 {1 item} other {# items}}"
}
```

### 4. Rich Text Formatting
```typescript
t.rich('description', {
  highlight: (chunks) => <strong>{chunks}</strong>
})
```

### 5. Keep Translations DRY
Use message inheritance for shared content:
```json
// en-US.json
{
  "shared": {
    "learnMore": "Learn more",
    "getStarted": "Get Started"
  }
}
```

---

## Testing Checklist

- [ ] All pages render correctly in each locale
- [ ] Language selector updates URL and content
- [ ] Locale persists across navigation
- [ ] 404 pages are localized
- [ ] Metadata is localized for each page
- [ ] hreflang tags are correct
- [ ] Sitemap includes all locale variants
- [ ] Client components use translations correctly
- [ ] Server components use translations correctly
- [ ] Dates/numbers are formatted per locale

---

## Migration Timeline

### Phase 1: Foundation
- Install dependencies
- Create i18n configuration
- Set up middleware and routing

### Phase 2: Structure
- Move pages to [locale] directory
- Update layout
- Create translation files structure

### Phase 3: Content
- Extract all text to en-US.json
- Generate initial translations
- Update all components

### Phase 4: Polish
- Implement language selector
- Add localized metadata
- Update sitemap
- Test all locales

### Phase 5: Launch
- Deploy to staging
- QA testing
- Professional translation review
- Production deployment

---

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [ICU Message Format](https://formatjs.io/docs/core-concepts/icu-syntax/)
- [CLDR Language Data](https://cldr.unicode.org/)

---

## Notes

- The existing language selector button in Footer.tsx will be replaced with a functional dropdown
- All hardcoded strings need to be extracted to translation files
- Consider using a translation management platform (Crowdin, Lokalise, Phrase) for ongoing translation management
- Monitor translation quality through user feedback and analytics
