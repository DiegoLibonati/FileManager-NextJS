import { MouseEventHandler } from "react";

import { GeneralShared } from "@/app/lib/entities";

export interface ButtonCreateProps extends GeneralShared {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ButtonCreate = ({
  children,
  className,
  onClick,
}: ButtonCreateProps): JSX.Element => {
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
