import { useEffect } from "react";

import { User, Session } from "@src/app/lib/entities";

import { useSession } from "@src/app/hooks/useSession";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setUser } from "@src/redux/features/user/userSlice";

type UseUserStore = {
  user: User | null;
  handleSetUser: (user: User | null) => void;
};

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
        emailVerified: session.emailVerified,
      });
    }
  }, [session, user.user]);

  return {
    user: user.user,
    handleSetUser: handleSetUser,
  };
};
