import type { JSX } from "react";
import type { LoaderProps } from "@/types/props";

import "@/components/Loaders/Loader/Loader.css";

const Loader = ({ color, className, parentClassName }: LoaderProps): JSX.Element => {
  const loaderStyle = {
    "--loader-color": color,
  } as React.CSSProperties;
  return (
    <div className={`flex items-center justify-center w-full min-h-96 ${parentClassName}`}>
      <div className={`loader ${className}`} style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
