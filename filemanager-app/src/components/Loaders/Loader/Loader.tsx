import React from "react";
import "./Loader.css";
import { LoaderProps } from "../../../../next-env";

export const Loader = ({
  color,
  className,
  parentClassName,
}: LoaderProps): JSX.Element => {
  const loaderStyle = {
    "--loader-color": color,
  } as React.CSSProperties;
  return (
    <div
      className={`flex items-center justify-center w-full min-h-96 ${parentClassName}`}
    >
      <div className={`loader ${className}`} style={loaderStyle}></div>
    </div>
  );
};
