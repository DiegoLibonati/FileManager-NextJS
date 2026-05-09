import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import FormRegister from "@/components/Forms/FormRegister/FormRegister";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import authService from "@/services/authService";

import { mockPush } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: mockPush }),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: { register: jest.fn() },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = async (): Promise<{
  result: RenderResult;
  store: ReturnType<typeof createStore>;
}> => {
  const store = createStore();
  let result!: RenderResult;
  await act(async () => {
    await Promise.resolve();
    result = render(<FormRegister />, { wrapper: createWrapper(store) });
  });
  return { result, store };
};

describe("FormRegister", () => {
  it("should render username, email, password inputs and sign up button", async () => {
    await renderComponent();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "sign up" })).toBeInTheDocument();
  });

  it("should show a warning when submitting without filling all fields", async () => {
    const { store } = await renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "sign up" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("warning");
    });
    expect(authService.register).not.toHaveBeenCalled();
  });

  it("should call authService.register and redirect to /login on success", async () => {
    (authService.register as jest.Mock).mockResolvedValue({ message: "Created" });
    await renderComponent();

    await userEvent.type(screen.getByPlaceholderText("Username"), "bob");
    await userEvent.type(screen.getByPlaceholderText("Email"), "bob@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "pass123");
    await userEvent.click(screen.getByRole("button", { name: "sign up" }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith("bob", "bob@example.com", "pass123");
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("should show error alert when registration fails", async () => {
    (authService.register as jest.Mock).mockRejectedValue(new Error("Username taken"));
    const { store } = await renderComponent();

    await userEvent.type(screen.getByPlaceholderText("Username"), "bob");
    await userEvent.type(screen.getByPlaceholderText("Email"), "bob@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "pass123");
    await userEvent.click(screen.getByRole("button", { name: "sign up" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("error");
    });
  });
});
