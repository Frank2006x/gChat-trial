import { create } from "zustand";

export interface ChatMessage {
  _id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  hasError: boolean;
  sendMessage: (msg: { text: string; author: string }) => Promise<void>;
  fetchMessages: () => Promise<void>;
  appendMessage: (msg: ChatMessage) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  hasError: false,
  async fetchMessages() {
    set({ isLoading: true, hasError: false });
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error();
      const data = await res.json();
      set({
        messages: data.messages || [],
        isLoading: false,
        hasError: false,
      });
    } catch (e) {
      set({ isLoading: false, hasError: true });
    }
  },
  async sendMessage({ text, author }) {
    set({ isLoading: true, hasError: false });
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, author }),
      });
      if (!res.ok) throw new Error();
      const { message } = await res.json();
      set((state) => ({
        messages: [...state.messages, message],
        isLoading: false,
      }));
    } catch (e) {
      set({ isLoading: false, hasError: true });
    }
  },
  appendMessage(msg) {
    const exists = get().messages.some((m) => m._id === msg._id);
    if (exists) return;
    set((state) => ({ messages: [...state.messages, msg] }));
  },
}));
