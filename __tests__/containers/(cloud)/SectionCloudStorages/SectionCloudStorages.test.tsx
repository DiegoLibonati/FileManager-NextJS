import { render, screen } from "@testing-library/react";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

import SectionCloudStorages from "@/containers/cloud/SectionCloudStorages/SectionCloudStorages";

import { mockSpaceUsed } from "@tests/__mocks__/spaceUsed.mock";

jest.mock("@/server/helpers/get_session.helper", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/server/services/filemanager.service", () => ({
  FileManagerService: {
    getSpaceUsed: jest.fn(),
  },
}));

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { CLOUD_PATH: string } => ({ CLOUD_PATH: "/cloud" }),
}));

const renderContainer = async (): Promise<void> => {
  render(await SectionCloudStorages());
};

describe("SectionCloudStorages", () => {
  it("should render space usage information", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getSpaceUsed as jest.Mock).mockResolvedValue(mockSpaceUsed);

    await renderContainer();

    expect(screen.getByText("42 Files")).toBeInTheDocument();
    expect(screen.getByText(/5 GB of 15 GB used/)).toBeInTheDocument();
  });

  it("should render 'Cloud Storages' heading", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getSpaceUsed as jest.Mock).mockResolvedValue(mockSpaceUsed);

    await renderContainer();

    expect(screen.getByText("Cloud Storages")).toBeInTheDocument();
  });
});
