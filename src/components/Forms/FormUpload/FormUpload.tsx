"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { JSX } from "react";
import type { FormUpload as FormUploadT } from "@/types/forms";
import type { FormUploadProps } from "@/types/props";

import ButtonCreate from "@/components/Buttons/ButtonCreate/ButtonCreate";

import { parseEscapeString, getErrorMessage } from "@/lib/utils";

import { useForm } from "@/hooks/useForm";
import { useAlertStore } from "@/hooks/useAlertStore";

import filemanagerService from "@/services/filemanagerService";

const INITIAL_VALUE = {
  folderName: "",
};

const FormUpload = ({ path }: FormUploadProps): JSX.Element => {
  const [pathToUpload, setPathToUpload] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("folder");
  const [file, setFile] = useState<File | null>(null);

  const { formState, onChangeInput, onClearForm } = useForm<FormUploadT>(INITIAL_VALUE);
  const router = useRouter();
  const { handleSetAlert } = useAlertStore();

  const handleSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    handleSetAlert(
      "loading",
      selectValue === "file"
        ? `Uploading the file: ${file?.name}`
        : `Creating the folder: ${formState.folderName}`,
      true
    );

    if (!pathToUpload || (selectValue === "file" && !file)) {
      onClearForm();
      handleSetAlert("warning", "A file is required to upload, select it.", true);
      return;
    }

    if (!pathToUpload || (selectValue === "folder" && !formState.folderName.trim())) {
      onClearForm();
      handleSetAlert("warning", "You must enter a name of the folder to be created.", true);
      return;
    }

    if (selectValue === "file") {
      const formData = new FormData();

      formData.append("path", pathToUpload);
      formData.append("file", file!);

      try {
        await filemanagerService.upload(formData);
      } catch (e) {
        handleSetAlert("error", getErrorMessage(e), true);
        return;
      }
    }

    if (selectValue === "folder") {
      try {
        await filemanagerService.createFolder(`${pathToUpload}/${formState.folderName}`);
      } catch (e) {
        handleSetAlert("error", getErrorMessage(e), true);
        return;
      }
    }

    router.push(pathToUpload === "/" ? "/folder/root" : `/folder${pathToUpload}`);
    router.refresh();
    handleSetAlert(
      "info",
      selectValue === "file"
        ? `Successfully uploaded: ${file?.name}`
        : `The folder was successfully created: ${formState.folderName}`,
      true
    );
  };

  useEffect(() => {
    const stripped = parseEscapeString(path).replace(/^\/root/, "") || "/";
    setPathToUpload(stripped);
  }, [path]);

  return (
    <form className="flex flex-col items-start justify-between w-full h-[75%] bg-primary rounded-lg shadow-md p-4 lg:w-[50%] lg:h-[50%]">
      <div className="flex flex-col w-full h-auto">
        <select
          className="w-full py-4 pl-4 text-sm rounded-lg outline-none"
          onChange={(e) => {
            setSelectValue(e.target.value);
          }}
        >
          <option value="folder">New Folder</option>
          <option value="file">Upload File</option>
        </select>

        {selectValue === "folder" && (
          <div className="flex flex-col mt-2">
            <input
              className="p-4 outline-none rounded-lg text-sm placeholder:text-black"
              placeholder="Name of Folder"
              type="text"
              value={formState.folderName}
              name="folderName"
              onChange={onChangeInput}
            ></input>
            <input
              className="p-4 outline-none rounded-lg mt-2 text-sm placeholder:text-black"
              placeholder="Path"
              value={pathToUpload}
              type="text"
              disabled={true}
            ></input>
          </div>
        )}
        {selectValue === "file" && (
          <Fragment>
            <input
              className="p-4 outline-none rounded-lg mt-2 text-sm placeholder:text-black"
              placeholder="Path"
              type="text"
              value={pathToUpload}
              disabled={true}
            ></input>
            <div className="flex flex-row items-center mt-2">
              <input
                type="file"
                id="custom-input"
                onChange={(e) => {
                  setFile(e.target.files![0]!);
                }}
                hidden
              />
              <label
                htmlFor="custom-input"
                className="block text-sm mr-4 p-4
                    rounded-md border-0 font-semibold bg-white
                    text-primary hover:bg-pink-100 cursor-pointer"
              >
                Choose file
              </label>
              <label className="text-sm text-white">{!file ? "Select a file" : file.name}</label>
            </div>
          </Fragment>
        )}
      </div>

      <ButtonCreate
        onClick={(e) => {
          void handleSubmitForm(e);
        }}
      >
        {selectValue === "folder" ? "Create" : "Upload"}
      </ButtonCreate>
    </form>
  );
};

export default FormUpload;
