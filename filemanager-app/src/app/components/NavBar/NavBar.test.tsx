import { render, screen } from "@testing-library/react";

import { usePathname } from "next/navigation";

import { NavBar } from "@/app/components/NavBar/NavBar";

import { mockUseAlertStore, mockUsePathname } from "@/tests/jest.constants";

import { useAlertStore } from "@/app/hooks/useAlertStore";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<NavBar></NavBar>);

  return {
    container: container,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock("@/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));

describe("NavBar.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      (usePathname as jest.Mock).mockReturnValue(mockUsePathname);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the NavBar with the links and button logout.", () => {
      renderComponent();

      const linkHome = screen.getByRole("link", { name: /go to home page/i });
      const linkFolders = screen.getByRole("link", {
        name: /go to folders page/i,
      });
      const linkCloud = screen.getByRole("link", { name: /go to cloud page/i });
      const linkFolderRoot = screen.getByRole("link", {
        name: /go to folder root page/i,
      });
      const btnLogOut = screen.getByRole("button", { name: /button logout/i });

      expect(linkHome).toBeInTheDocument();
      expect(linkFolders).toBeInTheDocument();
      expect(linkCloud).toBeInTheDocument();
      expect(linkFolderRoot).toBeInTheDocument();
      expect(btnLogOut).toBeInTheDocument();
    });
  });
});
