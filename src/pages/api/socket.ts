import type { NextApiRequest } from "next";
import type { Server as HTTPServer } from "http";
import type { Socket } from "net";
import { Server as IOServer } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface NextApiResponseWithSocket extends Response {
  socket: Socket & { server: SocketServer };
}

export default function handler(req: NextApiRequest, res: any) {
  const resWithSocket = res as NextApiResponseWithSocket;
  if (!resWithSocket.socket.server.io) {
    const io = new IOServer(resWithSocket.socket.server as unknown as HTTPServer, {
      path: "/api/socket",
      cors: { origin: true, methods: ["GET", "POST"] },
    });
    resWithSocket.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("disconnect", () => {});
    });
  }
  res.end();
}


