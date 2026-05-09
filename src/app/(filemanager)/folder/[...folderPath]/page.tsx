import { Fragment, Suspense } from "react";

import type { JSX } from "react";
import type { Metadata } from "next";
import type { FolderPageProps } from "@/types/props";

import ButtonAdd from "@/components/Buttons/ButtonAdd/ButtonAdd";
import SectionFolderSkeleton from "@/components/Skeletons/SectionFolderSkeleton/SectionFolderSkeleton";

import SectionFolder from "@/containers/folder/SectionFolder/SectionFolder";

export async function generateMetadata({ params }: FolderPageProps): Promise<Metadata> {
  const { folderPath } = await params;
  const name = folderPath.at(-1) ?? "root";
  return {
    title: name === "root" ? "Root" : decodeURIComponent(name),
  };
}

async function FolderPage({ params }: FolderPageProps): Promise<JSX.Element> {
  const { folderPath } = await params;
  const cloudRelativePath = folderPath[0] === "root" ? "" : `/${folderPath.join("/")}`;
  return (
    <Fragment>
      <Suspense fallback={<SectionFolderSkeleton></SectionFolderSkeleton>}>
        <SectionFolder folderPath={cloudRelativePath}></SectionFolder>
      </Suspense>
      <ButtonAdd></ButtonAdd>
    </Fragment>
  );
}

export default FolderPage;
