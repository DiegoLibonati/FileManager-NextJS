import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { useRouter } from "next/navigation";

import { FormSendEmailResetPassword } from "@src/app/components/Forms/FormSendEmailResetPassword/FormSendEmailResetPassword";

import {
  mockResponseAuthSendEmailReset,
  mockUseAlertStore,
  mockUseRouter,
} from "@tests/jest.constants";

import { useAlertStore } from "@src/app/hooks/useAlertStore";
import axiosInstance from "@src/services/axios";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <FormSendEmailResetPassword></FormSendEmailResetPassword>
  );

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

describe("FormSendEmailResetPassword.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock
        .onPost("/auth/send_email_reset")
        .reply(200, mockResponseAuthSendEmailReset);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the email input and the send email button.", () => {
      renderComponent();

      const inputEmail = screen.getByPlaceholderText("Email");
      const btnSubmit = screen.getByRole("button", {
        name: /send email/i,
      });

      expect(inputEmail).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
    });

    test("It must execute the handleSubmitSendEmailResetPassword function with invalid fields.", async () => {
      renderComponent();

      const btnSubmit = screen.getByRole("button", {
        name: /send email/i,
      });

      await user.click(btnSubmit);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Sending email...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "warning",
        "It is necessary to enter an email address",
        true
      );
    });

    test("It must execute the handleSubmitSendEmailResetPassword function with valid fields.", async () => {
      const email = "pepe@gmail.com";

      renderComponent();

      const inputEmail = screen.getByPlaceholderText("Email");
      const btnSubmit = screen.getByRole("button", {
        name: /send email/i,
      });

      await user.clear(inputEmail);
      await user.click(inputEmail);
      await user.keyboard(email);

      await user.click(btnSubmit);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Sending email...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        mockResponseAuthSendEmailReset.message,
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
      mock
        .onPost("/auth/send_email_reset")
        .reply(200, mockResponseAuthSendEmailReset);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, type: alertType },
      });
    });

    test("It must render the send email button disabled.", () => {
      renderComponent();

      const btnSubmit = screen.getByRole("button", {
        name: /send email/i,
      });

      expect(btnSubmit).toBeDisabled();
    });
  });
});
