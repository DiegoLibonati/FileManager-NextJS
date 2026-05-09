import { Fragment, Suspense } from "react";

import type { JSX } from "react";
import type { Metadata } from "next";

import SectionCircleChartSkeleton from "@/components/Skeletons/SectionCircleChartSkeleton/SectionCircleChartSkeleton";
import SectionCategoriesSkeleton from "@/components/Skeletons/SectionCategoriesSkeleton/SectionCategoriesSkeleton";
import SectionRecentUploadedSkeleton from "@/components/Skeletons/SectionRecentUploadedSkeleton/SectionRecentUploadedSkeleton";

import SectionChart from "@/containers/home/SectionChart/SectionChart";
import SectionCategories from "@/containers/home/SectionCategories/SectionCategories";
import SectionRecentUploaded from "@/containers/home/SectionRecentUploaded/SectionRecentUploaded";

export const metadata: Metadata = {
  title: "Dashboard",
};

function HomePage(): JSX.Element {
  return (
    <Fragment>
      <Suspense fallback={<SectionCircleChartSkeleton></SectionCircleChartSkeleton>}>
        <SectionChart></SectionChart>
      </Suspense>
      <Suspense fallback={<SectionCategoriesSkeleton></SectionCategoriesSkeleton>}>
        <SectionCategories></SectionCategories>
      </Suspense>
      <Suspense fallback={<SectionRecentUploadedSkeleton></SectionRecentUploadedSkeleton>}>
        <SectionRecentUploaded></SectionRecentUploaded>
      </Suspense>
    </Fragment>
  );
}

export default HomePage;
