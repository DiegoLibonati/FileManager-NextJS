import { CardNotFound } from "@/app/components/Cards/CardNotFound/CardNotFound";
import { FileList } from "@/app/components/Lists/FileList/FileList";
import { FolderList } from "@/app/components/Lists/FolderList/FolderList";
import { SectionFolderProps } from "../../../../next-env";
import { parseEscapeString } from "@/app/lib/utils";
import { getFilesAndDirectories } from "@/services/filemanager/get/getFilesAndDirectories/getFilesAndDirectories";

export const SectionFolder = async ({
  folderPath,
}: SectionFolderProps): Promise<JSX.Element> => {
  const folderContent = await getFilesAndDirectories(
    parseEscapeString(folderPath)
  );

  const folders = folderContent.filter((folder) => folder.type === "folder");
  const files = folderContent.filter((file) => file.type === "file");
  return (
    <section className="w-full h-auto">
      {folderContent.length > 0 ? (
        <>
          <FolderList folders={folders} folderType="withActions"></FolderList>
          <FileList files={files}></FileList>
        </>
      ) : (
        <CardNotFound className="h-12 lg:h-32">
          You have no files uploaded yet!
        </CardNotFound>
      )}
    </section>
  );
};
