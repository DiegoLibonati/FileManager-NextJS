import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { RenderResult } from "@testing-library/react";
import type { FolderItem } from "@/types/app";

import FolderList from "@/components/Lists/FolderList/FolderList";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import { mockFolders } from "@tests/__mocks__/folders.mock";

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

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = (
  folders: FolderItem[],
  folderType: "simple" | "withActions"
): RenderResult => {
  const store = createStore();
  return render(<FolderList folders={folders} folderType={folderType} />, {
    wrapper: createWrapper(store),
  });
};

describe("FolderList", () => {
  it("should render all folders with simple type using CardSimple", () => {
    renderComponent(mockFolders, "simple");

    expect(screen.getByText("docs")).toBeInTheDocument();
    expect(screen.getByText("photos")).toBeInTheDocument();
  });

  it("should render folders with withActions type using CardItem", () => {
    renderComponent(mockFolders, "withActions");

    expect(screen.getByText("docs")).toBeInTheDocument();
    expect(screen.getByText("photos")).toBeInTheDocument();
  });

  it("should show item count in subtitle for simple type", () => {
    renderComponent([mockFolders[0]!], "simple");

    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  it("should render nothing when the folder list is empty", () => {
    const { container } = renderComponent([], "simple");

    expect(container.querySelectorAll<HTMLDivElement>(".card__simple, .card__item")).toHaveLength(
      0
    );
  });
});
