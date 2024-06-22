import { SectionCloudStorages } from "@/containers/cloud/SectionCloudStorages/SectionCloudStorages";
import { SectionFolders } from "@/containers/cloud/SectionFolders/SectionFolders";
import { SectionUpgradePlan } from "@/containers/cloud/SectionUpgradePlan/SectionUpgradePlan";
import { getSession } from "@/helpers/session";

export default async function Cloud(): Promise<JSX.Element> {
  const session = await getSession();

  return (
    <>
      <SectionCloudStorages></SectionCloudStorages>
      {session.plan === "0" ? <SectionUpgradePlan></SectionUpgradePlan> : null}
      <SectionFolders></SectionFolders>
    </>
  );
}
