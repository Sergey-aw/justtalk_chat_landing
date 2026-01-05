'use client';

import posthog from 'posthog-js';
import { ReactNode } from 'react';

interface TrackedLinkProps {
  href: string;
  eventName: string;
  eventProperties?: Record<string, unknown>;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function TrackedLink({
  href,
  eventName,
  eventProperties = {},
  children,
  className,
  target,
  rel,
}: TrackedLinkProps) {
  const handleClick = () => {
    posthog.capture(eventName, {
      href,
      ...eventProperties,
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
