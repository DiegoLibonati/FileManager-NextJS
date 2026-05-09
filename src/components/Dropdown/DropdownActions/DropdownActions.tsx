"use client";

import type { JSX } from "react";
import type { DropdownActionsProps } from "@/types/props";

import Heading from "@/components/Headers/Heading/Heading";

const DropdownActions = ({ offsetLeft, onClickDelete }: DropdownActionsProps): JSX.Element => {
  return (
    <div
      className="flex flex-col absolute items-center justify-center p-2 mb-16 bg-white shadow-md rounded-lg w-36 dropdown__actions"
      style={{ left: offsetLeft - 160 }}
    >
      <Heading
        element="h2"
        className="p-2 w-full cursor-pointer text-center rounded-lg hover:bg-primary hover:text-white active:bg-primary active:text-white"
        onClick={onClickDelete}
      >
        Eliminar
      </Heading>
    </div>
  );
};

export default DropdownActions;
