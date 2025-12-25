'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  title: string;
  description: string[];
}

const slides: Slide[] = [
  {
    title: 'Natural voice conversations',
    description: [
      'Speak freely, without scripts or exercises.',
      'Pause, restart, make mistakes — I\'ll help you keep going and sound more natural.'
    ]
  },
  {
    title: 'Helpful feedback after you speak',
    description: [
      'Practice real conversations — dating, interviews, travel, and more.',
      'SLearn from your own words—after the conversation.'
    ]
  },
  {
    title: 'Vocabulary that grows with you',
    description: [
      'Track the words you actually use.',
      'The words you\'re learning next.'
    ]
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full flex flex-col gap-3">
      {/* Carousel Container */}
      <div className="relative flex-1 rounded-2xl overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/bg_colored1_square.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-4 pt-4 pb-3 md:p-8">
          {/* Icon Section - Top */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-10 h-10 md:w-14 md:h-14 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </div>
          </div>

          {/* Text Section - Bottom */}
          <div className="space-y-0 md:space-y-4 min-h-[120px] md:min-h-[160px] p-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h3 className="text-white text-lg md:text-2xl font-semibold tracking-[-0.5px]">
                  {slides[currentSlide].title}
                </h3>
                <div className="text-white text-base md:text-base space-y-0.5 md:space-y-1 leading-tight mt-2 md:mt-3">
                  {slides[currentSlide].description.map((line, index) => (
                    <p key={index} className="m-0">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Dots Navigation - Below */}
      <div className="flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-just_cod-gray w-6' 
                : 'bg-just_cod-gray/30 hover:bg-just_cod-gray/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
