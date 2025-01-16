import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { useRouter } from "next/navigation";

import { FormLogin } from "@/app/components/Forms/FormLogin/FormLogin";

import {
  mockUseAlertStore,
  mockUseUserStore,
  mockUseRouter,
  mockResponseAuthLogin,
} from "@/tests/jest.constants";

import { useAlertStore } from "@/app/hooks/useAlertStore";
import { useUserStore } from "@/app/hooks/useUserStore";
import axiosInstance from "@/services/axios";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<FormLogin></FormLogin>);

  return {
    container: container,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));
jest.mock("@/app/hooks/useUserStore", () => ({
  useUserStore: jest.fn(),
}));

describe("FormLogin.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onPost("/auth/login").reply(200, mockResponseAuthLogin);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
      (useUserStore as jest.Mock).mockReturnValue(mockUseUserStore);
    });

    test("It must render the username input, the password input and the sign in button.", () => {
      renderComponent();

      const inputName = screen.getByPlaceholderText("Username");
      const inputPassword = screen.getByPlaceholderText("Password");
      const btnSubmit = screen.getByRole("button", { name: /sign in/i });

      expect(inputName).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
    });

    test("It must execute the handleSubmitLogin function with invalid fields.", async () => {
      renderComponent();

      const btnSubmit = screen.getByRole("button", { name: /sign in/i });

      await user.click(btnSubmit);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Trying to log in...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "warning",
        "To log in you need a username and password.",
        true
      );
    });

    test("It must execute the handleSubmitLogin function with valid fields.", async () => {
      const name = "pepe";
      const password = "1234";

      renderComponent();

      const inputName = screen.getByPlaceholderText("Username");
      const inputPassword = screen.getByPlaceholderText("Password");
      const btnSubmit = screen.getByRole("button", { name: /sign in/i });

      await user.clear(inputName);
      await user.click(inputName);
      await user.keyboard(name);

      await user.clear(inputPassword);
      await user.click(inputPassword);
      await user.keyboard(password);

      await user.click(btnSubmit);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Trying to log in...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        "You have successfully logged in.",
        true
      );
      expect(mockUseUserStore.handleSetUser).toHaveBeenCalledTimes(1);
      expect(mockUseUserStore.handleSetUser).toHaveBeenCalledWith(
        mockResponseAuthLogin.data
      );
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith("/");
    });
  });

  describe("If alert type is loading.", () => {
    const alertType = "loading";

    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onPost("/auth/login").reply(200, mockResponseAuthLogin);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, type: alertType },
      });
      (useUserStore as jest.Mock).mockReturnValue(mockUseUserStore);
    });

    test("It must render the sign in button disabled.", () => {
      renderComponent();

      const btnSubmit = screen.getByRole("button", { name: /sign in/i });

      expect(btnSubmit).toBeDisabled();
    });
  });
});
