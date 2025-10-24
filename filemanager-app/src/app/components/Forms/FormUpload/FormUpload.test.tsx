import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { useRouter } from "next/navigation";

import { FormUpload } from "@src/app/components/Forms/FormUpload/FormUpload";

import {
  mockResponseFilemanagerCreateFolder,
  mockResponseFilemanagerUpload,
  mockUseAlertStore,
  mockUseRouter,
} from "@tests/jest.constants";

import { useAlertStore } from "@src/app/hooks/useAlertStore";
import axiosInstance from "@src/services/axios";

type RenderComponent = {
  container: HTMLElement;
};

interface RenderComponentProps {
  path: string;
}

const renderComponent = ({ path }: RenderComponentProps): RenderComponent => {
  const { container } = render(<FormUpload path={path}></FormUpload>);

  return {
    container: container,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@src/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));

describe("FormUpload.tsx", () => {
  describe("General Tests.", () => {
    const path = "/";

    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock
        .onPost("/filemanager/upload")
        .reply(200, mockResponseFilemanagerUpload);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the select with the folder and file options.", () => {
      renderComponent({ path: path });

      const select = screen.getByRole("combobox");
      const options = screen.getAllByRole("option");

      expect(select).toBeInTheDocument();
      expect(options).toHaveLength(2);

      for (const option of options) {
        expect(option).toBeInTheDocument();
      }
    });
  });

  describe("If folder is selected.", () => {
    const path = "/";

    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock
        .onPost("/filemanager")
        .reply(200, mockResponseFilemanagerCreateFolder);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It should render the folder name input and the path input and the create button.", async () => {
      renderComponent({ path: path });

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, ["folder"]);

      const inputFolderName = screen.getByPlaceholderText("Name of Folder");
      const inputPath = screen.getByPlaceholderText("Path");
      const btnCreate = screen.getByRole("button", { name: /button create/i });

      expect(inputFolderName).toBeInTheDocument();
      expect(inputPath).toBeInTheDocument();
      expect(inputPath).toBeDisabled();
      expect(btnCreate).toBeInTheDocument();
      expect(btnCreate.textContent).toEqual("Create");
    });

    test("It must execute the handleSubmitForm function with invalid values.", async () => {
      renderComponent({ path: path });

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, ["folder"]);

      const btnCreate = screen.getByRole("button", { name: /button create/i });

      await user.click(btnCreate);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        `Creating the folder: `,
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "warning",
        "You must enter a name of the folder to be created.",
        true
      );
    });

    test("It must execute the handleSubmitForm function with valid values.", async () => {
      const folderName = "pq";

      renderComponent({ path: path });

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, ["folder"]);

      const inputFolderName = screen.getByPlaceholderText("Name of Folder");
      const btnCreate = screen.getByRole("button", { name: /button create/i });

      await user.clear(inputFolderName);
      await user.click(inputFolderName);
      await user.keyboard(folderName);

      await user.click(btnCreate);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        `Creating the folder: ${folderName}`,
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        `The folder was successfully created: ${folderName}`,
        true
      );
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(`/folder/root`);
      expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
    });
  });

  describe("If file is selected.", () => {
    const path = "/";

    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock
        .onPost("/filemanager/upload")
        .reply(200, mockResponseFilemanagerUpload);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It should render the file input and the path input and the upload button.", async () => {
      const { container } = renderComponent({ path: path });

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, ["file"]);

      const inputs = container.querySelectorAll<HTMLInputElement>("input");
      const inputFile = Array.from(inputs).find(
        (input) => input.id === "custom-input"
      );
      const inputPath = screen.getByPlaceholderText("Path");
      const btnUpload = screen.getByRole("button", { name: /button create/i });

      expect(inputFile).toBeInTheDocument();
      expect(inputPath).toBeInTheDocument();
      expect(inputPath).toBeDisabled();
      expect(btnUpload).toBeInTheDocument();
      expect(btnUpload.textContent).toEqual("Upload");
    });

    test("It must execute the handleSubmitForm function with invalid values.", async () => {
      renderComponent({ path: path });

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, ["file"]);

      const btnUpload = screen.getByRole("button", { name: /button create/i });

      await user.click(btnUpload);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        `Uploading the file: undefined`,
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "warning",
        "A file is required to upload, select it.",
        true
      );
    });

    test("It must execute the handleSubmitForm function with valid values.", async () => {
      const file = new File(["dummy content"], "example.txt", {
        type: "text/plain",
      });

      const { container } = renderComponent({ path: path });

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, ["file"]);

      const inputs = container.querySelectorAll<HTMLInputElement>("input");
      const inputFile = Array.from(inputs).find(
        (input) => input.id === "custom-input"
      );
      const btnUpload = screen.getByRole("button", { name: /button create/i });

      await user.upload(inputFile!, file);

      await user.click(btnUpload);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        `Uploading the file: ${file?.name}`,
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        `Successfully uploaded: ${file?.name}`,
        true
      );
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(`/folder/root`);
      expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
    });
  });

  describe("If path has content.", () => {
    const path = "/patchito/a";

    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock
        .onPost("/filemanager")
        .reply(200, mockResponseFilemanagerCreateFolder);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must execute the handleSubmitForm function with valid values.", async () => {
      const folderName = "pq";

      renderComponent({ path: path });

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, ["folder"]);

      const inputFolderName = screen.getByPlaceholderText("Name of Folder");
      const btnCreate = screen.getByRole("button", { name: /button create/i });

      await user.clear(inputFolderName);
      await user.click(inputFolderName);
      await user.keyboard(folderName);

      await user.click(btnCreate);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        `Creating the folder: ${folderName}`,
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        `The folder was successfully created: ${folderName}`,
        true
      );
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(`/folder/${path}`);
      expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
    });
  });
});
