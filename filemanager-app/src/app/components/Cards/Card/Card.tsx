import { MouseEventHandler } from "react";

import { GeneralShared } from "@/app/lib/entities";

export interface CardProps extends GeneralShared {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Card = ({
  className,
  children,
  style,
  onClick,
}: CardProps): JSX.Element => {
  return (
    <div className={className} style={style} onClick={onClick}>
      {children}
    </div>
  );
};
