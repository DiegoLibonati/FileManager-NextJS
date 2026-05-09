import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { RenderResult } from "@testing-library/react";
import type { FileItem } from "@/types/app";

import FileList from "@/components/Lists/FileList/FileList";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import { mockFiles } from "@tests/__mocks__/files.mock";

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

const renderComponent = (files: FileItem[] = []): RenderResult => {
  const store = createStore();
  return render(<FileList files={files} />, { wrapper: createWrapper(store) });
};

describe("FileList", () => {
  it("should render all files", () => {
    renderComponent(mockFiles);

    expect(screen.getByText("photo.png")).toBeInTheDocument();
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
  });

  it("should render nothing when the file list is empty", () => {
    const { container } = renderComponent([]);

    expect(container.querySelectorAll<HTMLDivElement>(".card__item")).toHaveLength(0);
  });

  it("should display formatted file size", () => {
    renderComponent([mockFiles[0]!]);

    expect(screen.getByText(/MB/)).toBeInTheDocument();
  });
});
