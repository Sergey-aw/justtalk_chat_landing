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
          transition: 'transform 0.8s cubic-bezier(0.34, 1.15, 0.64, 1)',
        }}
      >
        {/* Dashed Circle and Text */}
        <svg
          className="w-[340px] h-[340px]"
          viewBox="-20 -20 340 340"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Create circular paths for curved text - positioned at top, right, bottom, left */}
            {/* Top - Speak */}
            <path
              id="circlePath0"
              d="M 100,10 A 160,160 0 0,1 200,10"
              fill="none"
            />
            {/* Right - Analyze */}
            <path
              id="circlePath1"
              d="M 290,100 A 160,160 0 0,1 290,200"
              fill="none"
            />
            {/* Bottom - Adapt */}
            <path
              id="circlePath2"
              d="M 200,290 A 160,160 0 0,1 100,290"
              fill="none"
            />
            {/* Left - Continue */}
            <path
              id="circlePath3"
              d="M 10,200 A 160,160 0 0,1 10,100"
              fill="none"
            />
          </defs>
          
          {/* Dashed circle */}
          <circle
            cx="150"
            cy="150"
            r="150"
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          
          {/* Curved text labels along the circle */}
          {features.map((feature, index) => (
            <text
              key={`text-${index}`}
              fill="rgba(255, 255, 255, 0.95)"
              fontSize="20"
              fontWeight="500"
              fontFamily="Inter Tight, sans-serif"
              letterSpacing="0.1"
            >
              <textPath 
                href={`#circlePath${index}`} 
                startOffset="50%" 
                textAnchor="middle"
              >
                {feature.title}
              </textPath>
            </text>
          ))}
        </svg>
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
                  ? 'transform 0.8s cubic-bezier(0.34, 1.15, 0.64, 1), opacity 0.4s ease-in-out'
                  : 'none',
              }}
            >
              <p className="text-base font-normal leading-tight text-white/80 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
