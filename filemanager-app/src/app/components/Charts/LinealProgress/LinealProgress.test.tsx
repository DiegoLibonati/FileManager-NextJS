import { render } from "@testing-library/react";

import { LinealProgress } from "@src/app/components/Charts/LinealProgress/LinealProgress";

type RenderComponent = {
  container: HTMLElement;
  props: {
    percentage: string;
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    percentage: "25",
  };

  const { container } = render(
    <LinealProgress percentage={props.percentage}></LinealProgress>
  );

  return {
    container: container,
    props: props,
  };
};

describe("LinealProgress.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the root of the linear chart progress.", () => {
      const { container } = renderComponent();

      const linealProgressRoot = container.querySelector(
        ".lineal__progress"
      ) as HTMLDivElement;

      expect(linealProgressRoot).toBeInTheDocument();
    });

    test("It must render the fill of the linear progress chart", () => {
      const { container } = renderComponent();

      const linealProgressRoot = container.querySelector(
        ".lineal__progress"
      ) as HTMLDivElement;
      const linealProgressFill = linealProgressRoot
        .children[0] as HTMLDivElement;

      expect(linealProgressFill).toBeInTheDocument();
      //   expect(linealProgressFill.style.width).toEqual(props.percentage);
    });
  });
});
