import { CategoryPageProps } from "@/app/lib/entities";
import dynamic from "next/dynamic";
import { SectionFilesSkeleton } from "@/app/components/Skeletons/SectionFilesSkeleton/SectionFilesSkeleton";

const LazySectionFiles = dynamic(
  () =>
    import("@/containers/category/SectionFiles/SectionFiles").then(
      (mod) => mod.SectionFiles
    ),
  { ssr: false, loading: () => <SectionFilesSkeleton></SectionFilesSkeleton> }
);

export default function Category({ params }: CategoryPageProps): JSX.Element {
  return (
    <LazySectionFiles
      idCategory={params.categoryId as string}
    ></LazySectionFiles>
  );
}
