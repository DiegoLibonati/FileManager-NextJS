"use client";

import { MouseEventHandler } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { FormAuth } from "@src/app/lib/entities";

import { useForm } from "@src/app/hooks/useForm";
import { useUserStore } from "@src/app/hooks/useUserStore";
import { useAlertStore } from "@src/app/hooks/useAlertStore";
import { postLogin } from "@src/services/auth/post/postLogin/postLogin";

const INITIAL_VALUE_FORM = {
  username: "",
  password: "",
};

export const FormLogin = (): JSX.Element => {
  const { formState, onChangeInput, onClearForm } =
    useForm<Partial<FormAuth>>(INITIAL_VALUE_FORM);
  const router = useRouter();
  const { handleSetUser } = useUserStore();
  const { alert, handleSetAlert } = useAlertStore();

  const handleSubmitLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    handleSetAlert("loading", "Trying to log in...", true);

    const { username, password } = formState;

    if (!username || !password) {
      onClearForm();
      handleSetAlert(
        "warning",
        "To log in you need a username and password.",
        true
      );
      return;
    }

    try {
      const request = await postLogin(formState);
      handleSetUser(request.data.data);
      router.push("/");
      handleSetAlert("info", "You have successfully logged in.", true);
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
        onChange={onChangeInput}
        value={formState.username}
        name="username"
      ></input>
      <input
        type="password"
        className="bg-white rounded-full w-full p-4 text-sm text-primary mt-2 outline-none placeholder:text-primary"
        placeholder="Password"
        onChange={onChangeInput}
        value={formState.password}
        name="password"
      ></input>

      <button
        type="submit"
        aria-label="sign in"
        className={`border-solid border-2 border-white rounded-full w-full mt-2 p-2 cursor-pointer transition-all active:scale-75 ${
          alert.type === "loading"
            ? "text-primary bg-white cursor-not-allowed"
            : "text-white"
        }`}
        onClick={handleSubmitLogin}
        disabled={alert.type === "loading"}
      >
        Sign in
      </button>
    </form>
  );
};
