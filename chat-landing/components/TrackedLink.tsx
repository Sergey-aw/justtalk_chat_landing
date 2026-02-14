'use client';

import posthog from 'posthog-js';
import { ReactNode } from 'react';
import { usePricingVariant } from '@/hooks/usePricingVariant';

interface TrackedLinkProps {
  href: string;
  eventName: string;
  eventProperties?: Record<string, unknown>;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  /** When true, automatically appends pricing_variant parameter to the URL */
  includePricingVariant?: boolean;
}

export function TrackedLink({
  href,
  eventName,
  eventProperties = {},
  children,
  className,
  target,
  rel,
  includePricingVariant = false,
}: TrackedLinkProps) {
  const pricingVariant = usePricingVariant();
  
  // Construct URL with pricing_variant if enabled
  const finalHref = includePricingVariant 
    ? appendPricingVariant(href, pricingVariant)
    : href;

  const handleClick = () => {
    posthog.capture(eventName, {
      href: finalHref,
      ...eventProperties,
      ...(includePricingVariant && { pricing_variant: pricingVariant }),
    });
  };

  return (
    <a
      href={finalHref}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

/**
 * Appends pricing_variant parameter to a URL, preserving existing query params
 */
function appendPricingVariant(url: string, pricingVariant: string): string {
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'https://justtalk.ai');
    urlObj.searchParams.set('pricing_variant', pricingVariant);
    if (url.startsWith('http')) {
      return urlObj.toString();
    }
    return urlObj.pathname + urlObj.search;
  } catch {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}pricing_variant=${pricingVariant}`;
  }
}
