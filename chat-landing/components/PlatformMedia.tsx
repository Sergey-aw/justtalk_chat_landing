'use client';

import { useState, useEffect, useRef } from 'react';
import posthog from 'posthog-js';

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

  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
      {/* Image - always rendered, hidden when video is loaded */}
      <img 
        src="/mobile_blue_16x9_3.jpg" 
        alt="JustTalk AI Platform on mobile device" 
        className={`w-full h-auto aspect-[9/16] md:aspect-auto object-cover transition-opacity duration-300 ${
          showVideo && isVideoLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'
        }`}
      />
      
      {/* Video - only rendered if feature flag is enabled */}
      {showVideo && (
        <video
          ref={videoRef}
          className={`w-full h-auto aspect-[9/16] md:aspect-auto object-cover transition-opacity duration-300 ${
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
      )}
    </div>
  );
}
