"use client";

import { TbDotsVertical } from "react-icons/tb";

import type { JSX } from "react";
import type { ButtonActionsProps } from "@/types/props";

const ButtonActions = ({ onClick, innerRef }: ButtonActionsProps): JSX.Element => {
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

export default ButtonActions;
