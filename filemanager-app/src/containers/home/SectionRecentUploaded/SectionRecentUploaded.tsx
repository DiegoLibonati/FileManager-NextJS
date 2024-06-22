import { CardItem } from "@/components/Cards/CardItem/CardItem";
import { CardNotFound } from "@/components/Cards/CardNotFound/CardNotFound";
import { Heading } from "@/components/Headers/Heading/Heading";
import { bytesToMB } from "@/helpers/utils";
import { getRecentUploaded } from "@/services/filemanager/get/getRecentUploaded/getRecentUploaded";

export const SectionRecentUploaded = async (): Promise<JSX.Element> => {
  const recentUpload = await getRecentUploaded();
  return (
    <section className="flex flex-col items-start justify-center w-full h-auto mt-8">
      <Heading className="font-semibold text-base lg:text-xl" element="h2">
        Recent Uploaded
      </Heading>

      <article className="flex items-center justify-center w-full h-auto">
        {recentUpload ? (
          <CardItem
            bgColor={recentUpload.bgColor}
            color={recentUpload.color}
            idCategory={recentUpload.idCategory}
            title={recentUpload.filename}
            subTitle={`${bytesToMB(recentUpload.size)} MB`}
            path={recentUpload.path}
            type={recentUpload.type}
          ></CardItem>
        ) : (
          <CardNotFound className="h-12 lg:h-32">
            You have no files uploaded yet!
          </CardNotFound>
        )}
      </article>
    </section>
  );
};
