import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { getSession } from "@/services/user/get/getSession/getSession";

type UseSession<T> = {
  session: T;
};

export const useSession = <T,>(): UseSession<T> => {
  const [session, setSession] = useState<T | null>(null);
  const pathname = usePathname();

  const handleGetSession = async (): Promise<void> => {
    const session = await getSession();

    setSession(session);
  };

  useEffect(() => {
    if (
      !pathname.includes("/login") &&
      !pathname.includes("/register") &&
      !pathname.includes("/reset")
    ) {
      handleGetSession();
    }
  }, [pathname]);

  return {
    session: session!,
  };
};
