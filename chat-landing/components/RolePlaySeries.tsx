'use client';

import { useEffect, useRef } from 'react';
import React from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { 
  MessageCircle, 
  Coffee, 
  Users, 
  Heart, 
  MessageSquare,
  Briefcase,
  FileText,
  Handshake,
  Plane,
  ShoppingCart,
  BookOpen,
  Check,
  Lock,
  Play,
  type LucideIcon
} from 'lucide-react';

interface ScenarioStep {
  title: string;
  subtitle: string;
  status: 'completed' | 'available' | 'locked';
  progress?: number;
  duration: string;
  sessions?: number;
}

interface RolePlaySeries {
  topic: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  steps: ScenarioStep[];
}

const rolePlaySeries: RolePlaySeries[] = [
  {
    topic: 'Free Conversation',
    icon: MessageCircle,
    color: 'bg-blue-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Casual Chat', subtitle: 'Open-ended conversation', status: 'completed', progress: 75, duration: '2 min', sessions: 1 },
      { title: 'Share Experiences', subtitle: 'Talk about your day', status: 'available', duration: '2 min' },
      { title: 'Discuss Interests', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
      { title: 'Debate Topics', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
      { title: 'Advanced Discussion', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '4 min' },
    ]
  },
  {
    topic: 'Small Talk',
    icon: Coffee,
    color: 'bg-purple-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Weather Chat', subtitle: 'Breaking the ice', status: 'completed', progress: 100, duration: '1 min', sessions: 1 },
      { title: 'Weekend Plans', subtitle: 'Casual catch-up', status: 'available', duration: '1 min' },
      { title: 'Hobby Discussion', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Sports Talk', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '1 min' },
      { title: 'Current Events', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
    ]
  },
  {
    topic: 'Social Situations',
    icon: Users,
    color: 'bg-pink-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Meeting New People', subtitle: 'Introduce yourself', status: 'completed', progress: 85, duration: '1 min', sessions: 1 },
      { title: 'Party Conversation', subtitle: 'Mingle with guests', status: 'available', duration: '2 min' },
      { title: 'Group Discussion', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Making Plans', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Keeping in Touch', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '1 min' },
    ]
  },
  {
    topic: 'Dating',
    icon: Heart,
    color: 'bg-rose-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Speed Date', subtitle: 'First date with someone new', status: 'completed', progress: 75, duration: '1 min', sessions: 1 },
      { title: 'Calling to Schedule', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '1 min' },
      { title: 'Second Date - Restaurant', subtitle: 'Continue the conversation', status: 'available', duration: '1 min' },
      { title: 'Post-Date Chat', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '1 min' },
      { title: 'Dating Freetalk', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '1 min' },
    ]
  },
  {
    topic: 'Deep Conversations',
    icon: MessageSquare,
    color: 'bg-red-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Values & Beliefs', subtitle: 'Share your worldview', status: 'completed', progress: 60, duration: '3 min', sessions: 1 },
      { title: 'Life Goals', subtitle: 'Discuss aspirations', status: 'available', duration: '2 min' },
      { title: 'Cultural Differences', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
      { title: 'Personal Challenges', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
      { title: 'Philosophy & Ethics', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '4 min' },
    ]
  },
  {
    topic: 'Job Interview',
    icon: Briefcase,
    color: 'bg-indigo-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Phone Screening', subtitle: 'Initial recruiter call', status: 'completed', progress: 100, duration: '2 min', sessions: 1 },
      { title: 'Technical Interview', subtitle: 'Discuss your skills', status: 'available', duration: '3 min' },
      { title: 'Behavioral Interview', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
      { title: 'Final Round', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
      { title: 'Salary Negotiation', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
    ]
  },
  {
    topic: 'Work Conversations',
    icon: FileText,
    color: 'bg-cyan-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Team Meeting', subtitle: 'Participate in discussion', status: 'completed', progress: 90, duration: '3 min', sessions: 1 },
      { title: 'Project Update', subtitle: 'Present your progress', status: 'available', duration: '2 min' },
      { title: 'Conflict Resolution', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
      { title: 'Performance Review', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Client Presentation', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '4 min' },
    ]
  },
  {
    topic: 'Networking',
    icon: Handshake,
    color: 'bg-teal-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Introduction', subtitle: 'Present yourself professionally', status: 'completed', progress: 80, duration: '1 min', sessions: 1 },
      { title: 'Elevator Pitch', subtitle: 'Sell your skills in 60 seconds', status: 'available', duration: '1 min' },
      { title: 'Industry Discussion', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Follow-up Conversation', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Closing & Exchange', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '1 min' },
    ]
  },
  {
    topic: 'Travel',
    icon: Plane,
    color: 'bg-sky-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Airport Check-in', subtitle: 'Navigate the airport', status: 'completed', progress: 100, duration: '1 min', sessions: 1 },
      { title: 'Hotel Booking', subtitle: 'Reserve a room', status: 'completed', progress: 85, duration: '1 min', sessions: 1 },
      { title: 'Restaurant Order', subtitle: 'Order food', status: 'available', duration: '2 min' },
      { title: 'Asking for Directions', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '1 min' },
      { title: 'Emergency Situations', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
    ]
  },
  {
    topic: 'Daily Life',
    icon: ShoppingCart,
    color: 'bg-amber-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Shopping at Store', subtitle: 'Buy groceries', status: 'completed', progress: 100, duration: '1 min', sessions: 1 },
      { title: 'Bank Visit', subtitle: 'Handle financial matters', status: 'available', duration: '2 min' },
      { title: 'Doctor Appointment', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Phone Customer Service', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
      { title: 'Making Complaints', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
    ]
  },
  {
    topic: 'Skill Practice',
    icon: BookOpen,
    color: 'bg-emerald-100/70',
    bgColor: 'bg-orange-50/40',
    steps: [
      { title: 'Grammar Focus', subtitle: 'Practice specific structures', status: 'completed', progress: 70, duration: '2 min', sessions: 1 },
      { title: 'Vocabulary Building', subtitle: 'Learn new words in context', status: 'available', duration: '2 min' },
      { title: 'Pronunciation Drill', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Idioms & Expressions', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '2 min' },
      { title: 'Advanced Patterns', subtitle: 'Complete previous step to unlock', status: 'locked', duration: '3 min' },
    ]
  },
];

