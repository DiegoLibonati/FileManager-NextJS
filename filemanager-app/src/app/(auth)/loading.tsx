import React from "react";

import { Loader } from "@/app/components/Loaders/Loader/Loader";

export default function loading(): JSX.Element {
  return <Loader color={"#fff"} className="lg:w-[50%]"></Loader>;
}
