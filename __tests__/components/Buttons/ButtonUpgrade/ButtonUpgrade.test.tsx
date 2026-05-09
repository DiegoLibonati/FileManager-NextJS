import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import ButtonUpgrade from "@/components/Buttons/ButtonUpgrade/ButtonUpgrade";

import userService from "@/services/userService";

import { mockRefresh } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  useRouter: (): { refresh: jest.Mock } => ({ refresh: mockRefresh }),
}));

jest.mock("@/services/userService", () => ({
  __esModule: true,
  default: {
    changePlan: jest.fn(),
  },
}));

const renderComponent = (): RenderResult => render(<ButtonUpgrade />);

describe("ButtonUpgrade", () => {
  it("should render the Upgrade button", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "button upgrade" })).toBeInTheDocument();
    expect(screen.getByText("Upgrade")).toBeInTheDocument();
  });

  it("should call changePlan with '1' and refresh the router on click", async () => {
    (userService.changePlan as jest.Mock).mockResolvedValue(undefined);
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button upgrade" }));

    expect(userService.changePlan).toHaveBeenCalledWith("1");
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
