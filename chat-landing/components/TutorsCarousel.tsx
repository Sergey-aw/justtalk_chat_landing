'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface Tutor {
  name: string;
  country: string;
  rate: number;
  lessons: number;
  rating: number;
  image: string;
}

const tutors: Tutor[] = [
  { name: 'Samantha', country: '🇺🇸🇪🇸', rate: 20, lessons: 2524, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Brian', country: '🇺🇸🇫🇷', rate: 25, lessons: 1843, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Alina', country: '🇺🇸🇷🇺', rate: 18, lessons: 3102, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Marcus', country: '🇺🇸🇩🇪', rate: 22, lessons: 2156, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Mateo', country: '🇺🇸🇪🇸', rate: 19, lessons: 1967, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Lucía', country: '🇺🇸🇪🇸', rate: 17, lessons: 2834, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Imani', country: '🇺🇸🇫🇷', rate: 21, lessons: 1654, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Naomi', country: '🇺🇸🇯🇵', rate: 24, lessons: 2987, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Emma', country: '🇺🇸🇩🇪', rate: 23, lessons: 2341, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Diego', country: '🇺🇸🇪🇸', rate: 16, lessons: 1789, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Sophie', country: '🇺🇸🇫🇷', rate: 26, lessons: 3456, rating: 5, image: '/images/Naomi.jpeg' },
  { name: 'Kai', country: '🇺🇸🇰🇷', rate: 21, lessons: 2098, rating: 5, image: '/images/Naomi.jpeg' },
];

// Split into two columns
const column1Tutors = tutors.slice(0, 6);
const column2Tutors = tutors.slice(6);

interface TutorCardProps {
  tutor: Tutor;
}

function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="bg-white flex flex-col items-end justify-center overflow-clip p-[6px] sm:p-[8px] md:p-[10px] relative rounded-xl md:rounded-2xl flex-shrink-0 shadow-md">
      <div className="flex gap-[1px] sm:gap-[2px] items-start relative shrink-0 w-full">
        <div className="flex items-start relative self-stretch shrink-0">
          <div className="aspect-square h-full relative rounded-lg md:rounded-xl shrink-0 w-[35px] sm:w-[42px] md:w-[50px]">
            <img
              alt={tutor.name}
              className="absolute inset-0 max-w-none object-center object-cover pointer-events-none rounded-lg md:rounded-xl size-full aspect-square"
              src={tutor.image}
            />
          </div>
        </div>
        <div className="basis-0 flex flex-col gap-[2px] sm:gap-[3px] grow h-[35px] sm:h-[42px] md:h-[50px] items-start justify-center min-h-px min-w-px overflow-clip pl-[8px] sm:pl-[10px] md:pl-[13px] pr-0 py-[1px] relative shrink-0">
          <div className="flex h-auto items-start justify-between relative shrink-0 w-full">
            <div className="basis-0 flex font-semibold grow items-center justify-between leading-normal min-h-px min-w-px relative shrink-0 whitespace-nowrap">
              <p className="relative shrink-0 text-xs sm:text-sm md:text-md text-black">
                {tutor.name} {tutor.country}
              </p>
              <p className="relative shrink-0 text-[#a6a6a6] text-[12px] sm:text-[14px] md:text-[16px]">
                ${tutor.rate}/hr
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start relative shrink-0 pt-0.5 sm:pt-1">
            <div className="flex font-semibold gap-[4px] sm:gap-[6px] md:gap-[8px] items-center justify-center leading-normal not-italic relative shrink-0 text-[9px] sm:text-[10px] md:text-[12px] whitespace-nowrap">
              <p className="relative shrink-0 text-[#9a9a9a]">
                {tutor.lessons} lessons
              </p>
              <p className="relative shrink-0 text-[#a6a6a6]">
                ⭐⭐⭐⭐⭐️
              </p>
            </div>
          </div>
          <div className="basis-0 flex flex-col grow items-end justify-end min-h-px min-w-px relative shrink-0 w-full">
            {/* <div className="bg-[#282828] flex items-end justify-center px-[8px] py-[5px] relative rounded-[5px] shrink-0 cursor-pointer hover:bg-[#3a3a3a] transition-colors">
               <p className="font-medium leading-normal relative shrink-0 text-[12px] whitespace-nowrap text-white">
                book a trial
              </p> 
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ScrollingColumnProps {
  tutors: Tutor[];
  direction?: 'up' | 'down';
  offset?: number;
}

function ScrollingColumn({ tutors, direction = 'up', offset = 0 }: ScrollingColumnProps) {
  const y = useMotionValue(offset);
  const controls = useAnimation();
  const isDragging = useRef(false);
  // Card height + gap - responsive
  const cardHeight = 60; // Adjusted for responsive sizing
  const totalHeight = tutors.length * cardHeight;

  useEffect(() => {
    const animateScroll = async () => {
      if (isDragging.current) return;

      const currentY = y.get();
      const targetY = direction === 'up' ? -totalHeight : totalHeight;
      
      await controls.start({
        y: [currentY, currentY + targetY],
        transition: {
          duration: 50,
          ease: 'linear',
          repeat: Infinity,
        },
      });
    };

    animateScroll();
  }, [controls, direction, totalHeight, y]);

  const handleDragStart = () => {
    isDragging.current = true;
    controls.stop();
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    
    // Delay animation restart to allow momentum to complete
    setTimeout(() => {
      const currentY = y.get();
      controls.start({
        y: [currentY, currentY + (direction === 'up' ? -totalHeight : totalHeight)],
        transition: {
          duration: 50,
          ease: 'linear',
          repeat: Infinity,
        },
      });
    }, 500);
  };

  // Duplicate tutors many times for infinite scroll effect (especially for down-scrolling column)
  const duplicatedTutors = [...tutors, ...tutors, ...tutors, ...tutors, ...tutors, ...tutors];

  return (
    <div className="relative overflow-hidden h-full flex-1">
      <motion.div
        className="flex flex-col gap-[12px] sm:gap-[15px] md:gap-[18px]"
        drag="y"
        dragConstraints={{ top: -totalHeight, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={true}
        dragTransition={{ 
          power: 0.3,
          timeConstant: 200
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ y }}
      >
        {duplicatedTutors.map((tutor, index) => (
          <TutorCard key={`${tutor.name}-${index}`} tutor={tutor} />
        ))}
      </motion.div>
    </div>
  );
}

export function TutorsCarousel() {
  return (
    <div className="relative flex gap-2 sm:gap-3 md:gap-4 w-full h-full overflow-hidden px-2 sm:px-3 md:px-4 py-0">
      <ScrollingColumn tutors={column1Tutors} direction="up" offset={0} />
      <ScrollingColumn tutors={column2Tutors} direction="down" offset={-200} />
     
    </div>
  );
}
