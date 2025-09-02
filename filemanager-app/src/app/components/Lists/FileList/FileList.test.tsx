import { render } from "@testing-library/react";

import { useRouter } from "next/navigation";

import { File } from "@src/app/lib/entities";

import { FileList } from "@src/app/components/Lists/FileList/FileList";

import { mockUseAlertStore, mockUseRouter } from "@tests/jest.constants";

import { useAlertStore } from "@src/app/hooks/useAlertStore";

type RenderComponent = {
  container: HTMLElement;
  props: {
    files: File[];
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    files: [
      {
        id: "123",
        bgColor: "#fff",
        color: "#000",
        idCategory: "music",
        filename: "namecito",
        size: "5",
        path: "/paer/123",
        type: "file",
        extension: ".py",
      },
    ],
  };

  const { container } = render(<FileList files={props.files}></FileList>);

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

describe("FileList.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render all card items.", () => {
      const { props, container } = renderComponent();

      const files = container.querySelectorAll(".card__item") as NodeList;

      expect(files).toHaveLength(props.files.length);
    });
  });
});
