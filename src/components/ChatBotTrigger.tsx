import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

interface ChatBotTriggerProps {
  onClick: () => void;
}

export const ChatBotTrigger: React.FC<ChatBotTriggerProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 mx-auto" />
        <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" />
      </div>
    </button>
  );
};