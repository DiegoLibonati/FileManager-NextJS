"use client";

import { useAlertStore } from "@/app/hooks/useAlertStore";
import { useForm } from "@/app/hooks/useForm";
import { postSendEmailResetPassword } from "@/services/auth/post/postSendEmailResetPassword/postSendEmailResetPassword";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const INITIAL_VALUE_FORM = {
  email: "",
};

export const FormSendEmailResetPassword = (): JSX.Element => {
  const { formState, onChangeInput, onClearForm } =
    useForm<typeof INITIAL_VALUE_FORM>(INITIAL_VALUE_FORM);
  const { alert, handleSetAlert } = useAlertStore();
  const router = useRouter();

  const handleSubmitSendEmailResetPassword = async (): Promise<void> => {
    handleSetAlert("loading", "Sending email...", true);

    if (!formState.email.trim()) {
      onClearForm();
      handleSetAlert(
        "warning",
        "It is necessary to enter an email address",
        true
      );
      return;
    }

    try {
      const response = await postSendEmailResetPassword({
        email: formState.email.trim(),
      });
      handleSetAlert("info", response.data.message, true);
      router.push("/login");
    } catch (e) {
      onClearForm();
      if (e instanceof AxiosError) {
        handleSetAlert("error", e.response?.data.error, true);
      }
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
          alert.type === "loading"
            ? "text-primary bg-white cursor-not-allowed"
            : "text-white"
        }`}
        onClick={handleSubmitSendEmailResetPassword}
        disabled={alert.type === "loading"}
      >
        Send email
      </button>
    </form>
  );
};
