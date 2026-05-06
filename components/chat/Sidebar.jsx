"use client";

import { useEffect, useState } from "react";
import { MessageSquarePlus, LogOut, MessageSquare, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import { clsx } from "clsx";

export default function Sidebar({ 
  onNewChat, 
  currentConversationId, 
  onSelectConversation, 
  isOpen, 
  setIsOpen 
}) {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchConversations();
    }
  }, [session, currentConversationId]);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/conversations");
      const data = await res.json();
      if (Array.isArray(data)) setConversations(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <>
      {/* Mobile Toggle */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white md:hidden"
        >
          <PanelLeftOpen size={20} />
        </button>
      )}

      <aside className={clsx(
        "fixed inset-y-0 left-0 z-40 w-72 bg-zinc-950 border-r border-zinc-900 flex flex-col transition-transform duration-300 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b border-zinc-900 flex items-center justify-between">
          <button
            onClick={onNewChat}
            className="flex-1 flex items-center gap-2 bg-white text-black font-medium py-2 px-4 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            <MessageSquarePlus size={18} />
            <span>New Chat</span>
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="ml-2 p-2 text-zinc-500 hover:text-white md:hidden"
          >
            <PanelLeftClose size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            History
          </div>
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors",
                currentConversationId === conv.id 
                  ? "bg-zinc-900 text-white" 
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              )}
            >
              <MessageSquare size={16} className="shrink-0" />
              <span className="truncate">{conv.title}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-900 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Avatar src={session?.user?.image} name={session?.user?.name} />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{session?.user?.name}</p>
              <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
