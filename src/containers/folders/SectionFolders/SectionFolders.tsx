import type { JSX } from "react";

import FolderList from "@/components/Lists/FolderList/FolderList";
import CardNotFound from "@/components/Cards/CardNotFound/CardNotFound";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

const SectionFolders = async (): Promise<JSX.Element> => {
  const session = await getSession();
  const folders = await FileManagerService.getAllFolders(session?.username ?? "");

  return (
    <section className="w-full h-auto">
      {folders.length > 0 ? (
        <FolderList folders={folders} folderType="withActions"></FolderList>
      ) : (
        <CardNotFound className="h-12 lg:h-32">You have no folders created yet!</CardNotFound>
      )}
    </section>
  );
};

export default SectionFolders;
