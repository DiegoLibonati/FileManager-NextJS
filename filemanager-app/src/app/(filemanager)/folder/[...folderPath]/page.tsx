import { SectionFolder } from "@/containers/folder/SectionFolder/SectionFolder";
import { FolderPageProps } from "../../../../../next-env";
import { ButtonAdd } from "@/app/components/Buttons/ButtonAdd/ButtonAdd";

export default function Folder({ params }: FolderPageProps): JSX.Element {
  return (
    <>
      <SectionFolder
        folderPath={`/${params.folderPath.join("/")}`}
      ></SectionFolder>
      <ButtonAdd></ButtonAdd>
    </>
  );
}
