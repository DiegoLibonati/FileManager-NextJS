"use client";

import type { JSX } from "react";
import type { ButtonCreateProps } from "@/types/props";

const ButtonCreate = ({ children, className, onClick }: ButtonCreateProps): JSX.Element => {
  return (
    <button
      className={`p-4 bg-white text-primary rounded-lg self-end ${className}`}
      type="submit"
      onClick={onClick}
      aria-label="button create"
    >
      {children}
    </button>
  );
};

export default ButtonCreate;
