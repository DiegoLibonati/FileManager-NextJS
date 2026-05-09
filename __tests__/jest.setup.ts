import { createElement } from "react";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import "@testing-library/jest-dom";

// Next.js's loadable runtime fires an async React state update when dynamic
// imports resolve. This update escapes act() in both component tests (before
// the act boundary closes) and server/node tests (no act context at all).
// It is not a bug in the test code — suppress it globally.
const _consoleError = console.error.bind(console);
console.error = (...args: unknown[]): void => {
  // React passes the format string as args[0] ("An update to %s inside a test...")
  // and the component name as args[1] — check both slots.
  if (
    typeof args[0] === "string" &&
    args[0].includes("not wrapped in act") &&
    args.some((a) => typeof a === "string" && a.includes("LoadableComponent"))
  )
    return;
  _consoleError(...args);
};

jest.mock("next/link", () => ({
  __esModule: true,
  default: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }
  ): ReturnType<typeof createElement> => {
    const { href, children, ...rest } = props;
    return createElement("a", { href, ...rest }, children);
  },
}));
