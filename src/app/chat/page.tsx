"use client";

import { useEffect, useRef, useState } from "react";
import { useChatStore, ChatMessage } from "@/store/chat-store";

export default function Chat() {
  const { messages, isLoading, hasError, sendMessage, fetchMessages } =
    useChatStore();
  const [input, setInput] = useState("");
  const [author, setAuthor] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ text: input, author: author || undefined });
    setInput("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-2xl flex-1 flex-col border-x border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            ChattrBox — Global Chat
          </span>
        </header>
        <section className="flex-1 overflow-y-auto p-6 flex flex-col gap-3 text-zinc-800 dark:text-zinc-100">
          {hasError && (
            <div className="mb-2 text-center text-sm text-red-500">
              Error loading messages.
            </div>
          )}
          {messages.length === 0 && !isLoading && !hasError && (
            <div className="my-auto text-center text-zinc-400 dark:text-zinc-600">
              No messages yet. Be the first!
            </div>
          )}
          {messages.map((msg: ChatMessage) => (
            <div
              key={msg._id}
              className="flex flex-col rounded-lg bg-zinc-100 p-3 shadow dark:bg-zinc-900"
            >
              <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                {msg.author} ·{" "}
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="mt-1 text-base text-zinc-900 dark:text-zinc-100">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-zinc-100 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <input
            type="text"
            className="w-1/3 rounded border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-700"
            placeholder="Your name (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isLoading}
            maxLength={32}
            autoComplete="username"
          />
          <input
            type="text"
            className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-700"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            maxLength={2000}
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || input.trim() === ""}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isLoading ? "…" : "Send"}
          </button>
        </form>
      </main>
    </div>
  );
}
