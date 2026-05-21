"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const roleRouteMap: Record<string, string> = {
  patient: "/patient",
  clinician: "/clinical",
  doctor: "/clinical",
  facility: "/clinical",
  admin: "/admin",
  developer: "/developer",
};

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace(roleRouteMap[session.role] || "/clinical");
    } else {
      router.replace("/auth");
    }
  }, [session, router]);

  return null;
}
