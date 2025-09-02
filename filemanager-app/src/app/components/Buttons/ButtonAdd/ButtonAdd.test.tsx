import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { usePathname, useRouter } from "next/navigation";

import { ButtonAdd } from "@src/app/components/Buttons/ButtonAdd/ButtonAdd";

import { mockUsePathname, mockUseRouter } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<ButtonAdd></ButtonAdd>);

  return {
    container: container,
  };
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("ButtonAdd.tsx", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
      (usePathname as jest.Mock).mockReturnValue(mockUsePathname);
    });

    test("It must render the button.", () => {
      renderComponent();

      const btnAdd = screen.getByRole("button", { name: "button add" });
      const icon = btnAdd.children[0];

      expect(btnAdd).toBeInTheDocument();
      expect(btnAdd.children).toHaveLength(1);
      expect(icon).toBeTruthy();
    });

    test("It should call handleClickAdd when the button is clicked", async () => {
      renderComponent();

      const btnAdd = screen.getByRole("button", { name: "button add" });

      await user.click(btnAdd);

      expect(mockUseRouter.push).toHaveBeenCalledWith("/upload/path");
    });
  });
});
