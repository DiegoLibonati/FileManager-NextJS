import type { JSX } from "react";

import Heading from "@/components/Headers/Heading/Heading";
import FolderList from "@/components/Lists/FolderList/FolderList";
import CardNotFound from "@/components/Cards/CardNotFound/CardNotFound";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

const SectionFolders = async (): Promise<JSX.Element> => {
  const session = await getSession();
  const folders = await FileManagerService.getAllFolders(session?.username ?? "");

  return (
    <section className="flex flex-col items-start justify-center w-full h-auto mt-8">
      <Heading className="font-semibold text-base mb-2 lg:text-xl" element="h2">
        Folders
      </Heading>

      {folders.length > 0 ? (
        <FolderList folders={folders} folderType="simple"></FolderList>
      ) : (
        <CardNotFound className="h-12 lg:h-32">You have no folders created yet!</CardNotFound>
      )}
    </section>
  );
};

export default SectionFolders;
