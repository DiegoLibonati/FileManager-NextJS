import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Card } from "@src/app/components/Cards/Card/Card";

type RenderComponent = {
  container: HTMLElement;
  props: {
    className: string;
    children: string;
    mockOnClick: jest.Mock;
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    children: "pepe",
    className: "pee",
    mockOnClick: jest.fn(),
  };

  const { container } = render(
    <Card onClick={props.mockOnClick} className={props.className}>
      {props.children}
    </Card>
  );

  return {
    container: container,
    props: props,
  };
};

describe("Card.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the card.", () => {
      const { container, props } = renderComponent();

      const card = container.querySelector(
        `.${props.className}`
      ) as HTMLDivElement;

      expect(card).toBeInTheDocument();
    });

    test("It must execute the onClick function of the card when it is clicked.", async () => {
      const { container, props } = renderComponent();

      const card = container.querySelector(
        `.${props.className}`
      ) as HTMLDivElement;

      await user.click(card);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
