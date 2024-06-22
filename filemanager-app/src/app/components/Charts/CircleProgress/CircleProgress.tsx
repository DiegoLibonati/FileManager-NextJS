import { Heading } from "@/app/components/Headers/Heading/Heading";
import { CircleProgressProps } from "@/app/lib/entities";
import { Paragraph } from "@/app/components/Paragraph/Paragraph";

export const CircleProgress = ({
  percentage,
}: CircleProgressProps): JSX.Element => {
  const normalizedPercentage = Math.min(Math.max(parseInt(percentage), 0), 100); // Ensure the percentage is between 0 and 100

  return (
    <div className="relative flex items-center justify-center w-48 h-48 rounded-full overflow-hidden lg:w-64 lg:h-64">
      <div
        className="absolute w-full h-full rounded-full"
        style={{
          backgroundImage: `conic-gradient(#8357fe ${normalizedPercentage}%, #f2f2f2 ${normalizedPercentage}%)`,
        }}
      ></div>
      <div className="relative flex flex-col items-center justify-center w-36 h-36 bg-bodyBackground rounded-full lg:w-52 lg:h-52">
        <Heading className="text-xl text-primary font-semibold" element="h2">
          {percentage}%
        </Heading>
        <Paragraph className="text-lightGray font-normal text-sm">
          used
        </Paragraph>
      </div>
    </div>
  );
};
