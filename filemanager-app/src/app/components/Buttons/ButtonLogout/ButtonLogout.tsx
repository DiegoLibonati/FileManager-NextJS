"use client";

import { MouseEventHandler } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { useAlertStore } from "@/app/hooks/useAlertStore";
import { getLogout } from "@/services/auth/get/getLogout/getLogout";

export const ButtonLogout = (): JSX.Element => {
  const router = useRouter();
  const { handleSetAlert } = useAlertStore();

  const handleClickLogOut: MouseEventHandler<
    HTMLButtonElement
  > = async (): Promise<void> => {
    handleSetAlert("loading", "Closing account...", true);
    await getLogout();
    router.push("/login");
    handleSetAlert("info", "The account has been successfully closed.", true);
  };

  return (
    <button
      className="lg:my-4 lg:absolute lg:bottom-0 lg:cursor-pointer"
      type="button"
      onClick={handleClickLogOut}
      aria-label="button logout"
    >
      <AiOutlineLogout fontSize={24} fill="red"></AiOutlineLogout>
    </button>
  );
};
