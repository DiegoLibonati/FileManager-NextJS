import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { CardItemProps } from "@/types/props";

import CardItem from "@/components/Cards/CardItem/CardItem";

import alertReducer from "@/redux/features/alert/alertSlice";
import userReducer from "@/redux/features/user/userSlice";

import filemanagerService from "@/services/filemanagerService";

import { mockPush, mockRefresh } from "@tests/__mocks__/next-navigation.mock";

const defaultProps: CardItemProps = {
  title: "photo.png",
  subTitle: "1.5 MB",
  path: "/docs/photo.png",
  type: "file",
  idCategory: "images",
  bgColor: "#ecf9ed",
  color: "#59e766",
};

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock; refresh: jest.Mock } => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

jest.mock("@/services/filemanagerService", () => ({
  __esModule: true,
  default: {
    deleteItem: jest.fn(),
  },
}));

const createStore = (): EnhancedStore =>
  configureStore({ reducer: { alert: alertReducer, user: userReducer } });

const createWrapper =
  (store: ReturnType<typeof createStore>) =>
  ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

const renderComponent = (props: Partial<CardItemProps> = {}): RenderResult => {
  const store = createStore();
  return render(<CardItem {...defaultProps} {...props} />, { wrapper: createWrapper(store) });
};

describe("CardItem", () => {
  it("should render the title", () => {
    renderComponent();

    expect(screen.getByText("photo.png")).toBeInTheDocument();
  });

  it("should render the subtitle", () => {
    renderComponent();

    expect(screen.getByText("1.5 MB")).toBeInTheDocument();
  });

  it("should navigate to folder path when type is folder and card is clicked", async () => {
    renderComponent({ type: "folder", path: "/docs", title: "docs" });

    await userEvent.click(screen.getByText("docs"));

    expect(mockPush).toHaveBeenCalledWith("/folder//docs");
  });

  it("should show the dropdown when ButtonActions is clicked", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button actions" }));

    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("should call deleteItem and refresh when delete is clicked", async () => {
    (filemanagerService.deleteItem as jest.Mock).mockResolvedValue(undefined);
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button actions" }));
    await userEvent.click(screen.getByText("Eliminar"));

    await waitFor(() => {
      expect(filemanagerService.deleteItem).toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });
});
