'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const BAND = 6.3;
const MAX_BAND = 9;

const criteria = [
  { name: 'Fluency & Coherence', score: 6.5 },
  { name: 'Lexical Resource', score: 6.0 },
  { name: 'Grammar', score: 6.0 },
  { name: 'Pronunciation', score: 6.5 },
];

const parts = ['Part 1 · Interview', 'Part 2 · Long turn', 'Part 3 · Discussion'];

// Semicircle gauge geometry
const CX = 110;
const CY = 92;
const RADIUS = 80;
const ARC_LEN = Math.PI * RADIUS; // length of the 180° arc

function AnimatedBand({ isInView }: { isInView: boolean }) {
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => v.toFixed(1));
  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, BAND, { duration: 1.4, ease: 'easeOut' });
    return () => controls.stop();
  }, [isInView, count]);
  return <motion.tspan>{text}</motion.tspan>;
}

export function IELTSReport() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [activePart, setActivePart] = useState(0);

  // Cycle the Part chips for a touch of life
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setActivePart((p) => (p + 1) % parts.length), 2200);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col justify-center px-5 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold text-just_cod-gray leading-tight">IELTS Speaking</div>
          <div className="text-[11px] text-just_scorpion leading-tight">Mock test · Parts 1–3</div>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#E7F4D9] text-[#3F7A12]">
          Completed
        </span>
      </div>

      {/* Radial band gauge */}
      <div className="relative flex justify-center pt-1">
        <svg width="220" height="112" viewBox="0 0 220 112" className="overflow-visible">
          <defs>
            <linearGradient id="ielts-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3FA9FF" />
              <stop offset="100%" stopColor="#0A6FE3" />
            </linearGradient>
          </defs>
          {/* track */}
          <path
            d={`M ${CX - RADIUS} ${CY} A ${RADIUS} ${RADIUS} 0 0 1 ${CX + RADIUS} ${CY}`}
            fill="none"
            stroke="#EDF1F6"
            strokeWidth="13"
            strokeLinecap="round"
          />
          {/* value */}
          <motion.path
            d={`M ${CX - RADIUS} ${CY} A ${RADIUS} ${RADIUS} 0 0 1 ${CX + RADIUS} ${CY}`}
            fill="none"
            stroke="url(#ielts-arc)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            initial={{ strokeDashoffset: ARC_LEN }}
            animate={isInView ? { strokeDashoffset: ARC_LEN * (1 - BAND / MAX_BAND) } : {}}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          {/* center readout */}
          <text x={CX} y={CY - 16} textAnchor="middle" className="fill-just_cod-gray" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em' }}>
            <AnimatedBand isInView={isInView} />
          </text>
          <text x={CX} y={CY - 1} textAnchor="middle" className="fill-just_scorpion" style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em' }}>
            ESTIMATED BAND
          </text>
          {/* endpoints */}
          <text x={CX - RADIUS} y={CY + 17} textAnchor="middle" className="fill-just_scorpion" style={{ fontSize: 11, fontWeight: 600 }}>0</text>
          <text x={CX + RADIUS} y={CY + 17} textAnchor="middle" className="fill-just_scorpion" style={{ fontSize: 11, fontWeight: 600 }}>9</text>
        </svg>
      </div>

      {/* Part chips */}
      <div className="flex flex-wrap justify-center gap-1.5 pt-0.5">
        {parts.map((p, i) => (
          <span
            key={p}
            className={`text-[11px] font-medium px-3 py-1.5 rounded-full transition-colors duration-500 ${
              activePart === i ? 'bg-[#1E8FFF] text-white' : 'bg-[#F2F5F9] text-just_scorpion'
            }`}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Criteria */}
      <div className="pt-3">
        {criteria.map((c, i) => (
          <div key={c.name} className="flex items-center gap-3 py-1">
            <div className="w-[150px] shrink-0 text-[12.5px] font-medium text-just_cod-gray">{c.name}</div>
            <div className="flex-1 h-2 rounded-full bg-[#EDF1F6] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#3FA9FF] to-[#0A6FE3]"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${(c.score / MAX_BAND) * 100}%` } : {}}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 + i * 0.12 }}
              />
            </div>
            <div className="w-7 text-right text-[13px] font-bold text-just_cod-gray tabular-nums">
              {c.score.toFixed(1)}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="pt-3 text-[11px] leading-snug text-just_scorpion text-center">
        Unofficial estimate · supports, doesn&apos;t replace, certified IELTS assessment.
      </p>
    </div>
  );
}
