"use client";

import { useRouter } from "next/navigation";

import type { JSX } from "react";
import type { FormAuth } from "@/types/forms";

import { getErrorMessage } from "@/lib/utils";

import { useForm } from "@/hooks/useForm";
import { useAlertStore } from "@/hooks/useAlertStore";

import authService from "@/services/authService";

const INITIAL_VALUE_FORM = {
  username: "",
  email: "",
  password: "",
};

const FormRegister = (): JSX.Element => {
  const { formState, onChangeInput, onClearForm } = useForm<Partial<FormAuth>>(INITIAL_VALUE_FORM);
  const router = useRouter();
  const { alert, handleSetAlert } = useAlertStore();

  const handleSubmitRegister = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    handleSetAlert("loading", "Trying to create your account...", true);

    const { username, password, email } = formState;

    if (!username || !password || !email) {
      onClearForm();
      handleSetAlert(
        "warning",
        "You must enter a username, password and email address to create an account.",
        true
      );
      return;
    }

    try {
      await authService.register(username, email, password);
      handleSetAlert("info", "Account successfully created.", true);
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
        placeholder="Username"
        name="username"
        value={formState.username}
        onChange={onChangeInput}
      ></input>
      <input
        type="email"
        className="bg-white rounded-full w-full p-4 text-sm text-primary mt-2 outline-none placeholder:text-primary"
        placeholder="Email"
        name="email"
        value={formState.email}
        onChange={onChangeInput}
      ></input>
      <input
        type="password"
        className="bg-white rounded-full w-full p-4 text-sm text-primary mt-2 outline-none placeholder:text-primary"
        placeholder="Password"
        name="password"
        value={formState.password}
        onChange={onChangeInput}
      ></input>

      <button
        type="submit"
        className={`border-solid border-2 border-white rounded-full w-full mt-2 p-2  transition-all active:scale-75 ${
          alert.type === "loading" ? "text-primary bg-white cursor-not-allowed" : "text-white"
        }`}
        aria-label="sign up"
        onClick={(e) => {
          void handleSubmitRegister(e);
        }}
        disabled={alert.type === "loading"}
      >
        Sign up
      </button>
    </form>
  );
};

export default FormRegister;
