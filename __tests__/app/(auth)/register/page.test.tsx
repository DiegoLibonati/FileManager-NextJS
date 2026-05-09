import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import RegisterPage from "@/app/(auth)/register/page";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: jest.fn() }),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { register: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);

const renderPage = (): void => {
  render(<RegisterPage />, { wrapper: Wrapper });
};

describe("RegisterPage", () => {
  it("should render the create account heading", () => {
    renderPage();

    expect(screen.getByText("Create an account!")).toBeInTheDocument();
  });

  it("should render the registration form inputs", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("should render the sign-in link", () => {
    renderPage();

    expect(screen.getByRole("link", { name: "go to login page" })).toBeInTheDocument();
  });
});
