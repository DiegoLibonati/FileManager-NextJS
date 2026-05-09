import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Loading from "@/app/(auth)/loading";

const renderLoading = (): RenderResult => render(<Loading />);

describe("Auth Loading", () => {
  it("should render the loader", () => {
    const { container } = renderLoading();

    expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
  });
});
