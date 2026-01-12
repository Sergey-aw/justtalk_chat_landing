'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import posthog from 'posthog-js';

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const pricing = {
    basic: {
      monthly: 19.99,
      annual: 149.99, // Save 37% (12 months would be $239.88)
    },
    premium: {
      monthly: 37.99,
      annual: 299.99, // Save 34% (~$24.99/month, 12 months would be $455.88)
    },
  };

  // Calculate discount percentage (using premium plan)
  const annualDiscount = Math.round(((pricing.premium.monthly * 12 - pricing.premium.annual) / (pricing.premium.monthly * 12)) * 100);

  const handleBillingCycleChange = (value: string) => {
    const newCycle = value as 'monthly' | 'annual';
    setBillingCycle(newCycle);
    posthog.capture('pricing_billing_cycle_changed', {
      new_billing_cycle: newCycle,
      previous_billing_cycle: billingCycle,
    });
  };

  const handleGetBasicClick = () => {
    posthog.capture('pricing_get_basic_clicked', {
      billing_cycle: billingCycle,
      price: pricing.basic[billingCycle],
    });
  };

  const handleGetPremiumClick = () => {
    posthog.capture('pricing_get_premium_clicked', {
      billing_cycle: billingCycle,
      price: pricing.premium[billingCycle],
    });
  };

  return (
    <section id="pricing" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-[27.9px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray mb-8">
          Start improving your English today
        </h2>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <Tabs value={billingCycle} onValueChange={handleBillingCycleChange} className="w-auto">
            <TabsList className="grid w-full grid-cols-2 h-10">
              <TabsTrigger value="monthly" className="data-[state=active]:bg-just_cod-gray data-[state=active]:text-white" aria-label="Select monthly billing cycle">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="annual" className="data-[state=active]:bg-just_cod-gray data-[state=active]:text-white" aria-label="Select annual billing cycle with {annualDiscount}% savings">
                Annual
                <span className="ml-1.5 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded" aria-hidden="true">Save {annualDiscount}%</span>
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
                Basic
              </h3>
              <p className="text-base font-normal leading-7 tracking-[-0.17px] text-just_cod-gray">
                Start practicing conversations
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      Natural AI voice practice
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      Speak naturally with high-quality AI voices
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      Personalized feedback after every conversation
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      Clear guidance based on what you said
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      Vocabulary tracking as you speak
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      See which words you use and grow active vocabulary
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      All real-world scenarios unlocked
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      Dating, interviews, social & professional situations
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
                / {billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            <a href="https://chat.justtalk.ai/?plan=basic&ref=justtalk.ai" target="_blank" rel="noopener" onClick={handleGetBasicClick}>
              <Button className="w-full cursor-pointer">
                Get Basic
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
                Premium
              </h3>
              <p className="text-base font-normal leading-7 tracking-[-0.17px] text-just_cod-gray">
                Advanced features for serious learners
              </p>
            </div>

            <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-3">
              Everything in Basic, plus
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      Expert coaching personas
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      Get language-focused or interview-focused guidance, not just conversation
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      Immersive personalities for realistic practice
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      The real world has different personalities — your practice should too
                    </p>
                  </div>
                </div>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Image src="/icons/check.svg" alt="" width={16} height={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.3px] font-semibold leading-[22.96px] tracking-[-0.14px] text-just_cod-gray m-0">
                      Social and conversational awareness
                    </p>
                    <p className="text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/70 m-0">
                      Learn how different personalities respond to your words
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
                / {billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
              {billingCycle === 'annual' && (
                <span className="text-[11px] font-normal text-just_cod-gray/60">
                  (~${(pricing.premium.annual / 12).toFixed(2)}/mo)
                </span>
              )}
            </div>
            <a href="https://chat.justtalk.ai/?plan=premium&ref=justtalk.ai" target="_blank" rel="noopener" onClick={handleGetPremiumClick}>
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
                <span className="relative z-10">Get Premium</span>
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert relative z-10" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