interface StepCardProps {
  step: ScenarioStep;
  index: number;
}

function StepCard({ step, index }: StepCardProps) {
  const getStatusIcon = () => {
    if (step.status === 'completed') {
      return <Check className="w-4 h-4 text-white" />;
    } else if (step.status === 'locked') {
      return <Lock className="w-4 h-4 text-gray-400" />;
    }
    return <Play className="w-4 h-4 text-gray-500" />;
  };

  const getStatusBg = () => {
    if (step.status === 'completed') return 'bg-green-500';
    if (step.status === 'locked') return 'bg-gray-200';
    return 'bg-orange-50 border border-orange-200';
  };

  const cardBg = step.status === 'locked' ? 'bg-gray-50/80 border-gray-200' : 'bg-white';
  const textOpacity = step.status === 'locked' ? 'opacity-50' : '';

  return (
    <div className={`${cardBg} border rounded-2xl p-3 transition-all hover:shadow-md flex gap-3`}>
      {/* Number badge */}
      <div className={`w-5 h-5 rounded-full ${getStatusBg()} flex items-center justify-center flex-shrink-0`}>
        {step.status === 'completed' || step.status === 'locked' ? (
          getStatusIcon()
        ) : (
          <span className="text-sm font-semibold text-orange-700">{index + 1}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className={`font-medium text-sm leading-tight text-gray-900 ${textOpacity}`}>
            {step.title}
          </h4>
          {step.status === 'available' && (
            <Play className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0" />
          )}
        </div>
        <p className={`text-xs text-gray-600 ${textOpacity} mb-0`}>{step.subtitle}</p>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {step.status === 'completed' && step.progress && (
            <div className="flex items-center gap-1.5">
              <div className="w-18 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${step.progress}%` }}
                />
              </div>
              <span className="font-medium">{step.progress}%</span>
            </div>
          )}
          {step.sessions && (
            <span className="flex items-center gap-1">
              <Play className="w-3 h-3" />
              {step.sessions} {step.sessions > 1 ? 's' : ''}
            </span>
          )}
          
        </div>
      </div>
    </div>
  );
}

interface SeriesBannerProps {
  series: RolePlaySeries;
}

function SeriesBanner({ series }: SeriesBannerProps) {
  const Icon = series.icon;

  return (
    <div className={`${series.bgColor} rounded-3xl border border-orange-100 shadow-sm overflow-hidden flex-shrink-0 w-[300px] h-full flex flex-col`}>
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-3 mb-4">
          <div className={`${series.color} rounded-xl w-10 h-10 flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-amber-900" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-medium text-base text-orange-900/90 leading-tight">{series.topic}</h3>
            
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 px-6 pb-4 space-y-2 overflow-y-auto">
        {series.steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
}

interface ScrollingRowProps {
  series: RolePlaySeries[];
  direction?: 'left' | 'right';
  offset?: number;
}

function ScrollingRow({ series, direction = 'left', offset = 0 }: ScrollingRowProps) {
  const x = useMotionValue(offset);
  const controls = useAnimation();
  const isDragging = useRef(false);
  const bannerWidth = 300;
  const gap = 16;
  const totalWidth = series.length * (bannerWidth + gap);

  // Update x position when offset prop changes
  useEffect(() => {
    x.set(offset);
  }, [offset, x]);

  // No automatic scrolling animation

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const duplicatedSeries = [...series, ...series, ...series];

  return (
    <div className="relative w-full py-1 max-w-full overflow-hidden">
      <motion.div
        className="flex gap-4"
        drag="x"
        dragConstraints={{ left: -totalWidth * 2, right: 0 }}
        dragElastic={0.1}
        dragMomentum={true}
        dragTransition={{ 
          power: 0.3,
          timeConstant: 200
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x }}
      >
        {duplicatedSeries.map((series, index) => (
          <SeriesBanner key={`${series.topic}-${index}`} series={series} />
        ))}
      </motion.div>
    </div>
  );
}

export function RolePlaySeries() {
  // Position Dating card (index 3) in the middle
  // Calculate offset dynamically based on container width
  const [offset, setOffset] = React.useState(-800);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateOffset = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const cardWidth = 300;
      const gap = 16;
      const datingIndex = 3; // Dating is the 4th card (0-indexed)
      
      // Calculate offset to center the Dating card
      // Offset = -(cards before Dating * (cardWidth + gap)) + (containerWidth / 2) - (cardWidth / 2)
      const calculatedOffset = -(datingIndex * (cardWidth + gap)) + (containerWidth / 2) - (cardWidth / 2);
      setOffset(calculatedOffset);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-4 w-full overflow-hidden max-w-full h-full">
      <ScrollingRow series={rolePlaySeries} direction="left" offset={offset} />
    </div>
  );
}
