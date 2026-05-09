import type { JSX } from "react";

import CardItem from "@/components/Cards/CardItem/CardItem";
import CardNotFound from "@/components/Cards/CardNotFound/CardNotFound";
import Heading from "@/components/Headers/Heading/Heading";

import { bytesToMB } from "@/lib/utils";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

const SectionRecentUploaded = async (): Promise<JSX.Element> => {
  const session = await getSession();
  const recentUpload = await FileManagerService.getRecentUpload(session?.username ?? "");

  return (
    <section className="flex flex-col items-start justify-center w-full h-auto mt-8">
      <Heading className="font-semibold text-base lg:text-xl" element="h2">
        Recent Uploaded
      </Heading>

      <article className="flex items-center justify-center w-full h-auto mt-2">
        {recentUpload ? (
          <CardItem
            bgColor={recentUpload.bgColor}
            color={recentUpload.color}
            idCategory={recentUpload.idCategory}
            title={recentUpload.filename}
            subTitle={`${bytesToMB(String(recentUpload.size))} MB`}
            path={recentUpload.path}
            type={recentUpload.type}
          ></CardItem>
        ) : (
          <CardNotFound className="h-12 lg:h-32">You have no files uploaded yet!</CardNotFound>
        )}
      </article>
    </section>
  );
};

export default SectionRecentUploaded;
