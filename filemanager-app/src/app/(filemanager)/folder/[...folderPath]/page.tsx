import { Fragment } from "react";
import dynamic from "next/dynamic";

import { ButtonAdd } from "@src/app/components/Buttons/ButtonAdd/ButtonAdd";
import { SectionFolderSkeleton } from "@src/app/components/Skeletons/SectionFolderSkeleton/SectionFolderSkeleton";

interface FolderPageProps {
  params: {
    folderPath: string[];
  };
}

const LazySectionFolder = dynamic(
  () =>
    import("@src/containers/folder/SectionFolder/SectionFolder").then(
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
