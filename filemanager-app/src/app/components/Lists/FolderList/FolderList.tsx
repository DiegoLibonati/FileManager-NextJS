import { CardItem } from "@/app/components/Cards/CardItem/CardItem";
import { FolderListProps } from "../../../../../next-env";
import { CardSimple } from "@/app/components/Cards/CardSimple/CardSimple";
import { bytesToMB } from "@/app/lib/utils";

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
