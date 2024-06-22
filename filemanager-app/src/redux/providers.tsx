"use client";

import { Provider } from "react-redux";
import { ProviderReduxProps } from "../../next-env";
import { store } from "./store";

export const ProviderRedux = ({ children }: ProviderReduxProps) => {
  return <Provider store={store}>{children}</Provider>;
};
