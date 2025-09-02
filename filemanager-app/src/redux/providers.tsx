"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@src/redux/store";

interface ProviderReduxProps {
  children: React.ReactNode;
}

export const ProviderRedux = ({ children }: ProviderReduxProps) => {
  return <Provider store={store}>{children}</Provider>;
};
