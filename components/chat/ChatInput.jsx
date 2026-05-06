"use client";

import { SendHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="border-t border-zinc-800 bg-black p-4 pb-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-end gap-2 bg-zinc-900 rounded-xl border border-zinc-800 p-2 focus-within:border-zinc-700 transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent border-none focus:ring-0 text-white resize-none py-2 px-3 min-h-[44px] max-h-[200px]"
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="bg-white text-black p-2 rounded-lg hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-white transition-all shrink-0 mb-1"
        >
          <SendHorizontal size={20} />
        </button>
      </form>
      <p className="text-[10px] text-zinc-600 text-center mt-3 uppercase tracking-widest font-semibold">
        SmartChat AI can make mistakes. Check important info.
      </p>
    </div>
  );
}
