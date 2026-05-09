"use client";

import React from "react";
import { Provider } from "react-redux";

import type { JSX } from "react";
import type { ProviderReduxProps } from "@/types/props";

import { store } from "@/redux/store";

export const ProviderRedux = ({ children }: ProviderReduxProps): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};
