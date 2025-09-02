import { render, screen } from "@testing-library/react";

import { useParams, usePathname, useRouter } from "next/navigation";

import { HeaderTitle } from "@src/app/components/Headers/HeaderTitle/HeaderTitle";

import {
  mockUseAlertStore,
  mockUseUserStore,
  mockUseRouter,
} from "@tests/jest.constants";

import { useUserStore } from "@src/app/hooks/useUserStore";
import { useAlertStore } from "@src/app/hooks/useAlertStore";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<HeaderTitle></HeaderTitle>);

  return {
    container: container,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock("@src/app/hooks/useAlertStore", () => ({
  useAlertStore: jest.fn(),
}));
jest.mock("@src/app/hooks/useUserStore", () => ({
  useUserStore: jest.fn(),
}));

describe("HeaderTitle.tsx", () => {
  describe("If pathname is /.", () => {
    const pathname = "/";
    const mockUseParams = { categoryId: "", folderPath: "" };

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (usePathname as jest.Mock).mockReturnValue(pathname);
      (useParams as jest.Mock).mockReturnValue(mockUseParams);
      (useUserStore as jest.Mock).mockReturnValue(mockUseUserStore);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the heading.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { name: /Welcome/ });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("If pathname is /folders.", () => {
    const pathname = "/folders";
    const mockUseParams = { categoryId: "", folderPath: "" };

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (usePathname as jest.Mock).mockReturnValue(pathname);
      (useParams as jest.Mock).mockReturnValue(mockUseParams);
      (useUserStore as jest.Mock).mockReturnValue(mockUseUserStore);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the heading.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { name: /All Folders/ });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("If pathname is /cloud.", () => {
    const pathname = "/cloud";
    const mockUseParams = { categoryId: "", folderPath: "" };

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (usePathname as jest.Mock).mockReturnValue(pathname);
      (useParams as jest.Mock).mockReturnValue(mockUseParams);
      (useUserStore as jest.Mock).mockReturnValue(mockUseUserStore);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the heading.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { name: /My Cloud/ });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("If pathname is /upload.", () => {
    const pathname = "/upload";
    const mockUseParams = { categoryId: "", folderPath: "" };

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (usePathname as jest.Mock).mockReturnValue(pathname);
      (useParams as jest.Mock).mockReturnValue(mockUseParams);
      (useUserStore as jest.Mock).mockReturnValue(mockUseUserStore);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the heading.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { name: /New Things/ });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("If pathname is not registered.", () => {
    const pathname = "not registered";
    const mockUseParams = { categoryId: "123", folderPath: "asd/123" };

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (usePathname as jest.Mock).mockReturnValue(pathname);
      (useParams as jest.Mock).mockReturnValue(mockUseParams);
      (useUserStore as jest.Mock).mockReturnValue(mockUseUserStore);
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the heading.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { name: /3/ });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("If user emailVerified is true.", () => {
    const emailVerified = true;
    const pathname = "not registered";
    const mockUseParams = { categoryId: "123", folderPath: "asd/123" };

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (usePathname as jest.Mock).mockReturnValue(pathname);
      (useParams as jest.Mock).mockReturnValue(mockUseParams);
      (useUserStore as jest.Mock).mockReturnValue({
        ...mockUseUserStore,
        user: {
          ...mockUseUserStore.user,
          emailVerified: emailVerified,
        },
      });
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must not render the button unverified.", () => {
      renderComponent();

      const btnUnverified = screen.queryByRole("button", {
        name: /button unverified/,
      });

      expect(btnUnverified).not.toBeInTheDocument();
    });
  });

  describe("If user emailVerified is false.", () => {
    const emailVerified = false;
    const pathname = "not registered";
    const mockUseParams = { categoryId: "123", folderPath: "asd/123" };

    beforeEach(() => {
      jest.clearAllMocks();

      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (usePathname as jest.Mock).mockReturnValue(pathname);
      (useParams as jest.Mock).mockReturnValue(mockUseParams);
      (useUserStore as jest.Mock).mockReturnValue({
        ...mockUseUserStore,
        user: {
          ...mockUseUserStore.user,
          emailVerified: emailVerified,
        },
      });
      (useAlertStore as jest.Mock).mockReturnValue(mockUseAlertStore);
    });

    test("It must render the button unverified.", () => {
      renderComponent();

      const btnUnverified = screen.getByRole("button", {
        name: /button unverified/,
      });

      expect(btnUnverified).toBeInTheDocument();
    });
  });
});
