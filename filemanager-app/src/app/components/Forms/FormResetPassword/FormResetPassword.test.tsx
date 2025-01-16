import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { useRouter, useSearchParams } from "next/navigation";

import { FormResetPassword } from "@/app/components/Forms/FormResetPassword/FormResetPassword";

import {
  mockUseAlertStore,
  mockUseRouter,
  mockUseSearchParams,
  mockResponseAuthReset,
} from "@/tests/jest.constants";

import { useAlertStore } from "@/app/hooks/useAlertStore";
import axiosInstance from "@/services/axios";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<FormResetPassword></FormResetPassword>);

  return {
    container: container,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock("@/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));

describe("FormResetPassword.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onPost("/auth/reset").reply(200, mockResponseAuthReset);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useSearchParams as jest.Mock).mockReturnValue(mockUseSearchParams);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the password input and the change password button.", () => {
      renderComponent();

      const inputPassword = screen.getByPlaceholderText("New Password");
      const btnSubmit = screen.getByRole("button", {
        name: /change password/i,
      });

      expect(inputPassword).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
    });

    test("It must execute the handleSubmitResetPassword function with invalid fields.", async () => {
      renderComponent();

      const btnSubmit = screen.getByRole("button", {
        name: /change password/i,
      });

      await user.click(btnSubmit);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Reseting password...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "warning",
        "It is necessary to enter an password",
        true
      );
    });

    test("It must execute the handleSubmitResetPassword function with valid fields.", async () => {
      const password = "1234";

      renderComponent();

      const inputPassword = screen.getByPlaceholderText("New Password");
      const btnSubmit = screen.getByRole("button", {
        name: /change password/i,
      });

      await user.clear(inputPassword);
      await user.click(inputPassword);
      await user.keyboard(password);

      await user.click(btnSubmit);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Reseting password...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        mockResponseAuthReset.message,
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
      mock.onPost("/auth/reset").reply(200, mockResponseAuthReset);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, type: alertType },
      });
    });

    test("It must render the sign up button disabled.", () => {
      renderComponent();

      const btnSubmit = screen.getByRole("button", {
        name: /change password/i,
      });

      expect(btnSubmit).toBeDisabled();
    });
  });
});
