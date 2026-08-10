"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AMBASSADOR_OFFER } from "@/lib/ambassador";

const sliderClass =
  "w-full mt-2.5 accent-just_cod-gray cursor-pointer";

const sliderLabelClass =
  "text-[13.3px] font-semibold leading-[1.72] tracking-[-0.14px] text-just_cod-gray";

const sliderValueClass =
  "text-xl font-medium leading-[1.27] tracking-[-0.217px] text-just_cod-gray tabular-nums";

const rowLabelClass =
  "text-[13.3px] leading-[1.72] tracking-[-0.14px] text-just_white/70";

const rowValueClass =
  "text-[13.3px] font-semibold leading-[1.72] tracking-[-0.14px] text-just_white tabular-nums";

/**
 * Illustrative "what ten weeks looks like" calculator. The three inputs are
 * numbers a teacher already knows; everything else derives from AMBASSADOR_OFFER.
 */
export function AmbassadorEarnings() {
  const t = useTranslations("ambassadorPage.earnings");
  const locale = useLocale();
  const [students, setStudents] = useState(8);
  const [price, setPrice] = useState(20);
  const [lessons, setLessons] = useState(2);

  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale]
  );

  const gross = students * price * lessons;
  const fee = (gross * AMBASSADOR_OFFER.takeRate) / 100;
  const keep = gross - fee;

  return (
    <>
      <h2 className="text-2xl md:text-[27.8px] font-medium leading-[1.37] tracking-[-0.29px] text-just_cod-gray">
        {t("title")}
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-8 items-stretch">
        {/* Inputs */}
        <div className="relative overflow-hidden border border-just_cod-gray-10 rounded-xl p-6 flex flex-col gap-7">
          <img
            src="/bg_beige_square.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10">
            <h3 className="text-xl font-medium leading-[1.27] tracking-[-0.217px] text-just_cod-gray">
              {t("roster.title")}
            </h3>
            <p className="mt-1.5 text-base leading-[1.75] tracking-[-0.17px] text-just_cod-gray">
              {t("roster.description")}
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-baseline gap-3">
                <label htmlFor="amb-students" className={sliderLabelClass}>
                  {t("roster.students")}
                </label>
                <div className={sliderValueClass}>{students}</div>
              </div>
              <input
                id="amb-students"
                type="range"
                min={1}
                max={40}
                step={1}
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className={sliderClass}
              />
            </div>

            <div>
              <div className="flex justify-between items-baseline gap-3">
                <label htmlFor="amb-price" className={sliderLabelClass}>
                  {t("roster.price")}
                </label>
                <div className={sliderValueClass}>{money.format(price)}</div>
              </div>
              <input
                id="amb-price"
                type="range"
                min={5}
                max={80}
                step={1}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={sliderClass}
              />
            </div>

            <div>
              <div className="flex justify-between items-baseline gap-3">
                <label htmlFor="amb-lessons" className={sliderLabelClass}>
                  {t("roster.lessons")}
                </label>
                <div className={sliderValueClass}>{lessons}</div>
              </div>
              <input
                id="amb-lessons"
                type="range"
                min={1}
                max={4}
                step={1}
                value={lessons}
                onChange={(e) => setLessons(Number(e.target.value))}
                className={sliderClass}
              />
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="bg-just_cod-gray rounded-xl p-6 flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-xl font-medium leading-[1.27] tracking-[-0.217px] text-just_white">
              {t("result.title")}
            </h3>
            <div className="mt-2 text-[clamp(3rem,6vw,4rem)] font-medium leading-[0.93] tracking-[-0.0276em] text-just_white tabular-nums">
              {money.format(keep)}
            </div>
          </div>

          <div className="grid gap-2.5">
            <div className="flex justify-between gap-3 pb-2.5 border-b border-just_white/15">
              <span className={rowLabelClass}>{t("result.gross")}</span>
              <span className={rowValueClass}>{money.format(gross)}</span>
            </div>
            <div className="flex justify-between gap-3 pb-2.5 border-b border-just_white/15">
              <span className={rowLabelClass}>
                {t("result.fee", { rate: AMBASSADOR_OFFER.takeRate })}
              </span>
              <span className={rowValueClass}>−{money.format(fee)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className={`${rowValueClass} font-semibold`}>
                {t("result.total", { weeks: AMBASSADOR_OFFER.weeks })}
              </span>
              <span className={rowValueClass}>
                {money.format(keep * AMBASSADOR_OFFER.weeks)}
              </span>
            </div>
          </div>

          <p className={rowLabelClass}>
            {t("result.note", { lessons: AMBASSADOR_OFFER.freeLessons })}
          </p>
        </div>
      </div>
    </>
  );
}
