import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TypeAlert, UseAlertStore } from "@/app/lib/entities";
import { setAlert } from "@/redux/features/alert/alertSlice";
import { useEffect } from "react";

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
    handleSetAlert,
  };
};
