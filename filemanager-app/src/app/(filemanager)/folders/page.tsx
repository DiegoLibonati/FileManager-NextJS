import dynamic from "next/dynamic";

import { FolderListWithActionsSkeleton } from "@src/app/components/Skeletons/FolderListWithActionsSkeleton/FolderListWithActionsSkeleton";

const LazySectionFolders = dynamic(
  () =>
    import("@src/containers/folders/SectionFolders/SectionFolders").then(
      (mod) => mod.SectionFolders
    ),
  {
    ssr: false,
    loading: () => (
      <FolderListWithActionsSkeleton></FolderListWithActionsSkeleton>
    ),
  }
);

export default function FoldersPage(): JSX.Element {
  return <LazySectionFolders></LazySectionFolders>;
}
