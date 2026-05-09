"use client";

import { useRouter } from "next/navigation";

import type { JSX } from "react";
import type { CardSimpleProps } from "@/types/props";

import Heading from "@/components/Headers/Heading/Heading";
import Card from "@/components/Cards/Card/Card";
import Paragraph from "@/components/Paragraph/Paragraph";
import CardIcon from "@/components/Cards/CardIcon/CardIcon";

const CardSimple = ({
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
      } card__simple`}
      onClick={handleClickCard}
    >
      <div className="flex flex-col">
        <Heading element="h3" className="font-semibold text-sm">
          {title}
        </Heading>

        <Paragraph className="text-lightGray text-xs">{subTitle}</Paragraph>
      </div>

      <CardIcon color={color} bgColor={bgColor} className="h-full [&&]:w-24"></CardIcon>
    </Card>
  );
};

export default CardSimple;
