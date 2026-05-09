"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import type { UseSession } from "@/types/hooks";

import userService from "@/services/userService";

export const useSession = <T,>(): UseSession<T> => {
  const [session, setSession] = useState<T | null>(null);
  const pathname = usePathname();

  const handleGetSession = useCallback(async (): Promise<void> => {
    const response = await userService.getUserInfo();

    setSession(response.data as T);
  }, []);

  useEffect(() => {
    if (
      !pathname.includes("/login") &&
      !pathname.includes("/register") &&
      !pathname.includes("/reset")
    ) {
      void handleGetSession();
    }
  }, [pathname, handleGetSession]);

  return {
    session,
  };
};
