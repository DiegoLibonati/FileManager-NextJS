"use client";

import { useAlertStore } from "@/app/hooks/useAlertStore";
import { getSendEmailToVerify } from "@/services/user/get/getSendEmailToVerify/getSendEmailToVerify";
import { AxiosError } from "axios";
import { MouseEventHandler } from "react";

export const ButtonUnverified = (): JSX.Element => {
  const { handleSetAlert } = useAlertStore();

  const handleSendEmailToVerify: MouseEventHandler<
    HTMLButtonElement
  > = async (): Promise<void> => {
    handleSetAlert("loading", "Sending verification email...", true);
    try {
      const response = await getSendEmailToVerify();
      handleSetAlert("info", response.data.message, true);
    } catch (e) {
      if (e instanceof AxiosError) {
        handleSetAlert("error", e.response?.data.error, true);
      }
    }
  };

  return (
    <button
      type="button"
      className="text-primary text-xs ml-2 hover:underline"
      onClick={handleSendEmailToVerify}
    >
      Unverified
    </button>
  );
};
