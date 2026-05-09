import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import NewPasswordPage from "@/app/(auth)/new/page";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: jest.fn() }),
  useSearchParams: (): { get: () => null } => ({ get: (): null => null }),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { resetPassword: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);

const renderPage = (searchParams: { username: string }): void => {
  render(<NewPasswordPage searchParams={searchParams} />, { wrapper: Wrapper });
};

describe("NewPasswordPage", () => {
  it("should render the change password heading with the username", () => {
    renderPage({ username: "alice" });

    expect(screen.getByText(/Change your password alice/)).toBeInTheDocument();
  });

  it("should render the password input", () => {
    renderPage({ username: "alice" });

    expect(screen.getByPlaceholderText("New Password")).toBeInTheDocument();
  });

  it("should render the sign-in link", () => {
    renderPage({ username: "alice" });

    expect(screen.getByRole("link", { name: "go to login page" })).toBeInTheDocument();
  });
});
