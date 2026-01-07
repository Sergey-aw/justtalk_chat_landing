'use client';

import { useEffect, useState } from 'react';

interface FeatureItem {
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    title: 'Speak',
    description: 'Practice English through AI scenarios or live lessons.',
  },
  {
    title: 'Analyze',
    description: 'Get instant feedback on grammar, vocabulary, and fluency.',
  },
  {
    title: 'Adapt',
    description: 'AI adjusts to your level and learns from every conversation.',
  },
  {
    title: 'Continue',
    description: 'Build on past sessions with memory that never forgets.',
  },
];

export function CircularRotation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setRotation((prev) => prev + 90);
      setCurrentIndex((prev) => (prev + 1) % features.length);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const radius = 150;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated rotating container */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Dashed Circle */}
        <svg
          className="w-[300px] h-[300px]"
          viewBox="0 0 300 300"
        >
          <circle
            cx="150"
            cy="150"
            r="150"
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
        </svg>

        {/* Text Labels positioned around circle - rotated with the circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[300px] h-[300px]">
            {features.map((feature, index) => {
              const angle = (index * 90) * (Math.PI / 180);
              const labelRadius = radius + 10;
              const x = centerX + labelRadius * Math.sin(angle);
              const y = centerY - labelRadius * Math.cos(angle);
              const textRotation = index * 90;
              
              return (
                <div
                  key={index}
                  className="absolute text-white/95 font-medium text-lg whitespace-nowrap"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: `translate(-50%, -50%) rotate(${textRotation}deg)`,
                    fontFamily: 'Inter Tight, sans-serif',
                  }}
                >
                  {feature.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Center Text with Animation - not rotating */}
      <div className="relative w-55 h-55 flex items-center justify-center z-10">
        <div className="relative w-full h-full overflow-hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className="absolute inset-0 flex items-center justify-center px-8"
              style={{
                opacity: currentIndex === index ? 1 : 0,
                transform: currentIndex === index 
                  ? 'translateY(0)' 
                  : isAnimating && currentIndex === (index + 1) % features.length
                    ? 'translateY(-100%)'
                    : 'translateY(100%)',
                transition: isAnimating 
                  ? 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-in-out'
                  : 'none',
              }}
            >
              <p className="text-base font-normal leading-[22.96px] text-white/90 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
