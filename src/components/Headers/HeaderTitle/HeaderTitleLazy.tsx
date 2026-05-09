"use client";

import dynamic from "next/dynamic";

import HeaderTitleSkeleton from "@/components/Skeletons/HeaderTitleSkeleton/HeaderTitleSkeleton";

const HeaderTitleLazy = dynamic(
  () => import("@/components/Headers/HeaderTitle/HeaderTitle").then((mod) => mod.default),
  { ssr: false, loading: () => <HeaderTitleSkeleton /> }
);

export default HeaderTitleLazy;
