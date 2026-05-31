'use client';

import { useFeatureFlagPayload } from 'posthog-js/react';
import posthog from 'posthog-js';
import { useEffect } from 'react';

interface PricingPayload {
  key: string;
  basic_monthly: string;
  basic_annual: string;
  premium_monthly: string;
  premium_annual: string;
}

/**
 * Hook to get the pricing variant from PostHog feature flag.
 * Returns the pricing variant key or 'control' as default.
 * 
 * This hook also triggers the feature flag evaluation to ensure
 * the $feature_flag_called event is sent to PostHog.
 */
export function usePricingVariant(): string {
  const pricingPayload = useFeatureFlagPayload('pricing-test-landing') as PricingPayload | undefined;
  
  // Trigger feature flag evaluation to ensure $feature_flag_called event is sent
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.isFeatureEnabled('pricing-test-landing');
    }
  }, []);
  
  return pricingPayload?.key || 'control';
}