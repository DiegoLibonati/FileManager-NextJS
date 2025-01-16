import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { DropdownActions } from "@/app/components/Dropdown/DropdownActions/DropdownActions";

type RenderComponent = {
  container: HTMLElement;
  props: {
    offsetLeft: number;
    mockOnClickDelete: jest.Mock | null;
  };
};

interface RenderComponentProps {
  mockOnClickDelete: jest.Mock | null;
}

const renderComponent = ({
  mockOnClickDelete,
}: RenderComponentProps): RenderComponent => {
  const props = {
    offsetLeft: 20,
    mockOnClickDelete: mockOnClickDelete,
  };

  const { container } = render(
    <DropdownActions
      offsetLeft={props.offsetLeft}
      onClickDelete={props.mockOnClickDelete!}
    ></DropdownActions>
  );

  return {
    container: container,
    props: props,
  };
};

describe("LinealProgress.tsx", () => {
  describe("General Tests.", () => {
    const mockOnClickDelete = null;

    test("It must render the root dropdown actions.", () => {
      const { container } = renderComponent({
        mockOnClickDelete: mockOnClickDelete,
      });

      const dropdownActionsRoot = container.querySelector(
        ".dropdown__actions"
      ) as HTMLDivElement;

      expect(dropdownActionsRoot).toBeInTheDocument();
    });
  });

  describe("If onClickDelete prop exists.", () => {
    const mockOnClickDelete = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("It must render the delete option.", () => {
      renderComponent({ mockOnClickDelete: mockOnClickDelete });

      const deleteOption = screen.getByRole("heading", { name: /Eliminar/i });

      expect(deleteOption).toBeInTheDocument();
    });

    test("It must execute the relevant function when you click on it.", async () => {
      renderComponent({ mockOnClickDelete: mockOnClickDelete });

      const deleteOption = screen.getByRole("heading", { name: /Eliminar/i });

      await user.click(deleteOption);

      expect(mockOnClickDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe("If onClickDelete prop do not exists.", () => {
    const mockOnClickDelete = null;

    test("It must not render the delete option.", () => {
      renderComponent({ mockOnClickDelete: mockOnClickDelete });

      const deleteOption = screen.queryByRole("heading", { name: /Eliminar/i });

      expect(deleteOption).not.toBeInTheDocument();
    });
  });
});
