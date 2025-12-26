'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone } from 'lucide-react';

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
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
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === 'connected';

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status Indicator */}
      <div className="flex flex-col items-center gap-2">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isConnected 
            ? conversation.isSpeaking 
              ? 'bg-blue-500 animate-pulse' 
              : 'bg-green-500'
            : 'bg-just_black-5'
        } transition-all duration-300`}>
          {isConnected ? (
            <Mic className="w-8 h-8 text-white" />
          ) : (
            <MicOff className="w-8 h-8 text-just_cod-gray/50" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-just_cod-gray capitalize">
            {conversation.status}
          </p>
          {isConnected && (
            <p className="text-xs text-just_cod-gray/75">
              {conversation.isSpeaking ? 'Agent is speaking' : 'Listening...'}
            </p>
          )}
        </div>
      </div>

      {/* Control Button */}
      <div className="flex gap-3">
        {!isConnected ? (
          <Button
            onClick={startConversation}
            size="lg"
            className="cursor-pointer min-w-[180px]"
          >
            <Phone className="w-4 h-4" />
            Start Talking
          </Button>
        ) : (
          <Button
            onClick={stopConversation}
            variant="outline"
            size="lg"
            className="cursor-pointer min-w-[180px] border-red-500 text-red-500 hover:bg-red-50"
          >
            <Phone className="w-4 h-4" />
            End Conversation
          </Button>
        )}
      </div>

      {/* Info Text */}
      {!isConnected && (
        <p className="text-xs text-just_cod-gray/60 text-center max-w-sm">
          Click to start a voice conversation. You'll be asked for microphone permission.
        </p>
      )}
    </div>
  );
}
