import { ParagraphProps } from "../../../next-env";

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
