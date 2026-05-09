import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import LinealProgress from "@/components/Charts/LinealProgress/LinealProgress";

const renderComponent = (percentage: string): RenderResult =>
  render(<LinealProgress percentage={percentage} />);

describe("LinealProgress", () => {
  it("should apply the percentage as the width of the filled bar", () => {
    const { container } = renderComponent("45%");

    const filledBar = container.querySelector<HTMLDivElement>(".absolute")!;
    expect(filledBar.style.width).toBe("45%");
  });

  it("should render with 0% width for empty progress", () => {
    const { container } = renderComponent("0%");

    const filledBar = container.querySelector<HTMLDivElement>(".absolute")!;
    expect(filledBar.style.width).toBe("0%");
  });

  it("should render with 100% width for full progress", () => {
    const { container } = renderComponent("100%");

    const filledBar = container.querySelector<HTMLDivElement>(".absolute")!;
    expect(filledBar.style.width).toBe("100%");
  });
});
