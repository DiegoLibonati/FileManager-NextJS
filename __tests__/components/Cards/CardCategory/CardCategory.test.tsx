import { render, screen } from "@testing-library/react";

import type { CardCategoryProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import CardCategory from "@/components/Cards/CardCategory/CardCategory";

const defaultProps: CardCategoryProps = {
  href: "/category/documents",
  categoryName: "Documents",
  idCategory: "documents",
  bgColor: "#ecf9ed",
  color: "#59e766",
};

const renderComponent = (props: Partial<CardCategoryProps> = {}): RenderResult =>
  render(<CardCategory {...defaultProps} {...props} />);

describe("CardCategory", () => {
  it("should render the category name", () => {
    renderComponent();

    expect(screen.getAllByText("Documents").length).toBeGreaterThan(0);
  });

  it("should render a link with the correct href", () => {
    renderComponent();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/category/documents");
  });

  it("should render the correct aria-label on the link", () => {
    renderComponent();

    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "go to /category/documents");
  });

  it("should render the documents category icon", () => {
    const { container } = renderComponent({ idCategory: "documents" });

    expect(container.querySelector<SVGSVGElement>(".card__icon__docs")).toBeInTheDocument();
  });
});
