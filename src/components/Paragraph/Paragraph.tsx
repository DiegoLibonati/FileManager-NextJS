import type { JSX } from "react";
import type { ParagraphProps } from "@/types/props";

const Paragraph = ({ className, children, style }: ParagraphProps): JSX.Element => {
  return (
    <p className={className} style={style}>
      {children}
    </p>
  );
};

export default Paragraph;
