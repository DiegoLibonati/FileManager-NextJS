import { render, screen } from "@testing-library/react";

import type { JSX } from "react";

import { getSession } from "@/server/helpers/get_session.helper";

import CloudPage from "@/app/(filemanager)/cloud/page";

jest.mock("@/server/helpers/get_session.helper", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/containers/cloud/SectionCloudStorages/SectionCloudStorages", () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="section-cloud-storages" />,
}));

jest.mock("@/containers/cloud/SectionUpgradePlan/SectionUpgradePlan", () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="section-upgrade" />,
}));

jest.mock("@/containers/cloud/SectionFolders/SectionFolders", () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="section-folders" />,
}));

const renderPage = async (): Promise<void> => {
  render(await CloudPage());
};

describe("CloudPage", () => {
  it("should render SectionCloudStorages and SectionFolders", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice", plan: "0" });

    await renderPage();

    expect(screen.getByTestId("section-cloud-storages")).toBeInTheDocument();
    expect(screen.getByTestId("section-folders")).toBeInTheDocument();
  });

  it("should render SectionUpgradePlan when plan is 0", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice", plan: "0" });

    await renderPage();

    expect(screen.getByTestId("section-upgrade")).toBeInTheDocument();
  });

  it("should not render SectionUpgradePlan when plan is 1", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice", plan: "1" });

    await renderPage();

    expect(screen.queryByTestId("section-upgrade")).not.toBeInTheDocument();
  });
});
