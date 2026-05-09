import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { RenderResult } from "@testing-library/react";

import ButtonLogout from "@/components/Buttons/ButtonLogout/ButtonLogout";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import authService from "@/services/authService";

import { mockPush } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: mockPush }),
}));

jest.mock("@/services/authService", () => ({
  __esModule: true,
  default: {
    logout: jest.fn(),
  },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = (): RenderResult => {
  const store = createStore();
  return render(<ButtonLogout />, { wrapper: createWrapper(store) });
};

describe("ButtonLogout", () => {
  it("should render the logout button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "button logout" })).toBeInTheDocument();
  });

  it("should call authService.logout and redirect to /login on click", async () => {
    (authService.logout as jest.Mock).mockResolvedValue(undefined);
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button logout" }));

    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
