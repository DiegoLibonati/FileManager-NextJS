import { getSession } from "@/app/lib/session";
import dynamic from "next/dynamic";
import { SectionCloudStoragesSkeleton } from "@/app/components/Skeletons/SectionCloudStoragesSkeleton/SectionCloudStoragesSkeleton";
import { SectionUpgradePlanSkeleton } from "@/app/components/Skeletons/SectionUpgradePlanSkeleton/SectionUpgradePlanSkeleton";
import { SectionFolderListWithoutActionsSkeleton } from "@/app/components/Skeletons/SectionFolderListWithoutActionsSkeleton/SectionFolderListWithoutActionsSkeleton";

const LazySectionCloudStorages = dynamic(
  () =>
    import("@/containers/cloud/SectionCloudStorages/SectionCloudStorages").then(
      (mod) => mod.SectionCloudStorages
    ),
  {
    ssr: false,
    loading: () => (
      <SectionCloudStoragesSkeleton></SectionCloudStoragesSkeleton>
    ),
  }
);

const LazySectionUpgradePlan = dynamic(
  () =>
    import("@/containers/cloud/SectionUpgradePlan/SectionUpgradePlan").then(
      (mod) => mod.SectionUpgradePlan
    ),
  {
    ssr: false,
    loading: () => <SectionUpgradePlanSkeleton></SectionUpgradePlanSkeleton>,
  }
);

const LazySectionFolders = dynamic(
  () =>
    import("@/containers/cloud/SectionFolders/SectionFolders").then(
      (mod) => mod.SectionFolders
    ),
  {
    ssr: false,
    loading: () => (
      <SectionFolderListWithoutActionsSkeleton></SectionFolderListWithoutActionsSkeleton>
    ),
  }
);

export default async function Cloud(): Promise<JSX.Element> {
  const session = await getSession();

  return (
    <>
      <LazySectionCloudStorages></LazySectionCloudStorages>
      {session.plan === "0" ? (
        <LazySectionUpgradePlan></LazySectionUpgradePlan>
      ) : null}
      <LazySectionFolders></LazySectionFolders>
    </>
  );
}
