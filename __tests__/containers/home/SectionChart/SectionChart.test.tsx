import { render, screen } from "@testing-library/react";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

import SectionChart from "@/containers/home/SectionChart/SectionChart";

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
  render(await SectionChart());
};

describe("SectionChart", () => {
  it("should render space usage data from session", async () => {
    (getSession as jest.Mock).mockResolvedValue({ username: "alice" });
    (FileManagerService.getSpaceUsed as jest.Mock).mockResolvedValue(mockSpaceUsed);

    await renderContainer();

    expect(screen.getAllByText("10 GB").length).toBeGreaterThan(0);
    expect(screen.getAllByText("15 GB").length).toBeGreaterThan(0);
    expect(screen.getByText("33%")).toBeInTheDocument();
  });

  it("should handle null session and use empty username", async () => {
    (getSession as jest.Mock).mockResolvedValue(null);
    (FileManagerService.getSpaceUsed as jest.Mock).mockResolvedValue(mockSpaceUsed);

    await renderContainer();

    expect(FileManagerService.getSpaceUsed).toHaveBeenCalledWith("");
  });
});
