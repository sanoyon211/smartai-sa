"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ChatWindow({ messages, loading, error, onRetry }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (messages.length === 0 && !loading && !error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-6">
        <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
          <div className="w-10 h-10 bg-white rounded-lg"></div>
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tighter">How can I help you today?</h2>
          <p className="text-zinc-500">Start a conversation with SmartChat AI. I can help with coding, writing, analysis, and more.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
          {[
            "Explain quantum computing simply",
            "Write a short story about a time traveler",
            "Help me debug this JavaScript function",
            "Give me ideas for a healthy meal plan"
          ].map((suggestion) => (
            <button
              key={suggestion}
              className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-left text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
      <div className="max-w-4xl mx-auto divide-y divide-zinc-900/50">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        
        {loading && <TypingIndicator />}
        
        {error && (
          <div className="p-6 bg-red-500/5 border-t border-b border-red-500/10 flex items-center gap-4">
            <AlertCircle className="text-red-500 shrink-0" size={20} />
            <div className="flex-1 text-sm text-red-500/80">
              {error}
            </div>
            <button
              onClick={onRetry}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
            >
              <RefreshCcw size={14} />
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
