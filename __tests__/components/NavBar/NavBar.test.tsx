import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import NavBar from "@/components/NavBar/NavBar";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import { mockPush } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: (): { push: jest.Mock } => ({ push: mockPush }),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { logout: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = (pathname = "/"): RenderResult => {
  (usePathname as jest.Mock).mockReturnValue(pathname);
  const store = createStore();
  return render(<NavBar />, { wrapper: createWrapper(store) });
};

describe("NavBar", () => {
  it("should render all navigation links", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "go to home page" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "go to folders page" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "go to cloud page" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "go to folder root page" })).toBeInTheDocument();
  });

  it("should render the logout button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "button logout" })).toBeInTheDocument();
  });

  it("should render home link with correct href", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "go to home page" })).toHaveAttribute("href", "/");
  });

  it("should render folders link with correct href", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "go to folders page" })).toHaveAttribute(
      "href",
      "/folders"
    );
  });
});
