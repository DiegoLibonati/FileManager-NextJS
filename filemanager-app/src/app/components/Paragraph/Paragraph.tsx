import { GeneralShared } from "@/app/lib/entities";

interface ParagraphProps extends GeneralShared {}

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
