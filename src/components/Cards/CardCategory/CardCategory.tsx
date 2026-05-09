import Link from "next/link";

import type { JSX } from "react";
import type { CardCategoryProps } from "@/types/props";

import Paragraph from "@/components/Paragraph/Paragraph";
import CardIcon from "@/components/Cards/CardIcon/CardIcon";

const CardCategory = ({
  href,
  categoryName,
  idCategory,
  bgColor,
  color,
}: CardCategoryProps): JSX.Element => {
  return (
    <Link
      href={href}
      aria-label={`go to ${href}`}
      className="flex flex-col items-center justify-center w-full h-auto lg:cursor-pointer"
    >
      <CardIcon
        idCategory={idCategory}
        color={color}
        bgColor={bgColor}
        className="h-12 lg:flex-row lg:justify-start lg:h-32 lg:p-4"
      >
        <Paragraph className="hidden text-base ml-8 lg:block" style={{ color: color }}>
          {categoryName}
        </Paragraph>
      </CardIcon>
      <Paragraph className="text-xs mt-2 lg:hidden">{categoryName}</Paragraph>
    </Link>
  );
};

export default CardCategory;
