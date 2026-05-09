import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { AlertState } from "@/types/states";

import Alert from "@/components/Alerts/Alert/Alert";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

const createStore = (alertState?: Partial<AlertState>): EnhancedStore =>
  configureStore({
    reducer: { alert: alertReducer, user: userReducer },
    preloadedState: {
      alert: { type: "info" as const, message: "", open: false, ...alertState },
    },
  });

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = (alertState?: Partial<AlertState>): RenderResult => {
  const store = createStore(alertState);
  return render(<Alert />, { wrapper: createWrapper(store) });
};

describe("Alert", () => {
  it("should be hidden when alert is closed", () => {
    const { container } = renderComponent({ open: false });

    expect(container.querySelector<HTMLDivElement>(".alert")).toHaveClass("hidden");
  });

  it("should be visible when alert is open", () => {
    const { container } = renderComponent({ open: true, type: "info", message: "Hello" });

    expect(container.querySelector<HTMLDivElement>(".alert")).toHaveClass("flex");
  });

  it("should display the alert message", () => {
    renderComponent({ open: true, type: "error", message: "Something went wrong" });

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should show the info icon for type info", () => {
    const { container } = renderComponent({ open: true, type: "info", message: "Info" });

    expect(container.querySelector<SVGSVGElement>(".alert__info")).toBeInTheDocument();
  });

  it("should show the error icon for type error", () => {
    const { container } = renderComponent({ open: true, type: "error", message: "Error" });

    expect(container.querySelector<SVGSVGElement>(".alert__error")).toBeInTheDocument();
  });

  it("should show the warning icon for type warning", () => {
    const { container } = renderComponent({ open: true, type: "warning", message: "Warning" });

    expect(container.querySelector<SVGSVGElement>(".alert__warning")).toBeInTheDocument();
  });

  it("should show the loading icon for type loading", () => {
    const { container } = renderComponent({ open: true, type: "loading", message: "Loading" });

    expect(container.querySelector<SVGSVGElement>(".alert__loading")).toBeInTheDocument();
  });

  it("should close the alert when the close button is clicked", async () => {
    const store = createStore({ open: true, type: "info", message: "Hello" });
    render(<Alert />, { wrapper: createWrapper(store) });

    await userEvent.click(screen.getByRole("button", { name: "close alert" }));

    expect(store.getState().alert.open).toBe(false);
  });
});
