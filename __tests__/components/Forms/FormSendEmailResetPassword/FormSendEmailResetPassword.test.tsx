import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import FormSendEmailResetPassword from "@/components/Forms/FormSendEmailResetPassword/FormSendEmailResetPassword";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import authService from "@/services/authService";

import { mockPush } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: mockPush }),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { sendEmailReset: jest.fn() },
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
  const result = render(<FormSendEmailResetPassword />, { wrapper: createWrapper(store) });
  return { result, store };
};

describe("FormSendEmailResetPassword", () => {
  it("should render the email input and send email button", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "send email" })).toBeInTheDocument();
  });

  it("should show a warning when submitting with empty email", async () => {
    const { store } = renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "send email" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("warning");
    });
    expect(authService.sendEmailReset).not.toHaveBeenCalled();
  });

  it("should call authService.sendEmailReset and redirect to /login on success", async () => {
    (authService.sendEmailReset as jest.Mock).mockResolvedValue({ message: "Email sent" });
    renderComponent();

    await userEvent.type(screen.getByPlaceholderText("Email"), "alice@example.com");
    await userEvent.click(screen.getByRole("button", { name: "send email" }));

    await waitFor(() => {
      expect(authService.sendEmailReset).toHaveBeenCalledWith("alice@example.com");
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("should show error alert when sendEmailReset throws", async () => {
    (authService.sendEmailReset as jest.Mock).mockRejectedValue(new Error("User not found"));
    const { store } = renderComponent();

    await userEvent.type(screen.getByPlaceholderText("Email"), "alice@example.com");
    await userEvent.click(screen.getByRole("button", { name: "send email" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("error");
    });
  });
});
