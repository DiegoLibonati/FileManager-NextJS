import { Fragment } from "react";

import type { JSX } from "react";
import type { SectionFolderProps } from "@/types/props";
import type { FileItem, FolderItem } from "@/types/app";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

import { parseEscapeString } from "@/lib/utils";

import CardNotFound from "@/components/Cards/CardNotFound/CardNotFound";
import FileList from "@/components/Lists/FileList/FileList";
import FolderList from "@/components/Lists/FolderList/FolderList";

const SectionFolder = async ({ folderPath }: SectionFolderProps): Promise<JSX.Element> => {
  const session = await getSession();
  const folderContent = await FileManagerService.getDirectory(
    session?.username ?? "",
    parseEscapeString(folderPath)
  );

  const folders = folderContent.filter((f) => f.type === "folder") as FolderItem[];
  const files = folderContent.filter((f) => f.type === "file") as FileItem[];

  return (
    <section className="w-full h-auto">
      {folderContent.length > 0 ? (
        <Fragment>
          <FolderList folders={folders} folderType="withActions"></FolderList>
          <FileList files={files}></FileList>
        </Fragment>
      ) : (
        <CardNotFound className="h-12 lg:h-32">You have no files uploaded yet!</CardNotFound>
      )}
    </section>
  );
};

export default SectionFolder;
