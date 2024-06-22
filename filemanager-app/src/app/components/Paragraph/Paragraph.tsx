import { ParagraphProps } from "@/app/lib/entities";

export const Paragraph = ({
  className,
  children,
  style,
}: ParagraphProps): JSX.Element => {
  return (
    <p className={className} style={style}>
      {children}
    </p>
  );
};
