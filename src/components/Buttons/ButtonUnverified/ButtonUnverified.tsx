"use client";

import type { JSX } from "react";

import { getErrorMessage } from "@/lib/utils";

import { useAlertStore } from "@/hooks/useAlertStore";

import userService from "@/services/userService";

const ButtonUnverified = (): JSX.Element => {
  const { handleSetAlert } = useAlertStore();

  const handleSendEmailToVerify = async (): Promise<void> => {
    handleSetAlert("loading", "Sending verification email...", true);
    try {
      const response = await userService.sendVerificationEmail();
      handleSetAlert("info", response.message, true);
    } catch (e) {
      handleSetAlert("error", getErrorMessage(e), true);
    }
  };

  return (
    <button
      type="button"
      className="text-primary text-xs ml-2 hover:underline"
      onClick={() => {
        void handleSendEmailToVerify();
      }}
      aria-label="button unverified"
    >
      Unverified
    </button>
  );
};

export default ButtonUnverified;
