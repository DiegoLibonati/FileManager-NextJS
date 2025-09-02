import { Fragment } from "react";
import dynamic from "next/dynamic";

import { SectionCircleChartSkeleton } from "@src/app/components/Skeletons/SectionCircleChartSkeleton/SectionCircleChartSkeleton";
import { SectionCategoriesSkeleton } from "@src/app/components/Skeletons/SectionCategoriesSkeleton/SectionCategoriesSkeleton";
import { SectionRecentUploadedSkeleton } from "@src/app/components/Skeletons/SectionRecentUploadedSkeleton/SectionRecentUploadedSkeleton";

const LazySectionChart = dynamic(
  () =>
    import("@src/containers/home/SectionChart/SectionChart").then(
      (mod) => mod.SectionChart
    ),
  {
    ssr: false,
    loading: () => <SectionCircleChartSkeleton></SectionCircleChartSkeleton>,
  }
);

const LazySectionCategories = dynamic(
  () =>
    import("@src/containers/home/SectionCategories/SectionCategories").then(
      (mod) => mod.SectionCategories
    ),
  {
    ssr: false,
    loading: () => <SectionCategoriesSkeleton></SectionCategoriesSkeleton>,
  }
);

const LazySectionRecentUploaded = dynamic(
  () =>
    import(
      "@src/containers/home/SectionRecentUploaded/SectionRecentUploaded"
    ).then((mod) => mod.SectionRecentUploaded),
  {
    ssr: false,
    loading: () => (
      <SectionRecentUploadedSkeleton></SectionRecentUploadedSkeleton>
    ),
  }
);

export default function HomePage(): JSX.Element {
  return (
    <Fragment>
      <LazySectionChart></LazySectionChart>
      <LazySectionCategories></LazySectionCategories>
      <LazySectionRecentUploaded></LazySectionRecentUploaded>
    </Fragment>
  );
}
