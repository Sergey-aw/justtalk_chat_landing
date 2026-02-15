"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackedLink } from "@/components/TrackedLink";
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { DollarSign, Calendar, MessageCircle, User, CreditCard, MessagesSquare } from 'lucide-react';

export default function BecomeTeacher() {
  const t = useTranslations('becometeacherPage');

  return (
    <div className="flex min-h-screen flex-col bg-just_white">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full max-w-[1320px] px-10 pt-12 md:pt-32 pb-8">
          <div className="flex flex-col gap-8">
            {/* Top Row: Text and Image */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Hero Text */}
              <div className="flex flex-col items-start max-w-2xl">
                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[clamp(2.5rem,5vw,4rem)] tracking-tight text-just_cod-gray mb-0 text-center md:text-left">
                  {t('hero.headline')}
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray">
                    {t('hero.subheadline')}
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full md:w-3/5 shrink-0 rounded-2xl overflow-hidden">
                <img 
                  src="/become_teacher.webp" 
                  alt="JustTalk Platform" 
                  className="w-full object-cover aspect-16/10"
                />
              </div>
            </div>
            
            {/* CTA Buttons - Centered Below */}
            <div className="pt-8 flex justify-center">
              <div className="flex flex-col sm:flex-row gap-[17px] items-center">
                <div className="flex flex-col items-center gap-2 max-w-[240px]">
                  <TrackedLink href="https://app.justtalk.ai/signup" eventName="apply_to_teach_clicked">
                    <Button className="cursor-pointer w-full">
                      {t('hero.applyToTeach')}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                    </Button>
                  </TrackedLink>
                  
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TrackedLink
                    href="https://cal.com/justtalk/demo"
                    eventName="cta_book_demo_clicked"
                    eventProperties={{ location: 'become_teacher_page' }}
                  >
                    <Button variant="outline" className="cursor-pointer">
                      {t('hero.bookDemo')}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                    </Button>
                  </TrackedLink>
                  
                </div>
              </div>
            </div>
          </div> 
        </section>

        {/* How it works - Tutors */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div>
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
                {t('howItWorks.title')}
              </h2>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
                {t('howItWorks.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <DollarSign className="w-6 h-6 text-indigo-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.setRates.title')}
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.setRates.description')}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <Calendar className="w-6 h-6 text-orange-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.schedule.title')}
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.schedule.description')}
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.messageStudents.title')}
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.messageStudents.description')}
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <MessagesSquare className="w-6 h-6 text-pink-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.conversationBased.title')}
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.conversationBased.description')}
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <CreditCard className="w-6 h-6 text-yellow-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.payments.title')}
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.payments.description')}
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <User className="w-6 h-6 text-purple-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.bringStudents.title')}
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  {t('howItWorks.cards.bringStudents.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI to Tutors Connection Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="bg-[#f8f6f0] rounded-2xl px-8 py-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Image */}
              <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden">
                <img 
                  src="/bring_students.webp" 
                  alt="JustTalk AI Platform connecting to tutors" 
                  className="object-cover h-full w-full"
                />
              </div>

              {/* Text Content - 3 Sections */}
              <div className="px-4 md:px-0 space-y-12">
                {/* Section 1 */}
                <div>
                  <h3 className="text-xl md:text-xl font-medium tracking-[-0.5px] text-just_cod-gray mb-1">
                    {t('bringStudents.title')}
                  </h3>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-6">
                    {t('bringStudents.description')}
                  </p>
                  <TrackedLink
                    href="https://cal.com/justtalk/tutors"
                    eventName="schedule_call_clicked"
                    eventProperties={{ location: 'become_teacher_bring_students' }}
                  >
                    <Button className="cursor-pointer">
                      {t('bringStudents.scheduleCall')}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                    </Button>
                  </TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
