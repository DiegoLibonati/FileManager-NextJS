import { FolderPageProps } from "@/app/lib/entities";
import { ButtonAdd } from "@/app/components/Buttons/ButtonAdd/ButtonAdd";
import dynamic from "next/dynamic";
import { SectionFolderSkeleton } from "@/app/components/Skeletons/SectionFolderSkeleton/SectionFolderSkeleton";

const LazySectionFolder = dynamic(
  () =>
    import("@/containers/folder/SectionFolder/SectionFolder").then(
      (mod) => mod.SectionFolder
    ),
  {
    ssr: false,
    loading: () => (
      <SectionFolderSkeleton></SectionFolderSkeleton>
    ),
  }
);

export default function Folder({ params }: FolderPageProps): JSX.Element {
  return (
    <>
      <LazySectionFolder
        folderPath={`/${params.folderPath.join("/")}`}
      ></LazySectionFolder>
      <ButtonAdd></ButtonAdd>
    </>
  );
}
