import { render, screen } from "@testing-library/react";

import { Paragraph } from "@/app/components/Paragraph/Paragraph";

type RenderComponent = {
  container: HTMLElement;
  props: {
    children: string;
    className: string;
    style: { backgroundColor: string };
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    children: "pepe",
    className: "asd",
    style: { backgroundColor: "red" },
  };

  const { container } = render(
    <Paragraph className={props.className} style={props.style}>
      {props.children}
    </Paragraph>
  );

  return {
    container: container,
    props: props,
  };
};

describe("Paragraph.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the paragraph with the text.", () => {
      const { props } = renderComponent();

      const paragraph = screen.getByText(props.children);

      expect(paragraph).toBeInTheDocument();
      expect(paragraph.className).toBe(props.className);
      expect(paragraph.style.backgroundColor).toBe(props.style.backgroundColor);
    });
  });
});
