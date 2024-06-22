import { SectionCircleChartSkeleton } from "@/app/components/Skeletons/SectionCircleChartSkeleton/SectionCircleChartSkeleton";
import { SectionCategoriesSkeleton } from "@/app/components/Skeletons/SectionCategoriesSkeleton/SectionCategoriesSkeleton";
import { SectionRecentUploadedSkeleton } from "@/app/components/Skeletons/SectionRecentUploadedSkeleton/SectionRecentUploadedSkeleton";
import dynamic from "next/dynamic";

const LazySectionChart = dynamic(
  () =>
    import("@/containers/home/SectionChart/SectionChart").then(
      (mod) => mod.SectionChart
    ),
  { ssr: false, loading: () => <SectionCircleChartSkeleton></SectionCircleChartSkeleton> }
);

const LazySectionCategories = dynamic(
  () =>
    import("@/containers/home/SectionCategories/SectionCategories").then(
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
      "@/containers/home/SectionRecentUploaded/SectionRecentUploaded"
    ).then((mod) => mod.SectionRecentUploaded),
  {
    ssr: false,
    loading: () => <SectionRecentUploadedSkeleton></SectionRecentUploadedSkeleton>,
  }
);

export default function Home(): JSX.Element {
  return (
    <>
      <LazySectionChart></LazySectionChart>
      <LazySectionCategories></LazySectionCategories>
      <LazySectionRecentUploaded></LazySectionRecentUploaded>
    </>
  );
}
