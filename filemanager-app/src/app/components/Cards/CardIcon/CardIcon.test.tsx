import { render, screen } from "@testing-library/react";

import { CardIcon } from "@src/app/components/Cards/CardIcon/CardIcon";

type RenderComponent = {
  container: HTMLElement;
  props: {
    idCategory: string;
    color: string;
    bgColor: string;
    className: string;
    children: string;
  };
};

interface RendercomponentProps {
  idCategory: string;
}

const renderComponent = ({
  idCategory,
}: RendercomponentProps): RenderComponent => {
  const props = {
    idCategory: idCategory,
    bgColor: "white",
    color: "red",
    className: "pepe",
    children: "asd",
  };

  const { container } = render(
    <CardIcon
      bgColor={props.bgColor}
      className={props.className}
      color={props.color}
      idCategory={props.idCategory}
    >
      {props.children}
    </CardIcon>
  );

  return {
    container: container,
    props: props,
  };
};

describe("CardIcon.tsx", () => {
  describe("General Tests.", () => {
    const idCategory = "";

    test("It must render the root of the card with the color and classes of the props.", () => {
      const { container, props } = renderComponent({ idCategory: idCategory });

      const cardIconRoot = container.querySelector(
        ".card__icon"
      ) as HTMLDivElement;

      expect(cardIconRoot).toBeInTheDocument();
      expect(cardIconRoot.style.backgroundColor).toBe(props.bgColor);
    });

    test("It must render the children entered by props.", () => {
      const { props } = renderComponent({ idCategory: idCategory });

      const children = screen.getByText(props.children);

      expect(children).toBeInTheDocument();
    });
  });

  describe("If idCategory is empty.", () => {
    const idCategory = "";

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent({ idCategory: idCategory });

      const iconFolder = container.querySelector(
        ".card__icon__folder"
      ) as HTMLElement;

      expect(iconFolder).toBeInTheDocument();
    });
  });

  describe("If idCategory is documents.", () => {
    const idCategory = "documents";

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent({ idCategory: idCategory });

      const iconDocs = container.querySelector(
        ".card__icon__docs"
      ) as HTMLElement;

      expect(iconDocs).toBeInTheDocument();
    });
  });

  describe("If idCategory is images.", () => {
    const idCategory = "images";

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent({ idCategory: idCategory });

      const iconImages = container.querySelector(
        ".card__icon__images"
      ) as HTMLElement;

      expect(iconImages).toBeInTheDocument();
    });
  });

  describe("If idCategory is videos.", () => {
    const idCategory = "videos";

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent({ idCategory: idCategory });

      const iconVideos = container.querySelector(
        ".card__icon__videos"
      ) as HTMLElement;

      expect(iconVideos).toBeInTheDocument();
    });
  });

  describe("If idCategory is music.", () => {
    const idCategory = "music";

    test("It must render the relevant icon.", () => {
      const { container } = renderComponent({ idCategory: idCategory });

      const iconMusic = container.querySelector(
        ".card__icon__music"
      ) as HTMLElement;

      expect(iconMusic).toBeInTheDocument();
    });
  });
});
