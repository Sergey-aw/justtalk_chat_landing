'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  avatar: string;
}

const messages: Message[] = [
  {
    id: 1,
    text: "Hey, Alina. Do you remember me?",
    isUser: true,
    avatar: "/images/user_avatar.jpg"
  },
  {
    id: 2,
    text: "Of course I do. It's nice to see you again. How have you been since we last spoke?",
    isUser: false,
    avatar: "/images/interview_alina.jpg"
  },
  {
    id: 3,
    text: "Would you mention what we've been talking about?",
    isUser: true,
    avatar: "/images/user_avatar.jpg"
  },
  {
    id: 4,
    text: "We talked a bit about our work, and I remember you mentioned your interest in hiking. I also shared a little about my love for pottery and how I find it quite meditative.",
    isUser: false,
    avatar: "/images/interview_alina.jpg"
  }
];

export function DialogueAnimation() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startAnimation = useCallback(async () => {
    setVisibleMessages([]);
    setIsAnimating(true);

    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 2000));
      setVisibleMessages(prev => [...prev, i]);
    }

    setIsAnimating(false);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (!hasStarted) {
              startAnimation();
              setHasStarted(true);
            }
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    obs.observe(containerRef.current);

    return () => obs.disconnect();
  }, [containerRef, hasStarted, startAnimation]);

  const handleReplay = () => {
    if (!isAnimating && isInView) {
      startAnimation();
      setHasStarted(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#F5F5F7] rounded-2xl overflow-hidden">
      <div className="flex flex-col gap-3 md:gap-4 p-3 md:p-6 overflow-y-auto h-full">
        <AnimatePresence>
          {messages.map((message, index) => {
            if (!visibleMessages.includes(index)) return null;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className={`flex gap-2 md:gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                    {/* Placeholder for avatar image */}
                  </div>
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  <div
                    className={`rounded-[18px] px-4 py-3 md:px-5 md:py-3.5 ${
                      message.isUser
                        ? 'bg-[#007AFF] text-white'
                        : 'bg-white text-black'
                    }`}
                    style={{
                      boxShadow: message.isUser ? 'none' : '0 1px 2px rgba(0,0,0,0.08)'
                    }}
                  >
                    <p className="text-sm md:text-[14px] leading-[1.4] font-normal m-0">
                      {message.text}
                    </p>
                  </div>
                  <span className="text-[11px] md:text-xs text-gray-500 mt-1 px-2">
                    9:24 PM
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Audio and Translate Icons */}
      {visibleMessages.length >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mt-2 ml-12"
        >
          <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.5v9M5.5 6v6M10.5 6v6" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="3" y="12" fontSize="10" fill="#666">中A</text>
            </svg>
          </button>
        </motion.div>
      )}

      {/* Replay Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={handleReplay}
        disabled={isAnimating}
        className="absolute bottom-3 right-3 w-7 h-7 md:w-8 md:h-8 rounded-full hover:bg-gray-200/50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <RotateCcw className="w-4 h-4 md:w-[18px] md:h-[18px] text-gray-600 group-hover:rotate-[-15deg] transition-transform" />
      </motion.button>
    </div>
  );
}
