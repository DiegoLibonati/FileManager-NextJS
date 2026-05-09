import type { JSX } from "react";

import { getSession } from "@/server/helpers/get_session.helper";
import { FileManagerService } from "@/server/services/filemanager.service";

import CircleProgress from "@/components/Charts/CircleProgress/CircleProgress";
import Heading from "@/components/Headers/Heading/Heading";
import Paragraph from "@/components/Paragraph/Paragraph";

const SectionChart = async (): Promise<JSX.Element> => {
  const session = await getSession();
  const spaceUsed = await FileManagerService.getSpaceUsed(session?.username ?? "");

  return (
    <section className="flex flex-col items-center justify-center w-full h-auto lg:flex-row">
      <article className="flex flex-col items-start self-start lg:hidden">
        <Heading className="text-black font-semibold text-base" element="h2">
          {spaceUsed.total_free} GB
        </Heading>
        <Paragraph className="text-sm font-normal text-lightGray">Free</Paragraph>
      </article>

      <CircleProgress percentage={spaceUsed.percentage_used}></CircleProgress>

      <article className="flex flex-col items-start self-end lg:hidden">
        <Heading className="text-black font-semibold text-base" element="h2">
          {spaceUsed.total_space} GB
        </Heading>
        <Paragraph className="text-sm font-normal text-lightGray">Total</Paragraph>
      </article>

      <article className="hidden flex-col ml-8 lg:flex">
        <div className="flex flex-col items-start self-start mx-2 my-2">
          <Heading className="text-black font-semibold text-base" element="h2">
            {spaceUsed.total_free} GB
          </Heading>
          <Paragraph className="text-sm font-normal text-lightGray">Free</Paragraph>
        </div>
        <div className="flex flex-col items-start self-start mx-2 my-2">
          <Heading className="text-black font-semibold text-base" element="h2">
            {spaceUsed.total_space} GB
          </Heading>
          <Paragraph className="text-sm font-normal text-lightGray">Total</Paragraph>
        </div>
      </article>
    </section>
  );
};

export default SectionChart;
