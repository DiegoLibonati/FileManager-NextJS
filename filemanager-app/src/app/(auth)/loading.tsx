import { Loader } from "@/app/components/Loaders/Loader/Loader";
import React from "react";

export default function loading(): JSX.Element {
  return <Loader color={"#fff"} className="lg:w-[50%]"></Loader>;
}
