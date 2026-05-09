import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import SectionUpgradePlan from "@/containers/cloud/SectionUpgradePlan/SectionUpgradePlan";

jest.mock("next/navigation", () => ({
  useRouter: (): { refresh: jest.Mock } => ({ refresh: jest.fn() }),
}));

jest.mock("@/services/userService", () => ({
  __esModule: true,
  default: { changePlan: jest.fn() },
}));

const renderContainer = (): RenderResult => render(<SectionUpgradePlan />);

describe("SectionUpgradePlan", () => {
  it("should render the upgrade plan section", () => {
    renderContainer();

    expect(screen.getByText("Unlimited storage")).toBeInTheDocument();
    expect(screen.getByText("$ 5 / mo")).toBeInTheDocument();
  });

  it("should render the Upgrade button", () => {
    renderContainer();

    expect(screen.getByRole("button", { name: "button upgrade" })).toBeInTheDocument();
  });
});
