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
  { name: 'Megan Holloway', country: '🇺🇸🇪🇸', rate: 22, lessons: 2847, rating: 5, image: '/images/teachers/Megan.jpg' },
  { name: 'Daniel Brooks', country: '🇺🇸', rate: 19, lessons: 1923, rating: 5, image: '/images/teachers/Daniel.jpg' },
  { name: 'Marcus Lee', country: '🇺🇸🇰🇷', rate: 24, lessons: 3156, rating: 5, image: '/images/teachers/Marcus.jpg' },
  { name: 'Aisha Reynolds', country: '🇺🇸', rate: 23, lessons: 2634, rating: 5, image: '/images/teachers/Aisha.jpg' },
  { name: 'Liam O\'Connor', country: '🇮🇪', rate: 20, lessons: 2198, rating: 5, image: '/images/teachers/Liam.jpg' },
  { name: 'Rachel Kim', country: '🇺🇸🇯🇵', rate: 27, lessons: 3421, rating: 5, image: '/images/teachers/Rachel.jpg' },
  { name: 'Hannah Lewis', country: '🇨🇦🇫🇷', rate: 25, lessons: 2976, rating: 5, image: '/images/teachers/Hannah.jpg' },
  { name: 'Jason Miller', country: '🇺🇸', rate: 22, lessons: 2105, rating: 5, image: '/images/teachers/Jason.jpg' },
  { name: 'Sophie Grant', country: '🇦🇺', rate: 28, lessons: 3687, rating: 5, image: '/images/teachers/Sophie.jpg' },
  { name: 'Ethan Rodriguez', country: '🇺🇸🇪🇸', rate: 21, lessons: 2453, rating: 5, image: '/images/teachers/Ethan.jpg' },
];

// Split into two columns
const column1Tutors = tutors.slice(0, 5);
const column2Tutors = tutors.slice(5);

interface TutorCardProps {
  tutor: Tutor;
}

function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="bg-white flex flex-col items-end justify-center overflow-clip p-[10px] sm:p-[10px] md:p-[10px] relative rounded-xl md:rounded-2xl flex-shrink-0 shadow-md">
      <div className="flex gap-[2px] sm:gap-[2px] items-start relative shrink-0 w-full">
        <div className="flex items-start relative self-stretch shrink-0">
          <div className="aspect-square h-full relative rounded-lg md:rounded-xl shrink-0 w-[60px] sm:w-[50px] md:w-[50px]">
            <img
              alt={tutor.name}
              className="absolute inset-0 max-w-none object-center object-cover pointer-events-none rounded-lg md:rounded-xl size-full aspect-square"
              src={tutor.image}
            />
          </div>
        </div>
        <div className="basis-0 flex flex-col gap-[1px] sm:gap-[2px] grow h-[60px] sm:h-[50px] md:h-[50px] items-start justify-center min-h-px min-w-px overflow-clip pl-[12px] sm:pl-[12px] md:pl-[13px] pr-0 py-[1px] relative shrink-0">
          <div className="flex h-auto items-start justify-between relative shrink-0 w-full">
            <div className="basis-0 flex font-semibold grow items-center justify-between leading-normal min-h-px min-w-px relative shrink-0 whitespace-nowrap">
              <p className="relative shrink-0 text-[14px] sm:text-sm md:text-md text-black">
                {tutor.name} {tutor.country}
              </p>
              <p className="relative shrink-0 text-[#a6a6a6] text-[14px] md:text-[14px]">
                ${tutor.rate}/hr
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start relative shrink-0 pt-0.5 sm:pt-1">
            <div className="flex font-semibold gap-[4px] sm:gap-[6px] md:gap-[8px] items-center justify-center leading-normal not-italic relative shrink-0 text-[12px] sm:text-[11px] md:text-[12px] whitespace-nowrap">
              <p className="relative shrink-0 text-[#9a9a9a]">
                {tutor.lessons} lessons
              </p>
              <p className="md:hidden relative shrink-0 text-[#a6a6a6] text-xs">
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
  const cardHeight = 75; // Adjusted for larger mobile cards (60px image + 24px padding + gap)
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
        className="flex flex-col gap-[14px] sm:gap-[15px] md:gap-[18px]"
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
    <div className="relative flex gap-2 sm:gap-3 md:gap-4 w-full h-full overflow-hidden px-4 sm:px-3 md:px-4 py-0">
      {/* Mobile: Single column */}
      <div className="block md:hidden w-full">
        <ScrollingColumn tutors={tutors} direction="up" offset={0} />
      </div>
      
      {/* Desktop: Two columns */}
      <div className="hidden md:flex gap-4 w-full">
        <ScrollingColumn tutors={column1Tutors} direction="up" offset={0} />
        <ScrollingColumn tutors={column2Tutors} direction="down" offset={-200} />
      </div>
    </div>
  );
}
