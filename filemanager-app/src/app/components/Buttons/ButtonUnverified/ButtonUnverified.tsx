"use client";

import { MouseEventHandler } from "react";
import { AxiosError } from "axios";

import { useAlertStore } from "@src/app/hooks/useAlertStore";
import { getSendEmailToVerify } from "@src/services/user/get/getSendEmailToVerify/getSendEmailToVerify";

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
      aria-label="button unverified"
    >
      Unverified
    </button>
  );
};
