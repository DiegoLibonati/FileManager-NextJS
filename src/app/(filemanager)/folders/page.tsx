import { Suspense } from "react";

import type { JSX } from "react";
import type { Metadata } from "next";

import FolderListWithActionsSkeleton from "@/components/Skeletons/FolderListWithActionsSkeleton/FolderListWithActionsSkeleton";

import SectionFolders from "@/containers/folders/SectionFolders/SectionFolders";

export const metadata: Metadata = {
  title: "Folders",
};

function FoldersPage(): JSX.Element {
  return (
    <Suspense fallback={<FolderListWithActionsSkeleton></FolderListWithActionsSkeleton>}>
      <SectionFolders></SectionFolders>
    </Suspense>
  );
}

export default FoldersPage;
