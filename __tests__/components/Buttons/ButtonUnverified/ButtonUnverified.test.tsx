import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import ButtonUnverified from "@/components/Buttons/ButtonUnverified/ButtonUnverified";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import userService from "@/services/userService";

jest.mock("@/services/userService", () => ({
  __esModule: true,
  default: {
    sendVerificationEmail: jest.fn(),
  },
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
  const result = render(<ButtonUnverified />, { wrapper: createWrapper(store) });
  return { result, store };
};

describe("ButtonUnverified", () => {
  it("should render the button with text Unverified", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "button unverified" })).toBeInTheDocument();
    expect(screen.getByText("Unverified")).toBeInTheDocument();
  });

  it("should show success alert after sending verification email", async () => {
    (userService.sendVerificationEmail as jest.Mock).mockResolvedValue({
      message: "Email sent",
    });
    const { store } = renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button unverified" }));

    await waitFor(() => {
      expect(store.getState().alert.message).toBe("Email sent");
    });
  });

  it("should show error alert when sendVerificationEmail throws", async () => {
    (userService.sendVerificationEmail as jest.Mock).mockRejectedValue(new Error("Network error"));
    const { store } = renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button unverified" }));

    await waitFor(() => {
      expect(store.getState().alert.type).toBe("error");
    });
  });
});
