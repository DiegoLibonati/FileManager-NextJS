"use client";

import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";

import { Heading } from "@src/app/components/Headers/Heading/Heading";
import { ButtonUnverified } from "@src/app/components/Buttons/ButtonUnverified/ButtonUnverified";

import { getTitleByParams } from "@src/app/lib/utils";
import { useUserStore } from "@src/app/hooks/useUserStore";

export const HeaderTitle = (): JSX.Element => {
  const { user } = useUserStore();
  const pathname = usePathname();
  const params = useParams();

  const titleByParams = useMemo(() => {
    return getTitleByParams(params as Record<string, string>);
  }, [params]);

  return (
    <Heading element={"h2"} className="font-semibold text-2xl lg:text-3xl">
      {pathname === "/"
        ? `Welcome ${user?.username ? user?.username : ""} 👋`
        : pathname === "/folders"
        ? `All Folders 📁`
        : pathname === "/cloud"
        ? `My Cloud ☁️`
        : pathname === "/upload"
        ? `New Things 🚀`
        : titleByParams}
      {!user?.emailVerified ? <ButtonUnverified></ButtonUnverified> : null}
    </Heading>
  );
};
