import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { ButtonUnverified } from "@/app/components/Buttons/ButtonUnverified/ButtonUnverified";

import {
  mockUseAlertStore,
  mockResponseSendEmailToVerify,
} from "@/tests/jest.constants";

import { useAlertStore } from "@/app/hooks/useAlertStore";
import axiosInstance from "@/services/axios";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<ButtonUnverified></ButtonUnverified>);

  return {
    container: container,
  };
};

jest.mock("@/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));

describe("ButtonUnverified.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock
        .onGet("/user/send_email_to_verify")
        .reply(200, mockResponseSendEmailToVerify);

      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the button.", () => {
      renderComponent();

      const btnUnverified = screen.getByRole("button", {
        name: "button unverified",
      });

      expect(btnUnverified).toBeInTheDocument();
      expect(btnUnverified.textContent).toEqual("Unverified");
    });

    test("It should call handleSendEmailToVerify when the button is clicked", async () => {
      renderComponent();

      const btnUnverified = screen.getByRole("button", {
        name: "button unverified",
      });

      await user.click(btnUnverified);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Sending verification email...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        mockResponseSendEmailToVerify.message,
        true
      );
    });
  });
});
