import React, { useState } from "react";
import {
  SquarePen,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  MessageSquare,
} from "lucide-react";

import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/authSlice";
import type { ChatItem } from "../types/chat";

interface SidebarProps {
  onNewChat: () => void;
  activeChatId?: string | null;
  onSelectChat?: (chatId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onNewChat,
  activeChatId,
  onSelectChat,
}) => {
  const dispatch = useAppDispatch();

  const sampleChats: ChatItem[] = [
    { id: "1", title: "Azure OpenAI Setup" },
    { id: "2", title: "RAG Chunking Strategies" },
    { id: "3", title: "Document Embedding Pipeline" },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between p-3 select-none`}
    >
      {/* ──────────────── TOP SECTION ──────────────── */}
      <div className="flex flex-col gap-2">
        {/* 1. Header with Collapse / Expand Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-2"
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
          </button>
        </div>
        {/* 2. "New chat" Button (from your screenshot!) */}
        <button
          onClick={onNewChat}
          className={`flex items-center gap-3 w-full p-2.5 rounded-lg text-slate-200 hover:bg-slate-800/80 transition text-sm font-medium ${
            !isOpen ? "justify-center" : ""
          }`}
          title="New chat"
        >
          {/* Pen / Edit icon matching your screenshot */}
          <SquarePen size={18} className="text-slate-300 shrink-0" />
          {isOpen && <span>New chat</span>}
        </button>
        {/* 3. Recent Chats Header & List */}
        {isOpen && (
          <div className="mt-4 flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">
              Recent chats
            </span>
            {/* List of recent chat sessions */}
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[60vh]">
              {sampleChats.map((chat) => {
                const isActive = activeChatId === chat.id;
                return (
                  <button
                    key={chat.id}
                    onClick={() => onSelectChat?.(chat.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition text-left truncate ${
                      isActive
                        ? "bg-slate-800 text-emerald-400 font-medium"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                    title={chat.title}
                  >
                    <MessageSquare size={16} className="shrink-0 opacity-70" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* ──────────────── BOTTOM SECTION ──────────────── */}
      <div className="border-t border-slate-900 pt-2">
        <button
          onClick={() => dispatch(logout())}
          className={`p-2.5 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 rounded-lg transition flex items-center gap-2.5 w-full text-sm font-medium ${
            !isOpen ? "justify-center" : ""
          }`}
          title="Log Out"
        >
          <LogOut size={18} className="shrink-0" />
          {isOpen && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};
