import { LinealProgress } from "@/components/Charts/LinealProgress/LinealProgress";
import { Heading } from "@/components/Headers/Heading/Heading";
import { Paragraph } from "@/components/Paragraph/Paragraph";
import { getSpaceUsed } from "@/services/filemanager/get/getSpaceUsed/getSpaceUsed";
import React from "react";
import { FaCloud } from "react-icons/fa";

export const SectionCloudStorages = async (): Promise<JSX.Element> => {
  const spaceUsed = await getSpaceUsed();
  return (
    <section className="flex flex-col items-center justify-center w-full h-auto bg-primary p-4 rounded-lg shadow-md">
      <article className="flex flex-row items-center justify-start w-full lg:relative">
        <FaCloud className="text-[96px] fill-secondary lg:text-[160px]"></FaCloud>
        <div className="flex flex-col ml-4 lg:ml-0 lg:items-end lg:w-full">
          <Heading
            element="h2"
            className="text-white font-semibold text-base lg:text-6xl"
          >
            Cloud Storages
          </Heading>
          <Paragraph className="text-white text-sm mt-1 lg:text-2xl">
            {spaceUsed.total_files} Files
          </Paragraph>
        </div>
      </article>

      <article className="flex flex-col items-start justify-center w-full mt-4">
        <Paragraph className="text-white text-xs lg:text-xl">
          {spaceUsed.total_used} GB of {spaceUsed.total_space} GB used
        </Paragraph>
        <LinealProgress percentage={spaceUsed.percentage_used}></LinealProgress>
      </article>
    </section>
  );
};
