import { render } from "@testing-library/react";

import type { CardIconProps } from "@/types/props";
import type { RenderResult } from "@testing-library/react";

import CardIcon from "@/components/Cards/CardIcon/CardIcon";

const renderComponent = (props: Partial<CardIconProps> = {}): RenderResult => {
  const defaultProps: CardIconProps = { color: "#000", bgColor: "#fff", ...props };
  return render(<CardIcon {...defaultProps} />);
};

describe("CardIcon", () => {
  it("should render a folder icon when idCategory is not provided", () => {
    const { container } = renderComponent();

    expect(container.querySelector<SVGSVGElement>(".card__icon__folder")).toBeInTheDocument();
  });

  it("should render a documents icon for idCategory 'documents'", () => {
    const { container } = renderComponent({ idCategory: "documents" });

    expect(container.querySelector<SVGSVGElement>(".card__icon__docs")).toBeInTheDocument();
    expect(container.querySelector<SVGSVGElement>(".card__icon__folder")).not.toBeInTheDocument();
  });

  it("should render an images icon for idCategory 'images'", () => {
    const { container } = renderComponent({ idCategory: "images" });

    expect(container.querySelector<SVGSVGElement>(".card__icon__images")).toBeInTheDocument();
  });

  it("should render a videos icon for idCategory 'videos'", () => {
    const { container } = renderComponent({ idCategory: "videos" });

    expect(container.querySelector<SVGSVGElement>(".card__icon__videos")).toBeInTheDocument();
  });

  it("should render a music icon for idCategory 'music'", () => {
    const { container } = renderComponent({ idCategory: "music" });

    expect(container.querySelector<SVGSVGElement>(".card__icon__music")).toBeInTheDocument();
  });

  it("should apply bgColor as background color", () => {
    const { container } = renderComponent({ bgColor: "#fdf0a1" });

    expect(container.firstChild).toHaveStyle({ backgroundColor: "#fdf0a1" });
  });

  it("should render children when provided", () => {
    const { getByText } = renderComponent({ children: <span>Extra</span> });

    expect(getByText("Extra")).toBeInTheDocument();
  });
});
