import { Folder, FolderType } from "@src/app/lib/entities";

import { CardItem } from "@src/app/components/Cards/CardItem/CardItem";
import { CardSimple } from "@src/app/components/Cards/CardSimple/CardSimple";

import { bytesToMB } from "@src/app/lib/utils";

interface FolderListProps {
  folders: Folder[];
  folderType: FolderType;
}

export const FolderList = ({ folders, folderType }: FolderListProps) => {
  return (
    <article className="grid grid-cols-1 gap-2 mb-2 w-full lg:grid-cols-3">
      {folders.map((folder) => {
        if (folderType === "simple") {
          return (
            <CardSimple
              key={folder.id}
              bgColor={folder.bgColor}
              color={folder.color}
              path={folder.path}
              type={folder.type}
              title={folder.foldername}
              subTitle={`${folder.len} items`}
            ></CardSimple>
          );
        }

        if (folderType === "withActions") {
          return (
            <CardItem
              key={folder.id}
              bgColor={folder.bgColor}
              color={folder.color}
              title={folder.foldername}
              subTitle={`${folder.len} items | ${bytesToMB(folder.size)} MB`}
              path={folder.path}
              type={folder.type}
            ></CardItem>
          );
        }
      })}
    </article>
  );
};
