import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { usePathname, useParams } from "next/navigation";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import FileManagerLayout from "@/app/(filemanager)/layout";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import userService from "@/services/userService";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/"),
  useParams: jest.fn().mockReturnValue({}),
  useRouter: (): { push: jest.Mock } => ({ push: jest.fn() }),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { logout: jest.fn() },
}));

jest.mock("@/services/userService", () => ({
  __esModule: true,
  default: { getUserInfo: jest.fn(), sendVerificationEmail: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);

const renderLayout = (children: ReactNode): void => {
  render(<FileManagerLayout>{children}</FileManagerLayout>, { wrapper: Wrapper });
};

beforeEach((): void => {
  (usePathname as jest.Mock).mockReturnValue("/");
  (useParams as jest.Mock).mockReturnValue({});
  (userService.getUserInfo as jest.Mock).mockResolvedValue({ data: null });
});

describe("FileManagerLayout", () => {
  it("should render children", () => {
    renderLayout(<span>Main content</span>);

    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("should render the NavBar", () => {
    renderLayout(<span>Content</span>);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render the Alert component", () => {
    renderLayout(<span>Content</span>);

    expect(document.querySelector<HTMLDivElement>(".alert")).toBeInTheDocument();
  });
});
