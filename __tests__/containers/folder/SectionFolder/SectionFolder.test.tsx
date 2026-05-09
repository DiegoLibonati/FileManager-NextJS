import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

import SectionFolder from "@/containers/folder/SectionFolder/SectionFolder";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import { mockFiles } from "@tests/__mocks__/files.mock";
import { mockFolders } from "@tests/__mocks__/folders.mock";

jest.mock("@/server/helpers/get_session.helper", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/server/services/filemanager.service", () => ({
  FileManagerService: {
    getDirectory: jest.fn(),
  },
}));

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { CLOUD_PATH: string } => ({ CLOUD_PATH: "/cloud" }),
}));

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock; refresh: jest.Mock } => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("@/services/filemanagerService", () => ({
  __esModule: true,
  default: { deleteItem: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);

const renderContainer = async (folderPath: string): Promise<void> => {
  render(await SectionFolder({ folderPath }), { wrapper: Wrapper });
};

describe("SectionFolder", () => {
  it("should render files and folders when content exists", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getDirectory as jest.Mock).mockResolvedValue([
      mockFiles[0],
      mockFolders[0],
    ]);

    await renderContainer("docs");

    expect(screen.getByText("photo.png")).toBeInTheDocument();
    expect(screen.getByText("docs")).toBeInTheDocument();
  });

  it("should render empty state when directory is empty", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getDirectory as jest.Mock).mockResolvedValue([]);

    await renderContainer("empty");

    expect(screen.getByText("You have no files uploaded yet!")).toBeInTheDocument();
  });
});
