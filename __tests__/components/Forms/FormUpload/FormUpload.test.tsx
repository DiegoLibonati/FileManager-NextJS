import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import FormUpload from "@/components/Forms/FormUpload/FormUpload";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import filemanagerService from "@/services/filemanagerService";

import { mockPush, mockRefresh } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock; refresh: jest.Mock } => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

jest.mock("@/services/filemanagerService", () => ({
  __esModule: true,
  default: {
    upload: jest.fn(),
    createFolder: jest.fn(),
  },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = (
  path = "root"
): { result: RenderResult; store: ReturnType<typeof createStore> } => {
  const store = createStore();
  const result = render(<FormUpload path={path} />, { wrapper: createWrapper(store) });
  return { result, store };
};

describe("FormUpload", () => {
  it("should render the type selector and create button by default", () => {
    renderComponent();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "button create" })).toBeInTheDocument();
  });

  it("should render folder name input when 'New Folder' is selected", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Name of Folder")).toBeInTheDocument();
  });

  it("should show 'Choose file' label when Upload File is selected", async () => {
    renderComponent();

    await userEvent.selectOptions(screen.getByRole("combobox"), "file");

    expect(screen.getByText("Choose file")).toBeInTheDocument();
  });

  it("should show warning when creating a folder without a name", async () => {
    const { store } = renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button create" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("warning");
    });
    expect(filemanagerService.createFolder).not.toHaveBeenCalled();
  });

  it("should call createFolder and redirect on successful folder creation", async () => {
    (filemanagerService.createFolder as jest.Mock).mockResolvedValue(undefined);
    renderComponent("docs");

    await userEvent.type(screen.getByPlaceholderText("Name of Folder"), "new-folder");
    await userEvent.click(screen.getByRole("button", { name: "button create" }));

    await waitFor(() => {
      expect(filemanagerService.createFolder).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it("should show error alert when createFolder throws", async () => {
    (filemanagerService.createFolder as jest.Mock).mockRejectedValue(new Error("Server error"));
    const { store } = renderComponent("docs");

    await userEvent.type(screen.getByPlaceholderText("Name of Folder"), "bad-folder");
    await userEvent.click(screen.getByRole("button", { name: "button create" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("error");
    });
  });
});
