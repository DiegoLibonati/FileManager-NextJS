import { render } from "@testing-library/react";

import { Loader } from "@/app/components/Loaders/Loader/Loader";

type RenderComponent = {
  container: HTMLElement;
  props: {
    color: string;
    className: string;
    parentClassName: string;
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    color: "red",
    className: "pee",
    parentClassName: "pee",
  };

  const { container } = render(
    <Loader
      color={props.color}
      className={props.className}
      parentClassName={props.parentClassName}
    ></Loader>
  );

  return {
    container: container,
    props: props,
  };
};

describe("Loader.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the loader.", () => {
      const { props, container } = renderComponent();

      const loaderRoot = container.querySelector(
        `.${props.parentClassName}`
      ) as HTMLDivElement;
      const loader = container.querySelector(
        `.${props.className}`
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
      expect(loader).toBeInTheDocument();
      //   expect(loader.style.color).toEqual(props.color);
    });
  });
});
