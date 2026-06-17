"use client";

import { useTranslations } from 'next-intl';
import {
  Mic,
  Target,
  CheckCircle2,
  Zap,
  Repeat,
  BarChart3,
  Sparkles,
  RefreshCw,
  Layers,
} from 'lucide-react';

const cards = [
  { key: 'speakingFirst', Icon: Mic, color: 'text-pink-500' },
  { key: 'taskBased', Icon: Target, color: 'text-orange-500' },
  { key: 'mastery', Icon: CheckCircle2, color: 'text-blue-500' },
  { key: 'feedback', Icon: Zap, color: 'text-yellow-500' },
  { key: 'spacedRepetition', Icon: Repeat, color: 'text-purple-500' },
  { key: 'cefr', Icon: BarChart3, color: 'text-indigo-500' },
  { key: 'adaptive', Icon: Sparkles, color: 'text-emerald-500' },
  { key: 'activeRecall', Icon: RefreshCw, color: 'text-rose-500' },
] as const;

export function LearningScience() {
  const t = useTranslations('becometeacherPage.learningScience');

  return (
    <div>
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
          {t('title')}
        </h2>
        <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mt-2">
          {t('intro')}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ key, Icon, color }) => (
          <div
            key={key}
            className="group bg-gray-50 rounded-2xl p-6 md:p-8 border border-transparent transition-all duration-200 hover:-translate-y-1 hover:border-just_black-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="mb-4">
              <Icon className={`w-6 h-6 ${color}`} strokeWidth={2} />
            </div>
            <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
              {t(`cards.${key}.title`)}
            </h3>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
              {t(`cards.${key}.description`)}
            </p>
          </div>
        ))}
      </div>

      {/* Differentiator highlight */}
      <div className="mt-6 bg-[#f8f6f0] rounded-2xl px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
            <Layers className="w-6 h-6 text-just_cod-gray" strokeWidth={2} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium tracking-[-0.5px] text-just_cod-gray mb-1">
            {t('highlight.title')}
          </h3>
          <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
            {t('highlight.description')}
          </p>
        </div>
      </div>
    </div>
  );
}
