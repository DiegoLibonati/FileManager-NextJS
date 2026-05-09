import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useSearchParams } from "next/navigation";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import FormResetPassword from "@/components/Forms/FormResetPassword/FormResetPassword";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import authService from "@/services/authService";

import { mockPush } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: mockPush }),
  useSearchParams: jest.fn(),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { resetPassword: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const mockSearchParams = (id: string, username: string): void => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get: (key: string) => (key === "id" ? id : username),
  });
};

const renderComponent = (): { result: RenderResult; store: ReturnType<typeof createStore> } => {
  mockSearchParams("hash-id", "alice");
  const store = createStore();
  const result = render(<FormResetPassword />, { wrapper: createWrapper(store) });
  return { result, store };
};

describe("FormResetPassword", () => {
  it("should render the password input and change password button", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("New Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "change password" })).toBeInTheDocument();
  });

  it("should show a warning when submitting with empty password", async () => {
    const { store } = renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "change password" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("warning");
    });
    expect(authService.resetPassword).not.toHaveBeenCalled();
  });

  it("should call authService.resetPassword and redirect to /login on success", async () => {
    (authService.resetPassword as jest.Mock).mockResolvedValue({ message: "Password changed" });
    renderComponent();

    await userEvent.type(screen.getByPlaceholderText("New Password"), "newpassword");
    await userEvent.click(screen.getByRole("button", { name: "change password" }));

    await waitFor(() => {
      expect(authService.resetPassword).toHaveBeenCalledWith("hash-id", "alice", "newpassword");
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("should show error alert when resetPassword throws", async () => {
    (authService.resetPassword as jest.Mock).mockRejectedValue(new Error("Invalid token"));
    const { store } = renderComponent();

    await userEvent.type(screen.getByPlaceholderText("New Password"), "newpassword");
    await userEvent.click(screen.getByRole("button", { name: "change password" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("error");
    });
  });
});
