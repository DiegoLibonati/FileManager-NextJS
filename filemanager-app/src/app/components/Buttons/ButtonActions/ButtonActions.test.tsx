import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { createRef, RefObject } from "react";

import { ButtonActions } from "@src/app/components/Buttons/ButtonActions/ButtonActions";

type RenderComponent = {
  container: HTMLElement;
  props: {
    innerRef: RefObject<HTMLButtonElement>;
    mockOnClick: jest.Mock;
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    innerRef: createRef() as RefObject<HTMLButtonElement>,
    mockOnClick: jest.fn(),
  };

  const { container } = render(
    <ButtonActions
      onClick={props.mockOnClick}
      innerRef={props.innerRef}
    ></ButtonActions>
  );

  return {
    container: container,
    props: props,
  };
};

describe("ButtonActions.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the button.", () => {
      renderComponent();

      const btnAction = screen.getByRole("button", { name: "button actions" });
      const icon = btnAction.children[0];

      expect(btnAction).toBeInTheDocument();
      expect(btnAction.children).toHaveLength(1);
      expect(icon).toBeTruthy();
      expect(icon).toHaveClass("fill-black cursor-pointer");
    });

    test("It must execute the onClick function of the button when it is clicked.", async () => {
      const { props } = renderComponent();

      const btnAction = screen.getByRole("button", { name: "button actions" });

      await user.click(btnAction);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("It should correctly assign the ref to the button element.", () => {
      const { props } = renderComponent();

      const btnAction = screen.getByRole("button", { name: "button actions" });

      expect(btnAction).toBeInTheDocument();
      expect(props.innerRef!.current).toBe(btnAction as HTMLButtonElement);
    });
  });
});
