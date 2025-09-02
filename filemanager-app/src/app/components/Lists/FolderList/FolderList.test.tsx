import { render } from "@testing-library/react";

import { useRouter } from "next/navigation";

import { Folder, FolderType } from "@src/app/lib/entities";

import { FolderList } from "@src/app/components/Lists/FolderList/FolderList";

import { mockUseAlertStore, mockUseRouter } from "@tests/jest.constants";

import { useAlertStore } from "@src/app/hooks/useAlertStore";

type RenderComponent = {
  container: HTMLElement;
  props: {
    folders: Folder[];
    folderType: FolderType;
  };
};

interface RenderComponentProps {
  folderType: FolderType;
}

const renderComponent = ({
  folderType,
}: RenderComponentProps): RenderComponent => {
  const props = {
    folders: [
      {
        id: "123",
        bgColor: "#fff",
        color: "#000",
        foldername: "namecito",
        size: "5",
        path: "/paer/123",
        type: "folder",
        len: "2",
      },
    ],
    folderType: folderType,
  };

  const { container } = render(
    <FolderList
      folders={props.folders}
      folderType={props.folderType}
    ></FolderList>
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

describe("FolderList.tsx", () => {
  describe("If folderType is simple.", () => {
    const folderType = "simple";

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
    });

    test("It must render all card simple.", () => {
      const { props, container } = renderComponent({ folderType: folderType });

      const folders = container.querySelectorAll(".card__simple") as NodeList;

      expect(folders).toHaveLength(props.folders.length);
    });
  });

  describe("If folderType is withActions.", () => {
    const folderType = "withActions";

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render all card item.", () => {
      const { props, container } = renderComponent({ folderType: folderType });

      const folders = container.querySelectorAll(".card__item") as NodeList;

      expect(folders).toHaveLength(props.folders.length);
    });
  });
});
