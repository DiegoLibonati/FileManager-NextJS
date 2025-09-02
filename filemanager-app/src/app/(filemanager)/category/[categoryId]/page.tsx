import dynamic from "next/dynamic";

import { SectionFilesSkeleton } from "@src/app/components/Skeletons/SectionFilesSkeleton/SectionFilesSkeleton";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const LazySectionFiles = dynamic(
  () =>
    import("@src/containers/category/SectionFiles/SectionFiles").then(
      (mod) => mod.SectionFiles
    ),
  { ssr: false, loading: () => <SectionFilesSkeleton></SectionFilesSkeleton> }
);

export default function CategoryPage({
  params,
}: CategoryPageProps): JSX.Element {
  return (
    <LazySectionFiles
      idCategory={params.categoryId as string}
    ></LazySectionFiles>
  );
}
