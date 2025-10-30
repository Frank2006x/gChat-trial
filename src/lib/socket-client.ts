import { io, Socket } from "socket.io-client";
import type { ChatMessage } from "@/store/chat-store";

let socket: Socket | null = null;

export function getClientSocket(): Socket {
  if (!socket) {
    socket = io({ path: "/api/socket" });
  }
  return socket;
}

export type IncomingMessageEvent = ChatMessage;


