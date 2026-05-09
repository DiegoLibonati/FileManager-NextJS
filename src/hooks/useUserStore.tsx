import { useCallback, useEffect } from "react";

import type { Session } from "@/types/api";
import type { User } from "@/types/app";
import type { UseUserStore } from "@/types/hooks";

import { useSession } from "@/hooks/useSession";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/user/userSlice";

export const useUserStore = (): UseUserStore => {
  const { session } = useSession<Session>();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSetUser = useCallback(
    (user: User | null): void => {
      dispatch(setUser(user));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!user.user && session) {
      handleSetUser({
        username: session.username,
        email: session.email,
        plan: session.plan,
        emailVerified: session.emailVerified,
      });
    }
  }, [session, user.user, handleSetUser]);

  return {
    user: user.user,
    handleSetUser: handleSetUser,
  };
};
