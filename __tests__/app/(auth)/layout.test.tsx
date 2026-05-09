import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

import AuthLayout from "@/app/(auth)/layout";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Provider store={createStore()}>{children}</Provider>
);

const renderLayout = (children: ReactNode): void => {
  render(<AuthLayout>{children}</AuthLayout>, { wrapper: Wrapper });
};

describe("AuthLayout", () => {
  it("should render children", () => {
    renderLayout(<span>Page content</span>);

    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("should render the Alert component", () => {
    renderLayout(<span>Content</span>);

    expect(document.querySelector<HTMLDivElement>(".alert")).toBeInTheDocument();
  });
});
