import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import UploadPage from "@/app/(filemanager)/upload/[...folderPath]/page";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock; refresh: jest.Mock } => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("@/services/filemanagerService", () => ({
  default: { upload: jest.fn(), createFolder: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);

const renderPage = async (params: Promise<{ folderPath: string[] }>): Promise<void> => {
  render(await UploadPage({ params }), { wrapper: Wrapper });
};

describe("UploadPage", () => {
  it("should render the upload form", async () => {
    await renderPage(Promise.resolve({ folderPath: ["docs"] }));

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "button create" })).toBeInTheDocument();
  });

  it("should pass the correct path to FormUpload for nested paths", async () => {
    await renderPage(Promise.resolve({ folderPath: ["docs", "work"] }));

    const pathInput = screen.getByPlaceholderText("Path");
    expect(pathInput).toHaveValue("/docs/work");
  });
});
