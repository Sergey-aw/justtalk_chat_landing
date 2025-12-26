'use client';

import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Conversation } from '@/components/Conversation';

interface Slide {
  title: string;
  description: string[];
}

const slides: Slide[] = [
  {
    title: 'Try JustTalk Now',
    description: [
      'Speak freely, without scripts or exercises.',
      'Start a voice conversation instantly—no signup required.'
    ]
  },
  {
    title: 'Helpful feedback after you speak',
    description: [
      'Practice real conversations — dating, interviews, travel, and more.',
      'Learn from your own words—after the conversation.'
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full h-full flex flex-col gap-3">
      <div className="flex-1 min-h-0 -mx-10 md:mx-0" style={{ height: '100%' }}>
        <Carousel 
          setApi={setApi}
          opts={{
            loop: true,
            align: 'center',
          }}
          className="w-full h-full"
          style={{ height: '100%' }}
        >
          <CarouselContent className="h-full -ml-2 md:-ml-4" style={{ height: '100%' }}>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="h-full pl-2 md:pl-4 basis-[85%] md:basis-full" style={{ height: '100%' }}>
                <div className="relative rounded-2xl overflow-hidden w-full h-full">
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
                      {index === 0 ? (
                        /* Voice Conversation Demo for first slide */
                        <div className="w-full">
                          <Conversation variant="hero" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 md:w-14 md:h-14 text-white">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                            <line x1="12" x2="12" y1="19" y2="22"/>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Text Section - Bottom */}
                    <div className="space-y-0 md:space-y-4 min-h-[120px] md:min-h-[160px] p-2">
                      <h3 className="text-white text-lg md:text-2xl font-semibold tracking-[-0.5px]">
                        {slide.title}
                      </h3>
                      <div className="text-white text-base md:text-base space-y-0.5 md:space-y-1 leading-tight mt-2 md:mt-3">
                        {slide.description.map((line, lineIdx) => (
                          <p key={lineIdx} className="m-0">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Dots Navigation - Below */}
      <div className="flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current 
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
