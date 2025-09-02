"use client";

import { MouseEventHandler, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CategoryShared,
  ColorsShared,
  GeneralShared,
} from "@src/app/lib/entities";

import { Card } from "@src/app/components/Cards/Card/Card";
import { Heading } from "@src/app/components/Headers/Heading/Heading";
import { Paragraph } from "@src/app/components/Paragraph/Paragraph";
import { CardIcon } from "@src/app/components/Cards/CardIcon/CardIcon";
import { ButtonActions } from "@src/app/components/Buttons/ButtonActions/ButtonActions";
import { DropdownActions } from "@src/app/components/Dropdown/DropdownActions/DropdownActions";

import { parseEscapeString } from "@src/app/lib/utils";
import { useAlertStore } from "@src/app/hooks/useAlertStore";
import { deleteItem } from "@src/services/filemanager/delete/deleteItem/deleteItem";

interface CardItemProps
  extends GeneralShared,
    Partial<CategoryShared>,
    ColorsShared {
  title: string;
  subTitle: string;
  path: string;
  type: string;
}

export const CardItem = ({
  idCategory,
  bgColor,
  color,
  title,
  subTitle,
  path,
  type,
  className,
}: CardItemProps): JSX.Element => {
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);

  const refButtonActions = useRef<HTMLButtonElement | null>(null);

  const { handleSetAlert } = useAlertStore();
  const router = useRouter();

  const handleClickButtonActions: MouseEventHandler<HTMLButtonElement> = (
    e
  ): void => {
    e.stopPropagation();
    setActiveDropdown(!activeDropdown);
    return;
  };

  const handleClickDeleteElement: MouseEventHandler<
    HTMLHeadingElement
  > = async (e): Promise<void> => {
    e.stopPropagation();
    handleSetAlert("loading", "Deleting...", true);
    await deleteItem(parseEscapeString(path), type);
    setActiveDropdown(false);
    router.refresh();
    handleSetAlert("info", `Successfully deleted: ${title}`, true);
  };

  const handleClickCard = (): void => {
    if (type === "folder") {
      router.push(`/folder/${path}`);
    }
  };

  return (
    <Card
      className={`relative flex flex-row items-center justify-start shadow-md w-full h-24 p-4 bg-white rounded-lg lg:h-32 card__item ${
        type === "folder" ? "cursor-pointer" : ""
      } ${className}`}
      onClick={handleClickCard}
    >
      <CardIcon
        bgColor={bgColor}
        color={color}
        idCategory={idCategory}
        className="h-full [&&]:w-24"
      ></CardIcon>
      <div className="flex flex-col items-start justify-center ml-4">
        <Heading className="font-semibold text-sm text-black" element="h2">
          {title}
        </Heading>
        <Paragraph className="font-normal text-xs text-lightGray">
          {subTitle}
        </Paragraph>
      </div>
      <ButtonActions
        onClick={handleClickButtonActions}
        innerRef={refButtonActions}
      ></ButtonActions>

      {activeDropdown ? (
        <DropdownActions
          offsetLeft={refButtonActions.current?.offsetLeft!}
          onClickDelete={handleClickDeleteElement}
        ></DropdownActions>
      ) : null}
    </Card>
  );
};
