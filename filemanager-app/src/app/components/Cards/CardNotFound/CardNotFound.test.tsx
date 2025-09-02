import { render, screen } from "@testing-library/react";

import { CardNotFound } from "@src/app/components/Cards/CardNotFound/CardNotFound";

type RenderComponent = {
  container: HTMLElement;
  props: {
    className: string;
    children: string;
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    children: "pepe",
    className: "pee",
  };

  const { container } = render(
    <CardNotFound className={props.className}>{props.children}</CardNotFound>
  );

  return {
    container: container,
    props: props,
  };
};

describe("CardNotFound.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the card not found root.", () => {
      const { container, props } = renderComponent();

      const card = container.querySelector(
        `.${props.className}`
      ) as HTMLDivElement;

      expect(card).toBeInTheDocument();
      expect(card).toHaveClass(props.className);
    });

    test("It must render the children passed through props.", () => {
      const { props } = renderComponent();

      const heading = screen.getByRole("heading", { name: props.children });

      expect(heading).toBeInTheDocument();
    });
  });
});
