"use client";

import { useParams, usePathname } from "next/navigation";
import { Heading } from "../Heading/Heading";
import { useMemo } from "react";
import { HeaderTitleProps } from "../../../../../next-env";
import { getTitleByParams } from "@/app/lib/utils";
import { useUserStore } from "@/app/hooks/useUserStore";

export const HeaderTitle = ({}: HeaderTitleProps): JSX.Element => {
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
    </Heading>
  );
};
