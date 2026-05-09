"use client";

import { useRouter } from "next/navigation";

import type { JSX } from "react";

import userService from "@/services/userService";

const ButtonUpgrade = (): JSX.Element => {
  const router = useRouter();

  const handleClickUpgrade = async (): Promise<void> => {
    await userService.changePlan("1");
    router.refresh();
  };

  return (
    <button
      className="absolute right-4 bg-secondary text-white cursor-pointer rounded-full shadow-md px-2 py-1"
      type="button"
      onClick={() => {
        void handleClickUpgrade();
      }}
      aria-label="button upgrade"
    >
      Upgrade
    </button>
  );
};

export default ButtonUpgrade;
