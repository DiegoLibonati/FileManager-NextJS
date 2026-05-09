import type { JSX } from "react";
import type { CardProps } from "@/types/props";

const Card = ({ className, children, style, onClick }: CardProps): JSX.Element => {
  return (
    <div className={className} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
