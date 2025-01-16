import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ButtonCreate } from "@/app/components/Buttons/ButtonCreate/ButtonCreate";

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
    <ButtonCreate onClick={props.mockOnClick} className={props.className}>
      {props.children}
    </ButtonCreate>
  );

  return {
    container: container,
    props: props,
  };
};

describe("ButtonCreate.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the button.", () => {
      const { props } = renderComponent();

      const btnCreate = screen.getByRole("button", { name: "button create" });

      expect(btnCreate).toBeInTheDocument();
      expect(btnCreate.textContent).toEqual(props.children);
    });

    test("It must execute the onClick function of the button when it is clicked.", async () => {
      const { props } = renderComponent();

      const btnCreate = screen.getByRole("button", { name: "button create" });

      await user.click(btnCreate);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
