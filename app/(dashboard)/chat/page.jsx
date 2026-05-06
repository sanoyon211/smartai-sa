"use client";

import { useState } from "react";
import Sidebar from "@/components/chat/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";

export default function ChatPage() {
  const { 
    messages, 
    setMessages, 
    sendMessage, 
    loading, 
    error, 
    conversationId, 
    setConversationId,
    resetChat 
  } = useChat();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectConversation = (conv) => {
    setConversationId(conv.id);
    setMessages(conv.messages);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar 
        onNewChat={resetChat} 
        currentConversationId={conversationId}
        onSelectConversation={handleSelectConversation}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-14 border-b border-zinc-900 flex items-center px-4 md:px-8 bg-black/50 backdrop-blur-md sticky top-0 z-30">
          <h1 className="text-sm font-semibold tracking-tight text-zinc-400">
            SmartChat <span className="text-white">AI</span>
          </h1>
        </header>

        <ChatWindow 
          messages={messages} 
          loading={loading} 
          error={error} 
          onRetry={() => sendMessage(messages[messages.length - 1]?.content)}
        />
        
        <ChatInput 
          onSendMessage={sendMessage} 
          disabled={loading} 
        />
      </main>
    </div>
  );
}
