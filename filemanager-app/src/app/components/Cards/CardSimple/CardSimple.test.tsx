import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { useRouter } from "next/navigation";

import { CardSimple } from "@src/app/components/Cards/CardSimple/CardSimple";

import { mockUseRouter } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
  props: {
    bgColor: string;
    color: string;
    title: string;
    subTitle: string;
    path: string;
    type: string;
  };
};

interface RendercomponentProps {
  type: string;
}

const renderComponent = ({ type }: RendercomponentProps): RenderComponent => {
  const props = {
    title: "title",
    subTitle: "subTitle",
    bgColor: "red",
    color: "white",
    path: "path/pepe",
    type: type,
  };

  const { container } = render(
    <CardSimple
      bgColor={props.bgColor}
      color={props.color}
      path={props.path}
      subTitle={props.subTitle}
      title={props.title}
      type={props.type}
    ></CardSimple>
  );

  return {
    container: container,
    props: props,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CardSimple.tsx", () => {
  describe("General Tests.", () => {
    const type = "";

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
    });

    test("It must render the root of the card simple.", () => {
      const { container } = renderComponent({ type: type });

      const cardSimpleRoot =
        container.querySelector<HTMLDivElement>(".card__simple");

      expect(cardSimpleRoot).toBeInTheDocument();
    });

    test("It must render the title and subtitle.", () => {
      const { props } = renderComponent({ type: type });

      const title = screen.getByRole("heading", { name: props.title });
      const subTitle = screen.getByText(props.subTitle);

      expect(title).toBeInTheDocument();
      expect(subTitle).toBeInTheDocument();
    });

    test("It must render the card icon.", () => {
      const { container } = renderComponent({ type: type });

      const cardIconRoot =
        container.querySelector<HTMLDivElement>(".card__icon");

      expect(cardIconRoot).toBeInTheDocument();
    });
  });

  describe("If type is folder.", () => {
    const type = "folder";

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
    });

    test("It must render the root of the card simple with specified class.", () => {
      const { container } = renderComponent({ type: type });

      const cardSimpleRoot =
        container.querySelector<HTMLDivElement>(".card__simple");

      expect(cardSimpleRoot).toBeInTheDocument();
      expect(cardSimpleRoot!.className).toContain("cursor-pointer");
    });

    test("It must execute the handleClickCard function when the card is clicked.", async () => {
      const { container, props } = renderComponent({ type: type });

      const cardSimpleRoot =
        container.querySelector<HTMLDivElement>(".card__simple");

      await user.click(cardSimpleRoot!);

      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(`/folder/${props.path}`);
    });
  });
});
