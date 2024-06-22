import { bytesToMB } from "@/helpers/utils";
import { FileListProps } from "../../../../next-env";
import { CardItem } from "@/components/Cards/CardItem/CardItem";

export const FileList = ({ files }: FileListProps): JSX.Element => {
  return (
    <article className="grid grid-cols-1 gap-2 mb-2 lg:grid-cols-3">
      {files.map((file) => {
        return (
          <CardItem
            key={file.id}
            bgColor={file.bgColor}
            color={file.color}
            idCategory={file.idCategory}
            title={file.filename}
            subTitle={`${bytesToMB(file.size)} MB`}
            path={file.path}
            type={file.type}
          ></CardItem>
        );
      })}
    </article>
  );
};
