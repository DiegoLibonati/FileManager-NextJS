import { CardNotFound } from "@/app/components/Cards/CardNotFound/CardNotFound";
import { FileList } from "@/app/components/Lists/FileList/FileList";
import { SectionFilesProps } from "../../../../next-env";
import { getCategoryFiles } from "@/services/filemanager/get/getCategoryFiles/getCategoryFiles";

export const SectionFiles = async ({
  idCategory,
}: SectionFilesProps): Promise<JSX.Element> => {
  const categoriesFiles = await getCategoryFiles(idCategory);
  return (
    <section className="w-full h-auto">
      {categoriesFiles.length > 0 ? (
        <FileList files={categoriesFiles}></FileList>
      ) : (
        <CardNotFound className="h-12 lg:h-32">
          You have no files uploaded yet!
        </CardNotFound>
      )}
    </section>
  );
};
