import { render } from "@testing-library/react";

import type { ComponentType } from "react";
import type { RenderResult } from "@testing-library/react";

import FolderListWithActionsSkeleton from "@/components/Skeletons/FolderListWithActionsSkeleton/FolderListWithActionsSkeleton";
import HeaderTitleSkeleton from "@/components/Skeletons/HeaderTitleSkeleton/HeaderTitleSkeleton";
import SectionCategoriesSkeleton from "@/components/Skeletons/SectionCategoriesSkeleton/SectionCategoriesSkeleton";
import SectionCircleChartSkeleton from "@/components/Skeletons/SectionCircleChartSkeleton/SectionCircleChartSkeleton";
import SectionCloudStoragesSkeleton from "@/components/Skeletons/SectionCloudStoragesSkeleton/SectionCloudStoragesSkeleton";
import SectionFilesSkeleton from "@/components/Skeletons/SectionFilesSkeleton/SectionFilesSkeleton";
import SectionFolderListWithoutActionsSkeleton from "@/components/Skeletons/SectionFolderListWithoutActionsSkeleton/SectionFolderListWithoutActionsSkeleton";
import SectionFolderSkeleton from "@/components/Skeletons/SectionFolderSkeleton/SectionFolderSkeleton";
import SectionRecentUploadedSkeleton from "@/components/Skeletons/SectionRecentUploadedSkeleton/SectionRecentUploadedSkeleton";
import SectionUpgradePlanSkeleton from "@/components/Skeletons/SectionUpgradePlanSkeleton/SectionUpgradePlanSkeleton";

const renderComponent = (Component: ComponentType): RenderResult => render(<Component />);

describe("Skeleton components", () => {
  it("should render FolderListWithActionsSkeleton without crashing", () => {
    const { container } = renderComponent(FolderListWithActionsSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render HeaderTitleSkeleton without crashing", () => {
    const { container } = renderComponent(HeaderTitleSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render SectionCategoriesSkeleton without crashing", () => {
    const { container } = renderComponent(SectionCategoriesSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render SectionCircleChartSkeleton without crashing", () => {
    const { container } = renderComponent(SectionCircleChartSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render SectionCloudStoragesSkeleton without crashing", () => {
    const { container } = renderComponent(SectionCloudStoragesSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render SectionFilesSkeleton without crashing", () => {
    const { container } = renderComponent(SectionFilesSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render SectionFolderListWithoutActionsSkeleton without crashing", () => {
    const { container } = renderComponent(SectionFolderListWithoutActionsSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render SectionFolderSkeleton without crashing", () => {
    const { container } = renderComponent(SectionFolderSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render SectionRecentUploadedSkeleton without crashing", () => {
    const { container } = renderComponent(SectionRecentUploadedSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render SectionUpgradePlanSkeleton without crashing", () => {
    const { container } = renderComponent(SectionUpgradePlanSkeleton);
    expect(container.firstChild).toBeInTheDocument();
  });
});
