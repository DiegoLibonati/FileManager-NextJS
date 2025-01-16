import { Fragment } from "react";
import dynamic from "next/dynamic";

import { ButtonAdd } from "@/app/components/Buttons/ButtonAdd/ButtonAdd";
import { SectionFolderSkeleton } from "@/app/components/Skeletons/SectionFolderSkeleton/SectionFolderSkeleton";

interface FolderPageProps {
  params: {
    folderPath: string[];
  };
}

const LazySectionFolder = dynamic(
  () =>
    import("@/containers/folder/SectionFolder/SectionFolder").then(
      (mod) => mod.SectionFolder
    ),
  {
    ssr: false,
    loading: () => <SectionFolderSkeleton></SectionFolderSkeleton>,
  }
);

export default function FolderPage({ params }: FolderPageProps): JSX.Element {
  return (
    <Fragment>
      <LazySectionFolder
        folderPath={`/${params.folderPath.join("/")}`}
      ></LazySectionFolder>
      <ButtonAdd></ButtonAdd>
    </Fragment>
  );
}
