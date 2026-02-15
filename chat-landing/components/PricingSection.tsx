'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import posthog from 'posthog-js';
import { useFeatureFlagPayload } from 'posthog-js/react';

interface PricingPayload {
  key: string;
  basic_monthly: string;
  basic_annual: string;
  premium_monthly: string;
  premium_annual: string;
}

export function PricingSection() {
  const t = useTranslations('pricing');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Get pricing from PostHog feature flag
  const pricingPayload = useFeatureFlagPayload('pricing-test-landing') as PricingPayload | undefined;
  
  // Explicitly trigger feature flag evaluation to ensure $feature_flag_called event is sent
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.isFeatureEnabled('pricing-test-landing');
    }
  }, []);

  // Default pricing (control)
  const defaultPricing = {
    basic: {
      monthly: 19.99,
      annual: 149.99,
    },
    premium: {
      monthly: 37.99,
      annual: 299.99,
    },
  };

  // Use feature flag pricing if available, otherwise use default
  const pricing = pricingPayload ? {
    basic: {
      monthly: parseFloat(pricingPayload.basic_monthly),
      annual: parseFloat(pricingPayload.basic_annual),
    },
    premium: {
      monthly: parseFloat(pricingPayload.premium_monthly),
      annual: parseFloat(pricingPayload.premium_annual),
    },
  } : defaultPricing;

  // Calculate discount percentage (using premium plan)
  const annualDiscount = Math.round(((pricing.premium.monthly * 12 - pricing.premium.annual) / (pricing.premium.monthly * 12)) * 100);

  const handleBillingCycleChange = (value: string) => {
    const newCycle = value as 'monthly' | 'annual';
    setBillingCycle(newCycle);
    posthog.capture('pricing_billing_cycle_changed', {
      new_billing_cycle: newCycle,
      previous_billing_cycle: billingCycle,
      pricing_variant: pricingPayload?.key || 'control',
    });
  };

  const handleGetBasicClick = () => {
    posthog.capture('pricing_get_basic_clicked', {
      billing_cycle: billingCycle,
      price: pricing.basic[billingCycle],
      pricing_variant: pricingPayload?.key || 'control',
    });
  };

  const handleGetPremiumClick = () => {
    posthog.capture('pricing_get_premium_clicked', {
      billing_cycle: billingCycle,
      price: pricing.premium[billingCycle],
      pricing_variant: pricingPayload?.key || 'control',
    });
  };

  // Construct URLs with pricing variant
  const pricingVariant = pricingPayload?.key || 'control';
  const basicUrl = `https://chat.justtalk.ai/?plan=basic&pricing_variant=${pricingVariant}&ref=justtalk.ai`;
  const premiumUrl = `https://chat.justtalk.ai/?plan=premium&pricing_variant=${pricingVariant}&ref=justtalk.ai`;

  return (
    <section id="pricing" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-[27.9px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray mb-8">
          {t('title')}
        </h2>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <Tabs value={billingCycle} onValueChange={handleBillingCycleChange} className="w-auto">
            <TabsList className="grid w-full grid-cols-2 h-10">
              <TabsTrigger value="monthly" className="data-[state=active]:bg-just_cod-gray data-[state=active]:text-white" aria-label="Select monthly billing cycle">
                {t('monthly')}
              </TabsTrigger>
              <TabsTrigger value="annual" className="data-[state=active]:bg-just_cod-gray data-[state=active]:text-white" aria-label="Select annual billing cycle">
                {t('annual')}
                <span className="ml-1.5 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded" aria-hidden="true">{t('save', { percent: annualDiscount })}</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Basic Plan */}
        <div className="relative border border-just_cod-gray-10 rounded-xl p-6 flex flex-col justify-between overflow-hidden">
          <img 
            src="/bg_beige_square.jpg" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="relative z-10">
            <div className="mb-6">
              <h3 className="text-xl font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray mb-2">
                {t('plans.basic.name')}
              </h3>
              <p className="text-base font-normal leading-7 tracking-[-0.17px] text-just_cod-gray">
                {t('plans.basic.description')}
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      {t('plans.basic.features.voicePractice.title')}
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      {t('plans.basic.features.voicePractice.description')}
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      {t('plans.basic.features.feedback.title')}
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      {t('plans.basic.features.feedback.description')}
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      {t('plans.basic.features.personalities.title')}
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      {t('plans.basic.features.personalities.description')}
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      {t('plans.basic.features.scenarios.title')}
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      {t('plans.basic.features.scenarios.description')}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative z-10">
            <div className="flex items-baseline gap-2 mb-6 pl-6">
              <span className="text-[21.4px] font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray">
                ${pricing.basic[billingCycle]}
              </span>
              <span className="text-[13.9px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                {t('perMonth')}
              </span>
            </div>
            <a href={basicUrl} target="_blank" rel="noopener" onClick={handleGetBasicClick}>
              <Button className="w-full cursor-pointer">
                {t('plans.basic.cta')}
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
              </Button>
            </a>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="relative border border-just_cod-gray-10 rounded-xl p-6 flex flex-col justify-between overflow-hidden">
          <img 
            src="/bg_beige_square.jpg" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="relative z-10">
            <div className="mb-6">
              <h3 
                className="text-xl font-medium leading-[27.11px] tracking-[-0.217px] mb-2"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #118DEC 0%, rgba(247, 87, 170, 0.80) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t('plans.premium.name')}
              </h3>
              <p className="text-base font-normal leading-7 tracking-[-0.17px] text-just_cod-gray">
                {t('plans.premium.description')}
              </p>
            </div>

            <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-3">
              {t('plans.premium.features.everything.title')}
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      {t('plans.premium.features.advancedFeedback.title')}
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      {t('plans.premium.features.advancedFeedback.description')}
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      {t('plans.premium.features.memory.title')}
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      {t('plans.premium.features.memory.description')}
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      {t('plans.premium.features.unlimited.title')}
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      {t('plans.premium.features.unlimited.description')}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative z-10">
            <div className="flex items-baseline gap-2 mb-6 pl-6">
              <span className="text-[21.4px] font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray">
                ${pricing.premium[billingCycle]}
              </span>
              <span className="text-[13.9px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                {t('perMonth')}
              </span>
              {billingCycle === 'annual' && (
                <span className="text-[11px] font-normal text-just_cod-gray/60">
                  (~${(pricing.premium.annual / 12).toFixed(2)}/mo)
                </span>
              )}
            </div>
            <a href={premiumUrl} target="_blank" rel="noopener" onClick={handleGetPremiumClick}>
              <Button
                className="w-full cursor-pointer relative overflow-hidden group"
                style={{
                  transition: 'all 0.3s ease'
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(20deg, #118DEC 0%, rgba(247, 87, 170, 0.80) 100%)'
                  }}
                />
                <span className="relative z-10">{t('plans.premium.cta')}</span>
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert relative z-10" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
