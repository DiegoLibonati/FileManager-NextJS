import { useEffect, useState } from "react";
import { UseSession } from "../../next-env";
import { usePathname } from "next/navigation";
import { getSession } from "@/services/user/get/getSession/getSession";

export const useSession = <T,>(): UseSession<T> => {
  const [session, setSession] = useState<T | null>(null);
  const pathname = usePathname();

  const handleGetSession = async (): Promise<void> => {
    const session = await getSession();

    setSession(session);
  };

  useEffect(() => {
    if (!pathname.includes("/login") && !pathname.includes("/register")) {
      handleGetSession();
    }
  }, [pathname]);

  return {
    session: session!,
  };
};
