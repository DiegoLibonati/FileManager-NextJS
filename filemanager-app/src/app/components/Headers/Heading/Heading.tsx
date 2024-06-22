import { HeadingProps } from "../../../../../next-env";

export const Heading = ({
  element,
  children,
  className,
  onClick,
}: HeadingProps): JSX.Element => {
  if (element === "h1")
    return (
      <h1 className={className} onClick={onClick}>
        {children}
      </h1>
    );
  if (element === "h2")
    return (
      <h2 className={className} onClick={onClick}>
        {children}
      </h2>
    );
  if (element === "h3")
    return (
      <h3 className={className} onClick={onClick}>
        {children}
      </h3>
    );
  if (element === "h4")
    return (
      <h4 className={className} onClick={onClick}>
        {children}
      </h4>
    );
  if (element === "h5")
    return (
      <h5 className={className} onClick={onClick}>
        {children}
      </h5>
    );
  return (
    <h6 className={className} onClick={onClick}>
      {children}
    </h6>
  );
};
