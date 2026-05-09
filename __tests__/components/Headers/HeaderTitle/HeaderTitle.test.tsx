import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { usePathname, useParams } from "next/navigation";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { User } from "@/types/app";

import HeaderTitle from "@/components/Headers/HeaderTitle/HeaderTitle";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer, { setUser } from "@/redux/features/user/userSlice";

import userService from "@/services/userService";

import { mockSession } from "@tests/__mocks__/session.mock";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useParams: jest.fn().mockReturnValue({}),
  useRouter: (): { push: jest.Mock } => ({ push: jest.fn() }),
}));

jest.mock("@/services/userService", () => ({
  __esModule: true,
  default: { getUserInfo: jest.fn(), sendVerificationEmail: jest.fn() },
}));

const createStore = (user?: User): EnhancedStore => {
  const store = configureStore({ reducer: { alert: alertReducer, user: userReducer } });
  if (user) store.dispatch(setUser(user));
  return store;
};

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = (pathname: string, user?: User): RenderResult => {
  (usePathname as jest.Mock).mockReturnValue(pathname);
  const store = createStore(user);
  return render(<HeaderTitle />, { wrapper: createWrapper(store) });
};

beforeEach((): void => {
  (useParams as jest.Mock).mockReturnValue({});
  (userService.getUserInfo as jest.Mock).mockResolvedValue({ data: null });
});

describe("HeaderTitle", () => {
  it("should show welcome message with username on home path", () => {
    renderComponent("/", mockSession);

    expect(screen.getByRole("heading")).toHaveTextContent("Welcome alice");
  });

  it("should show 'All Folders' on /folders path", () => {
    renderComponent("/folders", mockSession);

    expect(screen.getByRole("heading")).toHaveTextContent("All Folders");
  });

  it("should show 'My Cloud' on /cloud path", () => {
    renderComponent("/cloud", mockSession);

    expect(screen.getByRole("heading")).toHaveTextContent("My Cloud");
  });

  it("should show 'New Things' on /upload path", () => {
    renderComponent("/upload", mockSession);

    expect(screen.getByRole("heading")).toHaveTextContent("New Things");
  });

  it("should show the ButtonUnverified when email is not verified", () => {
    renderComponent("/", { ...mockSession, emailVerified: false });

    expect(screen.getByRole("button", { name: "button unverified" })).toBeInTheDocument();
  });

  it("should not show ButtonUnverified when email is verified", () => {
    renderComponent("/", { ...mockSession, emailVerified: true });

    expect(screen.queryByRole("button", { name: "button unverified" })).not.toBeInTheDocument();
  });
});
