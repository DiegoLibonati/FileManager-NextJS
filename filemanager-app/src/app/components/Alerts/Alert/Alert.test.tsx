import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Alert } from "@src/app/components/Alerts/Alert/Alert";

import { useAlertStore } from "@src/app/hooks/useAlertStore";

import { mockUseAlertStore } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Alert></Alert>);

  return {
    container: container,
  };
};

jest.mock("@src/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));

describe("Alert.tsx", () => {
  describe("If alert is open.", () => {
    const open = true;
    const message = "pepe";

    beforeEach(() => {
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, open: open, message: message },
      });
    });

    test("It must render the alert with class flex.", () => {
      const { container } = renderComponent();

      const alertRoot = container.querySelector<HTMLDivElement>(".alert");

      expect(alertRoot).toBeInTheDocument();
      expect(alertRoot?.className).toContain("flex");
    });

    test("It must render the message.", () => {
      renderComponent();

      const messageElement = screen.getByText(message);

      expect(messageElement).toBeInTheDocument();
    });

    test("It must close the alert when you click close.", async () => {
      renderComponent();

      const btnCloseAlert = screen.getByRole("button", { name: "close alert" });

      expect(btnCloseAlert).toBeInTheDocument();

      await user.click(btnCloseAlert);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(1);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        "",
        false
      );
    });
  });

  describe("If alert is NOT open.", () => {
    const open = false;

    beforeEach(() => {
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, open: open },
      });
    });

    test("It must render the alert with class hidden.", () => {
      const { container } = renderComponent();

      const alertRoot = container.querySelector<HTMLDivElement>(".alert");

      expect(alertRoot).toBeInTheDocument();
      expect(alertRoot?.className).toContain("hidden");
    });
  });

  describe("If type is info.", () => {
    const type = "info";

    beforeEach(() => {
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, type: type },
      });
    });

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent();

      const icon = container.querySelector<HTMLElement>(".alert__info");

      expect(icon).toBeInTheDocument();
    });
  });

  describe("If type is error.", () => {
    const type = "error";

    beforeEach(() => {
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, type: type },
      });
    });

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent();

      const icon = container.querySelector<HTMLElement>(".alert__error");

      expect(icon).toBeInTheDocument();
    });
  });

  describe("If type is warning.", () => {
    const type = "warning";

    beforeEach(() => {
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, type: type },
      });
    });

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent();

      const icon = container.querySelector<HTMLElement>(".alert__warning");

      expect(icon).toBeInTheDocument();
    });
  });

  describe("If type is loading.", () => {
    const type = "loading";

    beforeEach(() => {
      (useAlertStore as jest.Mock).mockReturnValue({
        ...mockUseAlertStore,
        alert: { ...mockUseAlertStore.alert, type: type },
      });
    });

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent();

      const icon = container.querySelector<HTMLElement>(".alert__loading");

      expect(icon).toBeInTheDocument();
    });
  });
});
