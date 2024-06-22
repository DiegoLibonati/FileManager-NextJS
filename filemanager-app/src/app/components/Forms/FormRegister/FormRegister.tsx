"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { useForm } from "@/app/hooks/useForm";
import { FormAuth } from "@/app/lib/entities";
import { postRegister } from "@/services/auth/post/postRegister/postRegister";
import { useAlertStore } from "@/app/hooks/useAlertStore";
import { AxiosError } from "axios";

const INITIAL_VALUE_FORM = {
  username: "",
  email: "",
  password: "",
};

export const FormRegister = (): JSX.Element => {
  const { formState, onChangeInput, onClearForm } =
    useForm<Partial<FormAuth>>(INITIAL_VALUE_FORM);
  const router = useRouter();
  const { alert, handleSetAlert } = useAlertStore();

  const handleSubmitRegister: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
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
      await postRegister(formState);
      handleSetAlert("info", "Account successfully created.", true);
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
          alert.type === "loading"
            ? "text-primary bg-white cursor-not-allowed"
            : "text-white"
        }`}
        onClick={handleSubmitRegister}
        disabled={alert.type === "loading"}
      >
        Sign up
      </button>
    </form>
  );
};
