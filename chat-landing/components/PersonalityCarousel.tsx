'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface Persona {
  name: string;
  tags: string;
  image: string;
}

const personas: Persona[] = [
  { name: 'Samantha', tags: 'Supportive · Encouraging', image: '/images/interview_samantha.jpg' },
  { name: 'Brian', tags: 'Clear · Coaching', image: '/images/interview_brian.jpg' },
  { name: 'Alina', tags: 'Warm · Patient', image: '/images/Alina.jpg' },
  { name: 'Marcus', tags: 'Confident · Assertive', image: '/images/interview_marcus.jpg' },
  { name: 'Mateo', tags: 'Casual · Friendly', image: '/images/dating_mateo.jpg' },
  { name: 'Lucía', tags: 'Expressive · Engaging', image: '/images/Lucia.jpeg' },
  { name: 'Imani', tags: 'Thoughtful · Curious', image: '/images/Imani.jpeg' },
  { name: 'Naomi', tags: 'Professional · Polished', image: '/images/Naomi.jpeg' },
  { name: 'Clara', tags: 'Calm · Supportive', image: '/images/Clara.jpg' },
  { name: 'Andre', tags: 'Relaxed · Conversational', image: '/images/dating_andre.jpg' },
  { name: 'Evan', tags: 'Analytical · Precise', image: '/images/dating_evan.jpg' },
  { name: 'Julian', tags: 'Challenging · Sharp', image: '/images/dating_julian.jpg' },
  { name: 'Noah', tags: 'Easygoing · Approachable', image: '/images/dating_noah.jpg' },
  { name: 'Claire', tags: 'Analytical · Evaluative', image: '/images/interview_claire.jpg' },
  { name: 'Steven', tags: 'Authoritative · Demanding', image: '/images/interview_steven.jpg' },
];

// Split into two rows with different personas
const row1Personas = personas.slice(0, 8);
const row2Personas = personas.slice(8);

interface PersonaCardProps {
  persona: Persona;
}

function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-[20px] md:rounded-[32px] p-1 shadow-md w-[120px] md:w-[160px] flex-shrink-0">
      <div className="relative h-[120px] md:h-[160px] w-full rounded-[16px] md:rounded-[28px] overflow-hidden flex items-end p-1.5 md:p-2">
        <img
          src={persona.image}
          alt={persona.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative bg-white rounded-xl md:rounded-2xl px-2 md:px-3 py-1 md:py-1.5 w-full z-10">
          <p className="font-semibold text-black mb-0 text-[10px] md:text-xs leading-tight">{persona.name}</p>
          <p className="font-normal text-black/75 text-[8px] md:text-[9px] leading-tight">{persona.tags}</p>
        </div>
      </div>
    </div>
  );
}

interface ScrollingRowProps {
  personas: Persona[];
  direction?: 'left' | 'right';
  offset?: number;
}

function ScrollingRow({ personas, direction = 'left', offset = 0 }: ScrollingRowProps) {
  const x = useMotionValue(offset);
  const controls = useAnimation();
  const isDragging = useRef(false);
  // Use smaller card width for mobile calculation (120 + 12 gap)
  const cardWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 + 12 : 160 + 16;
  const totalWidth = personas.length * cardWidth;

  useEffect(() => {
    const animateScroll = async () => {
      if (isDragging.current) return;

      const currentX = x.get();
      const targetX = direction === 'left' ? -totalWidth : totalWidth;
      
      await controls.start({
        x: [currentX, currentX + targetX],
        transition: {
          duration: 40,
          ease: 'linear',
          repeat: Infinity,
        },
      });
    };

    animateScroll();
  }, [controls, direction, totalWidth, x]);

  const handleDragStart = () => {
    isDragging.current = true;
    controls.stop();
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    const currentX = x.get();
    
    // Resume animation from current position
    controls.start({
      x: [currentX, currentX + (direction === 'left' ? -totalWidth : totalWidth)],
      transition: {
        duration: 40,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  };

  // Duplicate personas for infinite scroll effect
  const duplicatedPersonas = [...personas, ...personas, ...personas];

  return (
    <div className="relative overflow-hidden w-full py-1 md:py-2 max-w-full">
      <motion.div
        className="flex gap-3 md:gap-4"
        drag="x"
        dragConstraints={{ left: -totalWidth, right: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
      >
        {duplicatedPersonas.map((persona, index) => (
          <PersonaCard key={`${persona.name}-${index}`} persona={persona} />
        ))}
      </motion.div>
    </div>
  );
}

export function PersonalityCarousel() {
  return (
    <div className="flex flex-col gap-0.5 md:gap-1 w-full overflow-hidden max-w-full">
      <ScrollingRow personas={row1Personas} direction="left" offset={0} />
      <ScrollingRow personas={row2Personas} direction="left" offset={-60} />
    </div>
  );
}
