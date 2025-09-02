import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { useRouter } from "next/navigation";

import { ButtonLogout } from "@src/app/components/Buttons/ButtonLogout/ButtonLogout";

import {
  mockResponseAuthLogout,
  mockUseAlertStore,
  mockUseRouter,
} from "@tests/jest.constants";

import { useAlertStore } from "@src/app/hooks/useAlertStore";
import axiosInstance from "@src/services/axios";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<ButtonLogout></ButtonLogout>);

  return {
    container: container,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@src/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));

describe("ButtonLogout.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onGet("/auth/logout").reply(200, mockResponseAuthLogout);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the button.", () => {
      renderComponent();

      const btnLogOut = screen.getByRole("button", { name: "button logout" });
      const icon = btnLogOut.children[0];

      expect(btnLogOut).toBeInTheDocument();
      expect(btnLogOut.children).toHaveLength(1);
      expect(icon).toBeTruthy();
    });

    test("It should call handleClickLogOut when the button is clicked", async () => {
      renderComponent();

      const btnLogOut = screen.getByRole("button", { name: "button logout" });

      await user.click(btnLogOut);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Closing account...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        "The account has been successfully closed.",
        true
      );
      expect(mockUseRouter.push).toHaveBeenCalledWith("/login");
    });
  });
});
