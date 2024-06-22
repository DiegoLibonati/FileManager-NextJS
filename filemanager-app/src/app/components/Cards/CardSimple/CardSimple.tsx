"use client";

import { Heading } from "@/app/components/Headers/Heading/Heading";
import { Card } from "../Card/Card";
import { Paragraph } from "@/app/components/Paragraph/Paragraph";
import { CardIcon } from "../CardIcon/CardIcon";
import { CardSimpleProps } from "../../../../../next-env";
import { useRouter } from "next/navigation";

export const CardSimple = ({
  title,
  subTitle,
  type,
  path,
  color,
  bgColor,
}: CardSimpleProps): JSX.Element => {
  const router = useRouter();

  const handleClickCard = (): void => {
    if (type === "folder") {
      router.push(`/folder/${path}`);
    }
  };
  return (
    <Card
      className={`flex flex-row w-full justify-between items-center rounded-lg shadow-md p-4 h-20 ${
        type === "folder" ? "cursor-pointer" : ""
      }`}
      onClick={handleClickCard}
    >
      <div className="flex flex-col">
        <Heading element="h3" className="font-semibold text-sm">
          {title}
        </Heading>

        <Paragraph className="text-lightGray text-xs">{subTitle}</Paragraph>
      </div>

      <CardIcon
        color={color}
        bgColor={bgColor}
        className="h-full [&&]:w-24"
      ></CardIcon>
    </Card>
  );
};
