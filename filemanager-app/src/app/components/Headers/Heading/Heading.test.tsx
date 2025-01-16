import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Heading } from "@/app/components/Headers/Heading/Heading";

type RenderComponent = {
  container: HTMLElement;
  props: {
    element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className: string;
    children: string;
    mockOnClick: jest.Mock;
  };
};

interface RenderComponentProps {
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const renderComponent = ({
  element,
}: RenderComponentProps): RenderComponent => {
  const props = {
    element: element,
    children: "pepe",
    className: "pee",
    mockOnClick: jest.fn(),
  };

  const { container } = render(
    <Heading
      onClick={props.mockOnClick}
      className={props.className}
      element={props.element}
    >
      {props.children}
    </Heading>
  );

  return {
    container: container,
    props: props,
  };
};

describe("Heading.tsx", () => {
  describe("If element is h1.", () => {
    const element = "h1";

    test("It must render the heading.", () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toEqual(props.children);
    });

    test("It must execute the onClick function of the heading when it is clicked.", async () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      await user.click(heading);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("If element is h2.", () => {
    const element = "h2";

    test("It must render the heading.", () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toEqual(props.children);
    });

    test("It must execute the onClick function of the heading when it is clicked.", async () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      await user.click(heading);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("If element is h3.", () => {
    const element = "h3";

    test("It must render the heading.", () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toEqual(props.children);
    });

    test("It must execute the onClick function of the heading when it is clicked.", async () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      await user.click(heading);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("If element is h4.", () => {
    const element = "h4";

    test("It must render the heading.", () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toEqual(props.children);
    });

    test("It must execute the onClick function of the heading when it is clicked.", async () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      await user.click(heading);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("If element is h5.", () => {
    const element = "h5";

    test("It must render the heading.", () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toEqual(props.children);
    });

    test("It must execute the onClick function of the heading when it is clicked.", async () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      await user.click(heading);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("If element is h6.", () => {
    const element = "h6";

    test("It must render the heading.", () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toEqual(props.children);
    });

    test("It must execute the onClick function of the heading when it is clicked.", async () => {
      const { props } = renderComponent({ element: element });

      const heading = screen.getByRole("heading", { name: props.children });

      await user.click(heading);

      expect(props.mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
