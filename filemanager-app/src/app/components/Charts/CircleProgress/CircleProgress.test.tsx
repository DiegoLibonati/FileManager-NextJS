import { render, screen } from "@testing-library/react";

import { CircleProgress } from "@src/app/components/Charts/CircleProgress/CircleProgress";

type RenderComponent = {
  container: HTMLElement;
  props: {
    percentage: string;
  };
  normalizedPercentage: number;
};

const renderComponent = (): RenderComponent => {
  const props = {
    percentage: "25",
  };

  const { container } = render(
    <CircleProgress percentage={props.percentage}></CircleProgress>
  );

  return {
    container: container,
    props: props,
    normalizedPercentage: Math.min(
      Math.max(parseInt(props.percentage), 0),
      100
    ),
  };
};

describe("CircleProgress.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the circle progress root.", () => {
      const { container } = renderComponent();

      const chartProgressRoot =
        container.querySelector<HTMLDivElement>(`.circle__progress`);

      expect(chartProgressRoot).toBeInTheDocument();
    });

    test("It must render the fill part of the graphic.", () => {
      const { container } = renderComponent();

      const chartProgressFilled = container.querySelector<HTMLDivElement>(
        `.circle__progress--filled`
      );

      expect(chartProgressFilled).toBeInTheDocument();
      //   expect(chartProgressFilled.style.backgroundImage).toEqual(
      //     `conic-gradient(#8357fe ${normalizedPercentage}%, #f2f2f2 ${normalizedPercentage}%)`
      //   );
    });

    test("It must render the percentage.", () => {
      const { props } = renderComponent();

      const percentage = screen.getByRole("heading", {
        name: `${props.percentage}%`,
      });
      const usedText = screen.getByText("used");

      expect(percentage).toBeInTheDocument();
      expect(usedText).toBeInTheDocument();
    });
  });
});
