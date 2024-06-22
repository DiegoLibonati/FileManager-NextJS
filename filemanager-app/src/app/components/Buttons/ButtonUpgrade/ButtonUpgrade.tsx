"use client";

import React from "react";
import { ButtonUpgradeProps } from "../../../../../next-env";
import { useRouter } from "next/navigation";
import { getUpgradePlan } from "@/services/user/get/getUpgradePlan/getUpgradePlan";

export const ButtonUpgrade = ({}: ButtonUpgradeProps): JSX.Element => {
  const router = useRouter();
  const handleClickUpgrade = async (): Promise<void> => {
    await getUpgradePlan("1");
    router.refresh();
  };
  return (
    <button
      className="absolute right-4 bg-secondary text-white cursor-pointer rounded-full shadow-md px-2 py-1"
      type="button"
      onClick={handleClickUpgrade}
    >
      Upgrade
    </button>
  );
};
