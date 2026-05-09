"use client";

import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";

import type { JSX } from "react";

import { useAlertStore } from "@/hooks/useAlertStore";

import authService from "@/services/authService";

const ButtonLogout = (): JSX.Element => {
  const router = useRouter();
  const { handleSetAlert } = useAlertStore();

  const handleClickLogOut = async (): Promise<void> => {
    handleSetAlert("loading", "Closing account...", true);
    await authService.logout();
    router.push("/login");
    handleSetAlert("info", "The account has been successfully closed.", true);
  };

  return (
    <button
      className="lg:my-4 lg:absolute lg:bottom-0 lg:cursor-pointer"
      type="button"
      onClick={() => {
        void handleClickLogOut();
      }}
      aria-label="button logout"
    >
      <AiOutlineLogout fontSize={24} fill="red"></AiOutlineLogout>
    </button>
  );
};

export default ButtonLogout;
