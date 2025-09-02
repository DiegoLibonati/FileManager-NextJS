import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import { useRouter } from "next/navigation";

import { CardItem } from "@src/app/components/Cards/CardItem/CardItem";

import {
  mockResponseFilemanagerDelete,
  mockUseAlertStore,
  mockUseRouter,
} from "@tests/jest.constants";

import { useAlertStore } from "@src/app/hooks/useAlertStore";
import axiosInstance from "@src/services/axios";

type RenderComponent = {
  container: HTMLElement;
  props: {
    idCategory: string;
    bgColor: string;
    color: string;
    title: string;
    subTitle: string;
    path: string;
    type: string;
    className: string;
  };
};

interface RendercomponentProps {
  type: string;
}

const renderComponent = ({ type }: RendercomponentProps): RenderComponent => {
  const props = {
    idCategory: "asd",
    bgColor: "red",
    color: "white",
    title: "title",
    subTitle: "subTitle",
    path: "path/pepe",
    type: type,
    className: "asdf",
  };

  const { container } = render(
    <CardItem
      bgColor={props.bgColor}
      color={props.color}
      path={props.path}
      subTitle={props.subTitle}
      title={props.title}
      type={props.type}
      className={props.className}
      idCategory={props.idCategory}
    ></CardItem>
  );

  return {
    container: container,
    props: props,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@src/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));

describe("CardIcon.tsx", () => {
  describe("General Tests.", () => {
    const type = "";

    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onDelete("/filemanager").reply(200, mockResponseFilemanagerDelete);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the root of the card item.", () => {
      const { container } = renderComponent({ type: type });

      const cardItemRoot = container.querySelector(
        ".card__item"
      ) as HTMLDivElement;

      expect(cardItemRoot).toBeInTheDocument();
    });

    test("It must render the title and subtitle.", () => {
      const { props } = renderComponent({ type: type });

      const title = screen.getByRole("heading", { name: props.title });
      const subTitle = screen.getByText(props.subTitle);

      expect(title).toBeInTheDocument();
      expect(subTitle).toBeInTheDocument();
    });

    test("It must render the action button.", () => {
      renderComponent({ type: type });

      const btnActions = screen.getByRole("button", {
        name: /button actions/i,
      });

      expect(btnActions).toBeInTheDocument();
    });

    test("It should not render the dropdown actions.", () => {
      renderComponent({ type: type });

      const deleteAction = screen.queryByRole("heading", { name: /Eliminar/i });

      expect(deleteAction).not.toBeInTheDocument();
    });

    test("It should render the dropdown actions when the actions button is clicked.", async () => {
      renderComponent({ type: type });

      const btnActions = screen.getByRole("button", {
        name: /button actions/i,
      });

      expect(btnActions).toBeInTheDocument();

      await user.click(btnActions);

      const deleteAction = screen.getByRole("heading", { name: /Eliminar/i });

      expect(deleteAction).toBeInTheDocument();
    });

    test("It must execute the delete function when you click on the delete action in the dropdown actions.", async () => {
      const { props } = renderComponent({ type: type });

      const btnActions = screen.getByRole("button", {
        name: /button actions/i,
      });

      expect(btnActions).toBeInTheDocument();

      await user.click(btnActions);

      const deleteAction = screen.getByRole("heading", { name: /Eliminar/i });

      await user.click(deleteAction);

      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledTimes(2);
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "loading",
        "Deleting...",
        true
      );
      expect(mockUseAlertStore.handleSetAlert).toHaveBeenCalledWith(
        "info",
        `Successfully deleted: ${props.title}`,
        true
      );
      expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);

      expect(
        screen.queryByRole("heading", { name: /Eliminar/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("If type is folder.", () => {
    const type = "folder";

    beforeEach(() => {
      jest.clearAllMocks();

      const mock = new MockAdapter(axiosInstance);
      mock.onDelete("/filemanager").reply(200, mockResponseFilemanagerDelete);

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the root of the card item with specified class.", () => {
      const { container } = renderComponent({ type: type });

      const cardItemRoot = container.querySelector(
        ".card__item"
      ) as HTMLDivElement;

      expect(cardItemRoot).toBeInTheDocument();
      expect(cardItemRoot.className).toContain("cursor-pointer");
    });

    test("It must execute the handleClickCard function when the card is clicked.", async () => {
      const { container, props } = renderComponent({ type: type });

      const cardItemRoot = container.querySelector(
        ".card__item"
      ) as HTMLDivElement;

      await user.click(cardItemRoot);

      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(`/folder/${props.path}`);
    });
  });
});
