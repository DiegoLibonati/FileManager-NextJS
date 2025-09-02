import React from "react";

import { GeneralShared } from "@src/app/lib/entities";

import "@src/app/components/Loaders/Loader/Loader.css";

interface LoaderProps extends GeneralShared {
  color: string;
}

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
