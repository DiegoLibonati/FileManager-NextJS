import { Heading } from "@/app/components/Headers/Heading/Heading";
import { Card } from "@/app/components/Cards/Card/Card";
import { CardNotFoundProps } from "@/app/lib/entities";

export const CardNotFound = ({
  children,
  className,
}: CardNotFoundProps): JSX.Element => {
  return (
    <Card
      className={`flex items-center justify-center w-full bg-white rounded-lg mt-4 ${className}`}
    >
      <Heading className="font-semibold text-lg text-black" element="h2">
        {children}
      </Heading>
    </Card>
  );
};
