"use client";

import { useParams, usePathname } from "next/navigation";
import { Heading } from "@/app/components/Headers/Heading/Heading";
import { useEffect, useMemo } from "react";
import { HeaderTitleProps } from "@/app/lib/entities";
import { getTitleByParams } from "@/app/lib/utils";
import { useUserStore } from "@/app/hooks/useUserStore";
import { ButtonUnverified } from "../../Buttons/ButtonUnverified/ButtonUnverified";

export const HeaderTitle = ({}: HeaderTitleProps): JSX.Element => {
  const { user } = useUserStore();
  const pathname = usePathname();
  const params = useParams();

  const titleByParams = useMemo(() => {
    return getTitleByParams(params as Record<string, string>);
  }, [params]);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
