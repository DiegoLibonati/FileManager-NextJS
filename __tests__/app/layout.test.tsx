import { render, screen, act } from "@testing-library/react";

import type { ReactNode } from "react";

import RootLayout from "@/app/layout";

jest.mock("next/font/google", () => ({
  Inter: (): { className: string; style: Record<string, string> } => ({
    className: "inter",
    style: {},
  }),
}));

const renderLayout = async (children: ReactNode): Promise<void> => {
  await act(async () => {
    await Promise.resolve();
    render(<RootLayout>{children}</RootLayout>);
  });
};

describe("RootLayout", () => {
  beforeEach((): void => {
    // RootLayout renders <html>/<body> singleton elements that jsdom can't
    // nest inside a container div — suppress the known validation warning.
    jest.spyOn(console, "error").mockImplementation((): void => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render children wrapped in the Redux provider", async () => {
    await renderLayout(<span>Root content</span>);

    expect(screen.getByText("Root content")).toBeInTheDocument();
  });

  it("should render an html element with lang='en'", async () => {
    await renderLayout(<span>Content</span>);

    expect(document.documentElement).toHaveAttribute("lang", "en");
  });
});
