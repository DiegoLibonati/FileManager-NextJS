import type { JSX } from "react";

import Loader from "@/components/Loaders/Loader/Loader";

function loading(): JSX.Element {
  return <Loader color={"#8357fe"}></Loader>;
}

export default loading;
