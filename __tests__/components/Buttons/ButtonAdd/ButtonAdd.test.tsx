import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";

import type { RenderResult } from "@testing-library/react";

import ButtonAdd from "@/components/Buttons/ButtonAdd/ButtonAdd";

import { mockPush } from "@tests/__mocks__/next-navigation.mock";

jest.mock("next/navigation", () => ({
  useRouter: (): { push: jest.Mock } => ({ push: mockPush }),
  usePathname: jest.fn(),
}));

const renderComponent = (): RenderResult => render(<ButtonAdd />);

describe("ButtonAdd", () => {
  it("should render the add button", () => {
    (usePathname as jest.Mock).mockReturnValue("/folder/root");
    renderComponent();

    expect(screen.getByRole("button", { name: "button add" })).toBeInTheDocument();
  });

  it("should navigate to the upload path built from the current pathname", async () => {
    (usePathname as jest.Mock).mockReturnValue("/folder/root");
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button add" }));

    expect(mockPush).toHaveBeenCalledWith("/upload/root");
  });

  it("should handle nested paths correctly", async () => {
    (usePathname as jest.Mock).mockReturnValue("/folder/docs/work");
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "button add" }));

    expect(mockPush).toHaveBeenCalledWith("/upload/docs/work");
  });
});
