import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { useRouter } from "next/navigation";

import { ButtonUpgrade } from "@/app/components/Buttons/ButtonUpgrade/ButtonUpgrade";

import { mockResponseChangePlan, mockUseRouter } from "@/tests/jest.constants";

import axiosInstance from "@/services/axios";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<ButtonUpgrade></ButtonUpgrade>);

  return {
    container: container,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ButtonUpgrade.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onGet("/user/change_plan").reply(200, mockResponseChangePlan);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
    });

    test("It must render the button.", () => {
      renderComponent();

      const btnUpgrade = screen.getByRole("button", { name: "button upgrade" });

      expect(btnUpgrade).toBeInTheDocument();
      expect(btnUpgrade.textContent).toEqual("Upgrade");
    });

    test("It should call handleClickUpgrade when the button is clicked", async () => {
      renderComponent();

      const btnUpgrade = screen.getByRole("button", { name: "button upgrade" });

      await user.click(btnUpgrade);

      expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
    });
  });
});
