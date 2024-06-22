import { FolderList } from "@/app/components/Lists/FolderList/FolderList";
import { getAllFolders } from "@/services/filemanager/get/getAllFolders/getAllFolders";

export const SectionFolders = async (): Promise<JSX.Element> => {
  const folders = await getAllFolders();
  return (
    <section className="w-full h-auto">
      <FolderList folders={folders} folderType="withActions"></FolderList>
    </section>
  );
};
