import type { JSX } from "react";

import Loader from "@/components/Loaders/Loader/Loader";

function loading(): JSX.Element {
  return <Loader color={"#fff"} className="lg:w-[50%]"></Loader>;
}

export default loading;
