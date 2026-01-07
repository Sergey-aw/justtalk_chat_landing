'use client';

import { useEffect, useState, useRef } from 'react';

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
    description: 'JustTalk identifies meaningful patterns in your speaking — vocabulary usage, recurring issues, and communication habits.',
  },
  {
    title: 'Adapt',
    description: 'Future conversations, questions, and lessons adjust automatically.',
  },
  {
    title: 'Continue',
    description: 'You pick up where you left off. Nothing resets.',
  },
];

export function CircularRotation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Auto-rotation
  useEffect(() => {
    const startAutoRotate = () => {
      autoRotateIntervalRef.current = setInterval(() => {
        if (!isDragging) {
          setIsAnimating(true);
          setRotation((prev) => prev + 90);
          setCurrentIndex((prev) => (prev + 1) % features.length);
          
          setTimeout(() => {
            setIsAnimating(false);
          }, 800);
        }
      }, 4000);
    };

    startAutoRotate();

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [isDragging]);

  const radius = 150;
  const centerX = 150;
  const centerY = 150;

  // Calculate angle from center
  const getAngle = (clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  // Handle drag start
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setIsAnimating(false);
    lastAngleRef.current = getAngle(clientX, clientY);
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Handle drag move
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const currentAngle = getAngle(clientX, clientY);
    const deltaAngle = currentAngle - lastAngleRef.current;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTimeRef.current;
    
    // Calculate velocity
    if (deltaTime > 0) {
      velocityRef.current = deltaAngle / deltaTime * 16; // Normalize to 60fps
    }
    
    setRotation((prev) => prev + deltaAngle);
    lastAngleRef.current = currentAngle;
    lastTimeRef.current = currentTime;
  };

  // Handle drag end with inertia
  const handleEnd = () => {
    setIsDragging(false);
    setVelocity(velocityRef.current);
    
    // Apply inertia
    const applyInertia = () => {
      velocityRef.current *= 0.95; // Friction
      
      if (Math.abs(velocityRef.current) > 0.1) {
        setRotation((prev) => prev + velocityRef.current);
        animationFrameRef.current = requestAnimationFrame(applyInertia);
      } else {
        // Snap to nearest 90 degree position
        setRotation((prev) => {
          const normalized = prev % 360;
          const nearest = Math.round(normalized / 90) * 90;
          const targetRotation = prev - normalized + nearest;
          return targetRotation;
        });
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 800);
      }
    };
    
    if (Math.abs(velocityRef.current) > 0.1) {
      applyInertia();
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Update current index based on rotation
  useEffect(() => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const index = Math.round(normalizedRotation / 90) % features.length;
    setCurrentIndex(index);
  }, [rotation]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }}
    >
      {/* Animated rotating container */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : isAnimating ? 'transform 0.8s cubic-bezier(0.34, 1.15, 0.64, 1)' : 'transform 0.5s ease-out',
          willChange: isDragging ? 'transform' : 'auto',
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
            r="145"
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
              fontSize="21"
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
              className="absolute inset-0 flex items-center justify-center px-2"
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
