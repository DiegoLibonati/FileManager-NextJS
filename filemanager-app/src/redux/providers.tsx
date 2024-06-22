"use client";

import { Provider } from "react-redux";
import { ProviderReduxProps } from "@/app/lib/entities";
import { store } from "@/redux/store";

export const ProviderRedux = ({ children }: ProviderReduxProps) => {
  return <Provider store={store}>{children}</Provider>;
};
