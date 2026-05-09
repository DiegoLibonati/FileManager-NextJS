import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import ResetPasswordPage from "@/app/(auth)/reset/page";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: jest.fn() }),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { sendEmailReset: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);

const renderPage = (): void => {
  render(<ResetPasswordPage />, { wrapper: Wrapper });
};

describe("ResetPasswordPage", () => {
  it("should render the forgot password heading", () => {
    renderPage();

    expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
  });

  it("should render the email input", () => {
    renderPage();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("should render the sign-in link", () => {
    renderPage();

    expect(screen.getByRole("link", { name: "go to login page" })).toBeInTheDocument();
  });
});
