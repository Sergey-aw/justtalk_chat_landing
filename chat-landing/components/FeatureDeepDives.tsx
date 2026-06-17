"use client";

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = ['howItWorks', 'rolePlays', 'knowStudent', 'visualFlow'] as const;

export function FeatureDeepDives() {
  const t = useTranslations('becometeacherPage.featureDeepDives');

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
          {t('title')}
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {items.map((key) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
              {t(`items.${key}.title`)}
            </AccordionTrigger>
            <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
              {t(`items.${key}.description`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
