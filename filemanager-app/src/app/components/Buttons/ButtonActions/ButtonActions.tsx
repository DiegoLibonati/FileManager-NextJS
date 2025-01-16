import { LegacyRef, MouseEventHandler } from "react";
import { TbDotsVertical } from "react-icons/tb";

interface ButtonActionsProps {
  innerRef: LegacyRef<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ButtonActions = ({
  onClick,
  innerRef,
}: ButtonActionsProps): JSX.Element => {
  return (
    <button
      className="flex absolute items-center justify-center right-2"
      type="button"
      aria-label="button actions"
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
