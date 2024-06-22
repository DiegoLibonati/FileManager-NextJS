import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setUser } from "@/redux/features/user/userSlice";
import { useEffect } from "react";
import { useSession } from "@/app/hooks/useSession";
import { UseUserStore, User, Session } from "@/app/lib/entities";

export const useUserStore = (): UseUserStore => {
  const { session } = useSession<Session>();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSetUser = (user: User | null) => {
    dispatch(setUser(user));
  };

  useEffect(() => {
    if (!user.user && session) {
      handleSetUser({
        username: session?.username,
        email: session?.email,
        plan: session?.plan,
      });
    }
  }, [session, user.user]);

  return {
    user: user.user,
    handleSetUser,
  };
};
