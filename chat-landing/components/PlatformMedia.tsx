'use client';

import { useState, useEffect, useRef } from 'react';
import posthog from 'posthog-js';

const features = [
  {
    title: "Speak freely, not through exercises",
    description: "Have real conversations instead of filling blanks or repeating sentences."
  },
  {
    title: "Get feedback based on your speech",
    description: "JustTalk AI adapts to your vocabulary, grammar patterns, and recurring mistakes."
  },
  {
    title: "Keep improving across sessions",
    description: "Your practice doesn't reset. The AI remembers your progress and adjusts over time."
  }
];

export function PlatformMedia() {
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check feature flag: mobile_video_hero
    // When FALSE/disabled: show image (previous version)
    // When TRUE/enabled: show video (new version)
    const checkFeatureFlag = () => {
      const flagEnabled = posthog.isFeatureEnabled('mobile_video_hero');
      setShowVideo(!!flagEnabled);
    };

    // Initial check
    checkFeatureFlag();

    // Listen for feature flag changes
    const unsubscribe = posthog.onFeatureFlags(checkFeatureFlag);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      // Preload video
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
      };

      video.addEventListener('canplaythrough', handleCanPlay);
      
      // Start loading
      video.load();

      return () => {
        video.removeEventListener('canplaythrough', handleCanPlay);
      };
    }
  }, [showVideo, isMobile]);

  const videoSrc = isMobile 
    ? '/phone_chat_ai.mp4'
    : '/phone_justtalk_ai_landscape.mp4';

  // If feature flag is disabled, show original image only
  if (!showVideo) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden">
        <img 
          src="/mobile_blue_16x9_3.jpg" 
          alt="JustTalk AI Platform on mobile device" 
          className="w-full h-auto aspect-[9/16] md:aspect-auto object-cover"
        />
      </div>
    );
  }

  // Feature flag enabled: show new layout with video and features
  return (
    <div className="flex flex-col md:flex-row md:gap-16 md:items-center">
      {/* Video Container - Left side on desktop */}
      <div className="relative w-full md:w-1/2 md:max-w-[500px] rounded-2xl overflow-hidden">
        {/* Image - shown while video loads */}
        <img 
          src="/mobile_blue_16x9_3.jpg" 
          alt="JustTalk AI Platform on mobile device" 
          className={`w-full h-auto aspect-[9/16] md:aspect-[4/3] object-cover transition-opacity duration-300 ${
            isVideoLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'
          }`}
        />
        
        {/* Video */}
        <video
          ref={videoRef}
          className={`w-full h-auto aspect-[9/16] md:aspect-square object-cover transition-opacity duration-300 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Features List - Right side on desktop, hidden on mobile */}
      <div className="hidden md:flex flex-col justify-center space-y-6 md:space-y-8 md:flex-1">
        {features.map((feature, index) => (
          <div key={index} className="space-y-1">
            <h3 className="text-lg md:text-xl font-medium tracking-[-0.5px] text-just_cod-gray">
              {feature.title}
            </h3>
            <p className="text-sm md:text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
