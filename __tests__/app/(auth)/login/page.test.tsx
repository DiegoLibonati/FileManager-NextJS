import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import LoginPage from "@/app/(auth)/login/page";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import userService from "@/services/userService";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue("/login"),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { login: jest.fn() },
}));

jest.mock("@/services/userService", () => ({
  __esModule: true,
  default: { getUserInfo: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);

const renderPage = (): void => {
  render(<LoginPage />, { wrapper: Wrapper });
};

beforeEach((): void => {
  (usePathname as jest.Mock).mockReturnValue("/login");
  (userService.getUserInfo as jest.Mock).mockResolvedValue({ data: null });
});

describe("LoginPage", () => {
  it("should render the welcome heading", () => {
    renderPage();

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("should render the sign-in form inputs", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("should render the register link", () => {
    renderPage();

    expect(screen.getByRole("link", { name: "go to register page" })).toBeInTheDocument();
  });

  it("should render the forgot password link", () => {
    renderPage();

    expect(screen.getByRole("link", { name: "go to reset your password" })).toBeInTheDocument();
  });
});
