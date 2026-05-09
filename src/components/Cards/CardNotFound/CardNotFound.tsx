import type { JSX } from "react";
import type { CardNotFoundProps } from "@/types/props";

import Heading from "@/components/Headers/Heading/Heading";
import Card from "@/components/Cards/Card/Card";

const CardNotFound = ({ children, className }: CardNotFoundProps): JSX.Element => {
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

export default CardNotFound;
