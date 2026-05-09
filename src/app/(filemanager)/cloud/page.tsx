import { Fragment, Suspense } from "react";

import type { JSX } from "react";
import type { Metadata } from "next";

import { getSession } from "@/server/helpers/get_session.helper";

import SectionCloudStoragesSkeleton from "@/components/Skeletons/SectionCloudStoragesSkeleton/SectionCloudStoragesSkeleton";
import SectionUpgradePlanSkeleton from "@/components/Skeletons/SectionUpgradePlanSkeleton/SectionUpgradePlanSkeleton";
import SectionFolderListWithoutActionsSkeleton from "@/components/Skeletons/SectionFolderListWithoutActionsSkeleton/SectionFolderListWithoutActionsSkeleton";

import SectionCloudStorages from "@/containers/cloud/SectionCloudStorages/SectionCloudStorages";
import SectionUpgradePlan from "@/containers/cloud/SectionUpgradePlan/SectionUpgradePlan";
import SectionFolders from "@/containers/cloud/SectionFolders/SectionFolders";

export const metadata: Metadata = {
  title: "Cloud Storage",
};

async function CloudPage(): Promise<JSX.Element> {
  const session = await getSession();

  return (
    <Fragment>
      <Suspense fallback={<SectionCloudStoragesSkeleton></SectionCloudStoragesSkeleton>}>
        <SectionCloudStorages></SectionCloudStorages>
      </Suspense>
      {session?.plan === "0" ? (
        <Suspense fallback={<SectionUpgradePlanSkeleton></SectionUpgradePlanSkeleton>}>
          <SectionUpgradePlan></SectionUpgradePlan>
        </Suspense>
      ) : null}
      <Suspense
        fallback={
          <SectionFolderListWithoutActionsSkeleton></SectionFolderListWithoutActionsSkeleton>
        }
      >
        <SectionFolders></SectionFolders>
      </Suspense>
    </Fragment>
  );
}

export default CloudPage;
