import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { useRouter } from "next/navigation";

import { FormRegister } from "@src/app/components/Forms/FormRegister/FormRegister";

import {
  mockResponseAuthRegister,
  mockUseAlertStore,
  mockUseRouter,
} from "@tests/jest.constants";

import { useAlertStore } from "@src/app/hooks/useAlertStore";
import axiosInstance from "@src/services/axios";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<FormRegister></FormRegister>);

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

describe("FormRegister.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onPost("/auth/register").reply(200, mockResponseAuthRegister);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the username input, the password input, the email input and the sign up button.", () => {
      renderComponent();

      const inputName = screen.getByPlaceholderText("Username");
      const inputEmail = screen.getByPlaceholderText("Email");
      const inputPassword = screen.getByPlaceholderText("Password");
      const btnSubmit = screen.getByRole("button", { name: /sign up/i });

      expect(inputName).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
    });

    test("It must execute the handleSubmitRegister function with invalid fields.", async () => {
      renderComponent();

      const btnSubmit = screen.getByRole("button", { name: /sign up/i });

      await user.click(btnSubmit);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Trying to create your account...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "warning",
        "You must enter a username, password and email address to create an account.",
        true
      );
    });

    test("It must execute the handleSubmitRegister function with valid fields.", async () => {
      const name = "pepe";
      const email = "pepe@gmail.com";
      const password = "1234";

      renderComponent();

      const inputName = screen.getByPlaceholderText("Username");
      const inputEmail = screen.getByPlaceholderText("Email");
      const inputPassword = screen.getByPlaceholderText("Password");
      const btnSubmit = screen.getByRole("button", { name: /sign up/i });

      await user.clear(inputName);
      await user.click(inputName);
      await user.keyboard(name);

      await user.clear(inputEmail);
      await user.click(inputEmail);
      await user.keyboard(email);

      await user.clear(inputPassword);
      await user.click(inputPassword);
      await user.keyboard(password);

      await user.click(btnSubmit);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Trying to create your account...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        "Account successfully created.",
        true
      );
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith("/login");
    });
  });

  describe("If alert type is loading.", () => {
    const alertType = "loading";

    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onPost("/auth/register").reply(200, mockResponseAuthRegister);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, type: alertType },
      });
    });

    test("It must render the sign up button disabled.", () => {
      renderComponent();

      const btnSubmit = screen.getByRole("button", { name: /sign up/i });

      expect(btnSubmit).toBeDisabled();
    });
  });
});
