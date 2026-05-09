import { useCallback, useEffect } from "react";

import type { TypeAlert } from "@/types/app";
import type { UseAlertStore } from "@/types/hooks";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAlert } from "@/redux/features/alert/alertSlice";

export const useAlertStore = (): UseAlertStore => {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  const handleSetAlert = useCallback(
    (type: TypeAlert, message: string, open: boolean): void => {
      dispatch(setAlert({ type: type, message: message, open: open }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!alert.open || alert.type === "loading") return;

    const timeout = setTimeout(() => {
      handleSetAlert("info", "", false);
    }, 5000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [alert, handleSetAlert]);

  return {
    alert: alert,
    handleSetAlert: handleSetAlert,
  };
};
