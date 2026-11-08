import React, { useState } from "react";

import { Plus, ArrowUp } from "lucide-react";

import { Sidebar } from "./Sidebar";

import { useAppSelector } from "../store/hooks";

import { logout } from "../store/authSlice";

export const HomeScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [inputQuery, setInputQuery] = useState("");

  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    console.log("User sent query:", inputQuery);

    setInputQuery("");
  };

  const handleUploadClick = () => {
    alert(
      "Upload document clicked! (We will connect file picker in the next step)",
    );
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setInputQuery("");
    console.log("Started a new chat");
  };

  function getGreeting(): string {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100 overflow-hidden">
      {/* ──────────────── 1. SIDEBAR ──────────────── */}
      <Sidebar
        onNewChat={handleNewChat}
        activeChatId={activeChatId}
        onSelectChat={(id) => setActiveChatId(id)}
      />

      {/* ──────────────── 2. MAIN AREA ──────────────── */}
      <main className="flex-1 flex flex-col justify-between h-full bg-slate-900">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-emerald-400">
            Azure AI RAG Assistant
          </h1>
          <h2 className="text-2xl md:text-xl font-serif text-slate-100 font-normal tracking-wide">
            {getGreeting()}, {user?.fullName || "User"}
          </h2>
        </header>
        {/* Middle Area: Where messages will appear later */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-slate-500">
          <p className="text-center text-sm">
            Ask a question or upload a document to get started.
          </p>
        </div>
        {/* Bottom Area: The Search / Query Bar with + and Arrow */}
        <div className="p-4 border-t border-slate-800 flex justify-center">
          <form
            onSubmit={handleSendQuery}
            className="w-full max-w-3xl flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition"
          >
            {/* 1. "+" Icon to upload document */}
            <button
              type="button"
              onClick={handleUploadClick}
              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 rounded-lg transition"
              title="Upload document"
            >
              <Plus size={20} />
            </button>
            {/* 2. Text input for entering query */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Type your message or question here..."
              className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none px-2"
            />
            {/* 3. Arrow icon to enter / send query */}
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition"
              title="Send message"
            >
              <ArrowUp size={20} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
