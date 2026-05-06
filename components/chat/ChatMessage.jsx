"use client";

import ReactMarkdown from "react-markdown";
import { Copy, Check, User, Bot } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export default function ChatMessage({ role, content }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAssistant = role === "assistant";

  return (
    <div className={clsx(
      "group flex w-full items-start gap-4 p-6 transition-colors",
      isAssistant ? "bg-zinc-900/50" : "bg-transparent"
    )}>
      <div className={clsx(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
        isAssistant ? "bg-white text-black border-zinc-200" : "bg-zinc-800 border-zinc-700 text-zinc-400"
      )}>
        {isAssistant ? <Bot size={18} /> : <User size={18} />}
      </div>
      
      <div className="flex-1 space-y-2 overflow-hidden px-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {isAssistant ? "SmartChat AI" : "You"}
          </span>
          {isAssistant && (
            <button
              onClick={copyToClipboard}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-white"
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
          )}
        </div>
        
        <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 max-w-none text-zinc-200">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
