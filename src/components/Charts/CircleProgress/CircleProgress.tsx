import type { JSX } from "react";
import type { CircleProgressProps } from "@/types/props";

import Heading from "@/components/Headers/Heading/Heading";
import Paragraph from "@/components/Paragraph/Paragraph";

const CircleProgress = ({ percentage }: CircleProgressProps): JSX.Element => {
  const normalizedPercentage = Math.min(Math.max(parseInt(percentage), 0), 100);

  return (
    <div className="relative flex items-center justify-center w-48 h-48 rounded-full overflow-hidden circle__progress lg:w-64 lg:h-64">
      <div
        className="absolute w-full h-full rounded-full circle__progress--filled"
        style={{
          backgroundImage: `conic-gradient(#8357fe ${normalizedPercentage}%, #f2f2f2 ${normalizedPercentage}%)`,
        }}
      ></div>
      <div className="relative flex flex-col items-center justify-center w-36 h-36 bg-background rounded-full lg:w-52 lg:h-52">
        <Heading className="text-xl text-primary font-semibold" element="h2">
          {percentage}%
        </Heading>
        <Paragraph className="text-lightGray font-normal text-sm">used</Paragraph>
      </div>
    </div>
  );
};

export default CircleProgress;
