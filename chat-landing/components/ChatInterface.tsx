"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft, Volume2, Languages, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  time: string;
  isUser: boolean;
  avatar: string;
}

const messages: Message[] = [
  {
    text: "Hi! I'm ready to chat. Press the button to start speaking!",
    time: "7:11 PM",
    isUser: false,
    avatar: "/images/interview_alina.jpg"
  },
  {
    text: "Hey there! I'm excited to practice!",
    time: "7:11 PM",
    isUser: true,
    avatar: "/images/user_avatar.jpg"
  },
  {
    text: "You're about to have a second date with Alina... this is a more relaxed conversation where you already know a little about each other.",
    time: "7:11 PM",
    isUser: false,
    avatar: "/images/interview_alina.jpg"
  },
  {
    text: "Sounds good! I remember we talked about hiking last time.",
    time: "7:12 PM",
    isUser: true,
    avatar: "/images/user_avatar.jpg"
  },
  {
    text: "Yes! You mentioned you love hiking in the mountains. Have you been on any trails recently?",
    time: "7:12 PM",
    isUser: false,
    avatar: "/images/interview_alina.jpg"
  },
  {
    text: "Actually, I went to Mount Rainier last weekend. The views were incredible!",
    time: "7:13 PM",
    isUser: true,
    avatar: "/images/user_avatar.jpg"
  }
];

export function ChatInterface() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [timer, setTimer] = useState(0);
  const [barHeights, setBarHeights] = useState<number[]>(Array(8).fill(2));
  const [isInView, setIsInView] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const startAnimation = useCallback(async () => {
    setVisibleMessages(0);
    setIsAnimating(true);
    setTimer(0);
    setBarHeights(Array(8).fill(2));

    // Animate bars randomly (voice activity simulation)
    const barsInterval = setInterval(() => {
      setBarHeights(prev => prev.map(() => Math.random() * 8 + 2));
    }, 150);

    // Animate timer
    const timerInterval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 2000));
      setVisibleMessages(i + 1);
    }

    clearInterval(barsInterval);
    clearInterval(timerInterval);
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

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  return (
    <div ref={containerRef} className="w-full h-full bg-gray-100 flex flex-col relative">
      {/* Restart Button */}
      <button
        onClick={startAnimation}
        disabled={isAnimating}
        className="absolute bottom-4 right-4 z-20 p-1 hover:opacity-70 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Restart animation"
      >
        <RotateCcw className="w-5 h-5 text-gray-600" />
      </button>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-blue-100/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
         
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <img 
                src="/images/interview_alina.jpg" 
                alt="Alina" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.style.background = '#e5e7eb';
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900">Second Date with Alina</h3>
              
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-end h-6">
            {barHeights.map((height, i) => (
              <div 
                key={i} 
                style={{ height: `${height}px` }}
                className="w-1.5 bg-green-500 rounded-full transition-all duration-150"
              />
            ))}
          </div>
          <div className="px-3 py-1 bg-white rounded-full">
            <span className="text-sm font-medium">0:{timer.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-hide">
        <AnimatePresence mode="sync">
          {messages.slice(0, visibleMessages).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`flex gap-3 mb-2 ${message.isUser ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src={message.avatar}
                    alt={message.isUser ? "User" : "Agent"} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.style.background = message.isUser ? '#3b82f6' : '#e5e7eb';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                      : 'bg-white text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-tight">
                      {message.text}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                  {!message.isUser && (
                    <div className="flex gap-3 mt-2 ml-2">
                      <button className="p-1 hover:bg-white/50 rounded transition-colors">
                        <Volume2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-white/50 rounded transition-colors">
                        <Languages className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
