"use client";

import { useAlertStore } from "@/app/hooks/useAlertStore";
import { useForm } from "@/app/hooks/useForm";
import { postResetPassword } from "@/services/auth/post/postResetPassword/postResetPassword";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const INITIAL_VALUE_FORM = {
  password: "",
};

export const FormResetPassword = (): JSX.Element => {
  const { formState, onChangeInput, onClearForm } =
    useForm<typeof INITIAL_VALUE_FORM>(INITIAL_VALUE_FORM);
  const { alert, handleSetAlert } = useAlertStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmitResetPassword = async (): Promise<void> => {
    handleSetAlert("loading", "Reseting password...", true);

    if (!formState.password.trim()) {
      onClearForm();
      handleSetAlert("warning", "It is necessary to enter an password", true);
      return;
    }

    try {
      const response = await postResetPassword(
        {
          password: formState.password.trim(),
        },
        {
          id: searchParams.get("id")!,
          username: searchParams.get("username")!,
        }
      );
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
        type="password"
        className="bg-white rounded-full w-full p-4 text-sm text-primary mt-2 outline-none placeholder:text-primary"
        placeholder="New Password"
        onChange={onChangeInput}
        value={formState.password}
        name="password"
      ></input>

      <button
        type="submit"
        className={`border-solid border-2 border-white rounded-full w-full mt-2 p-2 cursor-pointer transition-all active:scale-75 ${
          alert.type === "loading"
            ? "text-primary bg-white cursor-not-allowed"
            : "text-white"
        }`}
        onClick={handleSubmitResetPassword}
        disabled={alert.type === "loading"}
      >
        Change password
      </button>
    </form>
  );
};
