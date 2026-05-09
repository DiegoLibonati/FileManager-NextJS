"use client";

import { useRouter } from "next/navigation";

import type { JSX } from "react";

import { getErrorMessage } from "@/lib/utils";

import { useAlertStore } from "@/hooks/useAlertStore";
import { useForm } from "@/hooks/useForm";

import authService from "@/services/authService";

const INITIAL_VALUE_FORM = {
  email: "",
};

const FormSendEmailResetPassword = (): JSX.Element => {
  const { formState, onChangeInput, onClearForm } =
    useForm<typeof INITIAL_VALUE_FORM>(INITIAL_VALUE_FORM);
  const { alert, handleSetAlert } = useAlertStore();
  const router = useRouter();

  const handleSubmitSendEmailResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    handleSetAlert("loading", "Sending email...", true);

    if (!formState.email.trim()) {
      onClearForm();
      handleSetAlert("warning", "It is necessary to enter an email address", true);
      return;
    }

    try {
      const response = await authService.sendEmailReset(formState.email.trim());
      handleSetAlert("info", response.message, true);
      router.push("/login");
    } catch (e) {
      onClearForm();
      handleSetAlert("error", getErrorMessage(e), true);
    }
  };

  return (
    <form className="flex flex-col w-full mt-2">
      <input
        type="text"
        className="bg-white rounded-full w-full p-4 text-sm text-primary mt-2 outline-none placeholder:text-primary"
        placeholder="Email"
        onChange={onChangeInput}
        value={formState.email}
        name="email"
      ></input>

      <button
        type="submit"
        className={`border-solid border-2 border-white rounded-full w-full mt-2 p-2 cursor-pointer transition-all active:scale-75 ${
          alert.type === "loading" ? "text-primary bg-white cursor-not-allowed" : "text-white"
        }`}
        aria-label="send email"
        onClick={(e) => {
          void handleSubmitSendEmailResetPassword(e);
        }}
        disabled={alert.type === "loading"}
      >
        Send email
      </button>
    </form>
  );
};

export default FormSendEmailResetPassword;
