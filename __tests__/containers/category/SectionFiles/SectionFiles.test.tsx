import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

import SectionFiles from "@/containers/category/SectionFiles/SectionFiles";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import { mockFiles } from "@tests/__mocks__/files.mock";

jest.mock("@/server/helpers/get_session.helper", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/server/services/filemanager.service", () => ({
  FileManagerService: {
    getCategoryFiles: jest.fn(),
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

const renderContainer = async (idCategory: string): Promise<void> => {
  render(await SectionFiles({ idCategory }), { wrapper: Wrapper });
};

describe("SectionFiles", () => {
  it("should render files when files exist for the category", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getCategoryFiles as jest.Mock).mockResolvedValue([mockFiles[0]]);

    await renderContainer("images");

    expect(screen.getByText("photo.png")).toBeInTheDocument();
  });

  it("should render empty state when file list is empty", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getCategoryFiles as jest.Mock).mockResolvedValue([]);

    await renderContainer("images");

    expect(screen.getByText("You have no files uploaded yet!")).toBeInTheDocument();
  });

  it("should render empty state when service returns an error object", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getCategoryFiles as jest.Mock).mockResolvedValue({
      error: "Category not found: unknown",
    });

    await renderContainer("unknown");

    expect(screen.getByText("You have no files uploaded yet!")).toBeInTheDocument();
  });
});
