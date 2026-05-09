import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import FormLogin from "@/components/Forms/FormLogin/FormLogin";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import authService from "@/services/authService";
import userService from "@/services/userService";

import { mockPush } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: mockPush }),
  usePathname: jest.fn(),
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

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = (): { result: RenderResult; store: ReturnType<typeof createStore> } => {
  const store = createStore();
  const result = render(<FormLogin />, { wrapper: createWrapper(store) });
  return { result, store };
};

beforeEach((): void => {
  (usePathname as jest.Mock).mockReturnValue("/login");
  (userService.getUserInfo as jest.Mock).mockResolvedValue({ data: null });
});

describe("FormLogin", () => {
  it("should render username and password inputs and the sign in button", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "sign in" })).toBeInTheDocument();
  });

  it("should show a warning when submitting without credentials", async () => {
    const { store } = renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "sign in" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("warning");
    });
    expect(authService.login).not.toHaveBeenCalled();
  });

  it("should call authService.login with correct credentials and redirect on success", async () => {
    (authService.login as jest.Mock).mockResolvedValue({
      data: { username: "alice", email: "alice@example.com", plan: "0", emailVerified: false },
    });
    renderComponent();

    await userEvent.type(screen.getByPlaceholderText("Username"), "alice");
    await userEvent.type(screen.getByPlaceholderText("Password"), "secret");
    await userEvent.click(screen.getByRole("button", { name: "sign in" }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith("alice", "secret");
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("should show error alert when login fails", async () => {
    (authService.login as jest.Mock).mockRejectedValue(new Error("Invalid credentials"));
    const { store } = renderComponent();

    await userEvent.type(screen.getByPlaceholderText("Username"), "alice");
    await userEvent.type(screen.getByPlaceholderText("Password"), "wrong");
    await userEvent.click(screen.getByRole("button", { name: "sign in" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("error");
    });
  });
});
