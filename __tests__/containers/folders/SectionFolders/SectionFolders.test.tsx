import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

import SectionFolders from "@/containers/folders/SectionFolders/SectionFolders";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import { mockFolders } from "@tests/__mocks__/folders.mock";

jest.mock("@/server/helpers/get_session.helper", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/server/services/filemanager.service", () => ({
  FileManagerService: {
    getAllFolders: jest.fn(),
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

const renderContainer = async (): Promise<void> => {
  render(await SectionFolders(), { wrapper: Wrapper });
};

describe("folders/SectionFolders", () => {
  it("should render folders with actions when folders exist", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getAllFolders as jest.Mock).mockResolvedValue([mockFolders[0]]);

    await renderContainer();

    expect(screen.getByText("docs")).toBeInTheDocument();
  });

  it("should render empty state when no folders exist", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getAllFolders as jest.Mock).mockResolvedValue([]);

    await renderContainer();

    expect(screen.getByText("You have no folders created yet!")).toBeInTheDocument();
  });
});
