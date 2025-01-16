import { useEffect } from "react";

import { AlertState, TypeAlert } from "@/app/lib/entities";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAlert } from "@/redux/features/alert/alertSlice";

type UseAlertStore = {
  alert: AlertState;
  handleSetAlert: (type: TypeAlert, message: string, open: boolean) => void;
};

export const useAlertStore = (): UseAlertStore => {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  const handleSetAlert = (
    type: TypeAlert,
    message: string,
    open: boolean
  ): void => {
    dispatch(setAlert({ type: type, message: message, open: open }));
  };

  useEffect(() => {
    if (alert.open && alert.type !== "loading") {
      const timeout = setTimeout(() => {
        handleSetAlert("info", "", false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return {
    alert: alert,
    handleSetAlert: handleSetAlert,
  };
};
