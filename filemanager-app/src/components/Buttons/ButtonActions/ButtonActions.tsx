import { TbDotsVertical } from "react-icons/tb";
import { ButtonActionsProps } from "../../../../next-env";

export const ButtonActions = ({
  onClick,
  innerRef,
}: ButtonActionsProps): JSX.Element => {
  return (
    <button
      className="flex absolute items-center justify-center right-2"
      type="button"
      onClick={onClick}
      ref={innerRef}
    >
      <TbDotsVertical
        fontSize={36}
        fill="#000"
        className="fill-black cursor-pointer"
      ></TbDotsVertical>
    </button>
  );
};
