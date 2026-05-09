import type { JSX } from "react";
import type { SectionFilesProps } from "@/types/props";
import type { FileItem } from "@/types/app";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

import CardNotFound from "@/components/Cards/CardNotFound/CardNotFound";
import FileList from "@/components/Lists/FileList/FileList";

const SectionFiles = async ({ idCategory }: SectionFilesProps): Promise<JSX.Element> => {
  const session = await getSession();
  const result = await FileManagerService.getCategoryFiles(session?.username ?? "", idCategory);

  if (!Array.isArray(result)) {
    return <CardNotFound className="h-12 lg:h-32">You have no files uploaded yet!</CardNotFound>;
  }

  const files = result as FileItem[];

  return (
    <section className="w-full h-auto">
      {files.length > 0 ? (
        <FileList files={files}></FileList>
      ) : (
        <CardNotFound className="h-12 lg:h-32">You have no files uploaded yet!</CardNotFound>
      )}
    </section>
  );
};

export default SectionFiles;
