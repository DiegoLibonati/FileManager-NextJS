import { Paragraph } from "@/app/components/Paragraph/Paragraph";
import Link from "next/link";
import { CardCategoryProps } from "../../../../../next-env";
import { CardIcon } from "../CardIcon/CardIcon";

export const CardCategory = ({
  href,
  categoryName,
  idCategory,
  bgColor,
  color,
}: CardCategoryProps): JSX.Element => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center w-full h-auto lg:cursor-pointer"
    >
      <CardIcon
        idCategory={idCategory}
        color={color}
        bgColor={bgColor}
        className="h-12 lg:flex-row lg:justify-start lg:h-32 lg:p-4"
      >
        <Paragraph
          className="hidden text-base ml-8 lg:block"
          style={{ color: color }}
        >
          {categoryName}
        </Paragraph>
      </CardIcon>
      <Paragraph className="text-xs mt-2 lg:hidden">{categoryName}</Paragraph>
    </Link>
  );
};
