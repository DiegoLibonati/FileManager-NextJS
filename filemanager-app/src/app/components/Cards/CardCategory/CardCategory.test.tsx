import { render, screen } from "@testing-library/react";

import { CardCategory } from "@src/app/components/Cards/CardCategory/CardCategory";

type RenderComponent = {
  container: HTMLElement;
  props: {
    href: string;
    categoryName: string;
    idCategory: string;
    bgColor: string;
    color: string;
  };
}

const renderComponent = (): RenderComponent => {
  const props = {
    href: "https://google.com.ar",
    categoryName: "a",
    idCategory: "as",
    bgColor: "white",
    color: "red",
  };

  const { container } = render(
    <CardCategory
      bgColor={props.bgColor}
      categoryName={props.categoryName}
      color={props.color}
      href={props.href}
      idCategory={props.idCategory}
    ></CardCategory>
  );

  return {
    container: container,
    props: props,
  };
};

describe("CardCategory.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the card category.", () => {
      const { props } = renderComponent();

      const cardRoot = screen.getByRole("link", {
        name: `go to ${props.href}`,
      });

      expect(cardRoot).toBeInTheDocument();
    });

    test("It must render the root of the cardIcon with the background color entered by props.", () => {
      const { props, container } = renderComponent();

      const cardIconRoot = container.querySelector(
        `.card__icon`
      ) as HTMLDivElement;

      expect(cardIconRoot).toBeInTheDocument();
      expect(cardIconRoot.style.backgroundColor).toEqual(props.bgColor);
    });

    test("It must render the category name.", () => {
      const { props } = renderComponent();

      const paragraphs = screen.getAllByText(props.categoryName);

      paragraphs.forEach((paragraph, index) => {
        if (index === 0) {
          expect(paragraph.style.color).toEqual(props.color);
          expect(paragraph.className).toContain("hidden");
        }

        if (index === 1) {
          expect(paragraph.className).toContain("lg:hidden");
        }

        expect(paragraph).toBeInTheDocument();
      });
    });
  });
});
