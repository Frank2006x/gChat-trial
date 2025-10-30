"use client";

import { useEffect, useRef, useState } from "react";
import { useChatStore, ChatMessage } from "@/store/chat-store";
import { getClientSocket } from "@/lib/socket-client";

const USERNAME_KEY = "cb_username";

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  if (isToday) return "Today";
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString();
}

export default function Chat() {
  const { messages, isLoading, hasError, sendMessage, fetchMessages, appendMessage } =
    useChatStore();
  const [input, setInput] = useState("");
  const [author, setAuthor] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(USERNAME_KEY) : null;
    if (saved) setAuthor(saved);
  }, []);

  useEffect(() => {
    const socket = getClientSocket();
    const handler = (msg: ChatMessage) => appendMessage(msg);
    socket.on("chat message", handler);
    return () => {
      socket.off("chat message", handler);
    };
  }, [appendMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      nameInputRef.current?.focus();
      return;
    }
    if (!input.trim()) return;
    await sendMessage({ text: input, author: author.trim() });
    setInput("");
  };

  const handleAuthorChange = (value: string) => {
    setAuthor(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(USERNAME_KEY, value);
    }
  };

  const isUsernameMissing = author.trim() === "";

  // Precompute simple day dividers
  const itemsWithDividers: Array<{ type: "divider"; label: string } | { type: "msg"; msg: ChatMessage }> = [];
  let lastDay: string | null = null;
  for (const msg of messages) {
    const day = formatDay(msg.createdAt);
    if (day !== lastDay) {
      itemsWithDividers.push({ type: "divider", label: day });
      lastDay = day;
    }
    itemsWithDividers.push({ type: "msg", msg });
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(16,185,129,0.25),transparent),radial-gradient(1200px_600px_at_110%_0,rgba(20,83,45,0.35),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(5,150,105,0.25),transparent),radial-gradient(1200px_600px_at_110%_0,rgba(2,44,34,0.45),transparent)]">
      <main className="flex w-full max-w-3xl flex-1 flex-col border-x border-zinc-200/40 bg-transparent dark:border-zinc-800/40">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-zinc-200/40 bg-black/5 px-4 backdrop-blur dark:border-zinc-800/40 dark:bg-black/30">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            ChattrBox
          </span>
          <div className="flex items-center gap-2">
            <input
              ref={nameInputRef}
              type="text"
              className="w-40 rounded-full border border-emerald-400/60 bg-white/80 px-3 py-1 text-xs text-zinc-900 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none dark:border-emerald-700/60 dark:bg-zinc-900/60 dark:text-zinc-100"
              placeholder="Username"
              value={author}
              onChange={(e) => handleAuthorChange(e.target.value)}
              maxLength={32}
            />
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 text-zinc-800 dark:text-zinc-100">
          {hasError && (
            <div className="mb-2 text-center text-sm text-red-500">
              Error loading messages.
            </div>
          )}

          {isUsernameMissing && (
            <div className="mx-auto mb-2 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-medium text-amber-800 shadow dark:bg-amber-900/30 dark:text-amber-300">
              Set a username to start chatting
            </div>
          )}

          {itemsWithDividers.map((item, idx) => {
            if (item.type === "divider") {
              return (
                <div key={`d-${idx}`} className="my-2 flex justify-center">
                  <span className="rounded-full bg-black/10 px-3 py-1 text-[10px] font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300">
                    {item.label}
                  </span>
                </div>
              );
            }
            const msg = item.msg;
            const isOwn = author.trim() !== "" && msg.author === author.trim();
            return (
              <div key={msg._id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`${isOwn ? "bg-emerald-600 text-white" : "bg-zinc-900 text-zinc-100"} max-w-[75%] rounded-2xl px-3 py-2 shadow-md`}
                >
                  <div className="text-[11px] opacity-80">
                    {isOwn ? "You" : msg.author}
                  </div>
                  <div className="text-sm leading-snug">{msg.text}</div>
                  <div className="mt-1 text-[10px] opacity-70 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </section>

        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 z-10 flex items-center gap-2 border-t border-zinc-200/40 bg-black/5 px-4 py-3 backdrop-blur dark:border-zinc-800/40 dark:bg-black/30"
        >
          <input
            type="text"
            className="flex-1 rounded-full border border-zinc-300 bg-white/90 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            placeholder={isUsernameMissing ? "Enter a username first" : "Type a message"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isUsernameMissing}
            maxLength={2000}
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || isUsernameMissing || input.trim() === ""}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 hover:bg-emerald-500"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
