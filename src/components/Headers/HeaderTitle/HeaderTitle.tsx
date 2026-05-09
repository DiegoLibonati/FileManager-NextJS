"use client";

import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";

import type { JSX } from "react";

import Heading from "@/components/Headers/Heading/Heading";
import ButtonUnverified from "@/components/Buttons/ButtonUnverified/ButtonUnverified";

import { getTitleByParams } from "@/lib/utils";

import { useUserStore } from "@/hooks/useUserStore";

const HeaderTitle = (): JSX.Element => {
  const { user } = useUserStore();
  const pathname = usePathname();
  const params = useParams();

  const titleByParams = useMemo(() => {
    return getTitleByParams(params);
  }, [params]);

  return (
    <Heading element={"h2"} className="font-semibold text-2xl lg:text-3xl">
      {pathname === "/"
        ? `Welcome ${user?.username ?? ""} 👋`
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

export default HeaderTitle;
