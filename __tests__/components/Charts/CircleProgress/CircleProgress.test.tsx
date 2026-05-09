import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import CircleProgress from "@/components/Charts/CircleProgress/CircleProgress";

const renderComponent = (percentage: string): RenderResult =>
  render(<CircleProgress percentage={percentage} />);

describe("CircleProgress", () => {
  it("should display the percentage value", () => {
    renderComponent("75");

    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("should display the 'used' label", () => {
    renderComponent("50");

    expect(screen.getByText("used")).toBeInTheDocument();
  });

  it("should clamp a percentage above 100 to 100", () => {
    const { container } = renderComponent("150");

    const filled = container.querySelector<HTMLDivElement>(".circle__progress--filled")!;
    expect(filled.style.backgroundImage).toContain("100%");
  });

  it("should clamp a negative percentage to 0", () => {
    const { container } = renderComponent("-10");

    const filled = container.querySelector<HTMLDivElement>(".circle__progress--filled")!;
    expect(filled.style.backgroundImage).toContain("0%");
  });

  it("should apply the percentage to the conic-gradient", () => {
    const { container } = renderComponent("60");

    const filled = container.querySelector<HTMLDivElement>(".circle__progress--filled")!;
    expect(filled.style.backgroundImage).toContain("60%");
  });
});
