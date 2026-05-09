import type { JSX } from "react";
import type { FolderListProps } from "@/types/props";

import CardItem from "@/components/Cards/CardItem/CardItem";
import CardSimple from "@/components/Cards/CardSimple/CardSimple";

import { bytesToMB } from "@/lib/utils";

const FolderList = ({ folders, folderType }: FolderListProps): JSX.Element => {
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
      })}
    </article>
  );
};

export default FolderList;
