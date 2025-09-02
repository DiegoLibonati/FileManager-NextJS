import { GeneralShared } from "@src/app/lib/entities";

import { Heading } from "@src/app/components/Headers/Heading/Heading";
import { Card } from "@src/app/components/Cards/Card/Card";

export interface CardNotFoundProps extends GeneralShared {}

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
