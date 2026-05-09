import { render } from "@testing-library/react";

import type { LoaderProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import Loader from "@/components/Loaders/Loader/Loader";

const renderComponent = (props: Partial<LoaderProps> = {}): RenderResult => {
  const defaultProps: LoaderProps = { color: "#8357fe", ...props };
  return render(<Loader {...defaultProps} />);
};

describe("Loader", () => {
  it("should render the loader element", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
  });

  it("should apply the color as a CSS custom property", () => {
    const { container } = renderComponent({ color: "#ff0000" });

    const loaderEl = container.querySelector<HTMLDivElement>(".loader")!;
    expect(loaderEl.style.getPropertyValue("--loader-color")).toBe("#ff0000");
  });

  it("should apply parentClassName to the wrapper div", () => {
    const { container } = renderComponent({ parentClassName: "custom-parent" });

    expect(container.firstChild).toHaveClass("custom-parent");
  });

  it("should apply className to the inner loader div", () => {
    const { container } = renderComponent({ className: "custom-loader" });

    expect(container.querySelector<HTMLDivElement>(".loader")).toHaveClass("custom-loader");
  });
});
