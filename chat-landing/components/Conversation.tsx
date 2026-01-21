'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone } from 'lucide-react';
import posthog from 'posthog-js';
import { motion, AnimatePresence } from 'framer-motion';

interface ConversationProps {
  variant?: 'default' | 'hero';
}

export function Conversation({ variant = 'default' }: ConversationProps) {
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
      posthog.capture('voice_conversation_started', {
        variant,
      });
    },
    onDisconnect: () => {
      console.log('Disconnected');
      posthog.capture('voice_conversation_ended', {
        variant,
      });
    },
    onMessage: (message) => console.log('Message:', message),
    onError: (errorMessage, context) => {
      console.error('Error:', errorMessage, context);
      posthog.capture('voice_conversation_error', {
        error_message: errorMessage,
        error_context: context,
        variant,
      });
      posthog.captureException(new Error(errorMessage));
    },
  });

  const getSignedUrl = async (): Promise<string> => {
    const response = await fetch('/api/get-signed-url');
    if (!response.ok) {
      throw new Error(`Failed to get signed url: ${response.statusText}`);
    }
    const { signedUrl } = await response.json();
    return signedUrl;
  };

  const startConversation = useCallback(async () => {
    try {
      // Check if running in browser
      if (typeof window === 'undefined' || !navigator.mediaDevices) {
        throw new Error('Media devices not available');
      }

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get signed URL from server
      const signedUrl = await getSignedUrl();

      // Start the conversation with signed URL
      await conversation.startSession({
        signedUrl,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      posthog.capture('voice_conversation_error', {
        error_message: error instanceof Error ? error.message : String(error),
        error_type: 'start_conversation_failed',
        variant,
      });
      posthog.captureException(error);
    }
  }, [conversation, variant]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === 'connected';
  const isHeroVariant = variant === 'hero';

  return (
    <div className="relative flex flex-col items-center w-full min-h-[400px]">
      {/* Title/Description and Mic Icon share the same space */}
      <div className="h-48 flex items-center justify-center mb-2 md:mb-6">
        <AnimatePresence mode="wait">
          {!isConnected ? (
            isHeroVariant && (
              <motion.div 
                key="title"
                className="text-center space-y-3 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeInOut", delay: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
              >
                <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.5px]">
                  Try JustTalk AI Now
                </h3>
                <p className="text-white/90 text-base">
                  Start a voice conversation instantly—no signup required.
                </p>
              </motion.div>
            )
          ) : (
            <motion.div 
              key="mic"
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                conversation.isSpeaking 
                  ? 'bg-blue-500 animate-pulse' 
                  : 'bg-green-500'
              } transition-all duration-300`}>
                <Mic className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <p className={`text-sm font-medium capitalize ${
                  isHeroVariant ? 'text-white' : 'text-just_cod-gray'
                }`}>
                  {conversation.status}
                </p>
                <p className={`text-xs ${
                  isHeroVariant ? 'text-white/75' : 'text-just_cod-gray/75'
                }`}>
                  {conversation.isSpeaking ? 'Agent is speaking' : 'Listening...'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Button */}
      <div className="relative -mt-5 md:mt-0">
        <motion.div 
          className="flex gap-3"
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
        {!isConnected ? (
          <Button
            onClick={startConversation}
            size="lg"
            variant={isHeroVariant ? 'default' : 'default'}
            className={`cursor-pointer min-w-[200px] ${
              isHeroVariant ? 'bg-white text-just_cod-gray hover:bg-white/90' : ''
            }`}
          >
            <Phone className="w-4 h-4" />
            Start Talking
          </Button>
        ) : (
          <Button
            onClick={stopConversation}
            variant="outline"
            size="lg"
            className={`cursor-pointer min-w-[200px] ${
              isHeroVariant 
                ? 'bg-white text-just_cod-gray hover:bg-white/90 border-0'
                : 'border-red-500 text-red-500 hover:bg-red-50'
            }`}
          >
            <Phone className="w-4 h-4" />
            End Conversation
          </Button>
        )}
      </motion.div>

      {/* Info text when connected - Absolute positioned under button */}
      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-full">
        <AnimatePresence>
          {isConnected && (
            <motion.p 
              className={`text-xs text-center max-w-sm mx-auto ${
                isHeroVariant ? 'text-white/70' : 'text-just_cod-gray/60'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.15 }}
            >
              The conversation is limited to 2 minutes and it won't remember you afterwards.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
