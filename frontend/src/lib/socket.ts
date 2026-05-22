"use client";

import { io, type Socket } from "socket.io-client";
import { useEffect, useRef, useState, useCallback } from "react";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export interface AiInsightEvent {
  encounterId: string;
  data: unknown;
}

/** Singleton socket connection to the NestJS AiGateway */
let socket: Socket | null = null;

function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: false,
    });
  }
  return socket;
}

/**
 * Hook to subscribe to real-time AI insight events
 * pushed by the NestJS AiGateway via Socket.IO.
 */
export function useAiInsights() {
  const [insights, setInsights] = useState<AiInsightEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const s = getSocket();
    socketRef.current = s;

    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));

    s.on("AI_INSIGHT_READY", (event: AiInsightEvent) => {
      setInsights((prev) => {
        // Limit to 50 recent insights to prevent memory leak
        return [event, ...prev.slice(0, 49)];
      });
    });

    s.connect();

    return () => {
      s.off("AI_INSIGHT_READY");
      s.off("connect");
      s.off("disconnect");
    };
  }, []);

  const clearInsights = useCallback(() => setInsights([]), []);

  return { insights, connected, clearInsights };
}
