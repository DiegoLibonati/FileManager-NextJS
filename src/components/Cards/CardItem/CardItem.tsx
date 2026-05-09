"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { JSX } from "react";
import type { CardItemProps } from "@/types/props";

import Card from "@/components/Cards/Card/Card";
import Heading from "@/components/Headers/Heading/Heading";
import Paragraph from "@/components/Paragraph/Paragraph";
import CardIcon from "@/components/Cards/CardIcon/CardIcon";
import ButtonActions from "@/components/Buttons/ButtonActions/ButtonActions";
import DropdownActions from "@/components/Dropdown/DropdownActions/DropdownActions";

import { parseEscapeString } from "@/lib/utils";

import { useAlertStore } from "@/hooks/useAlertStore";

import filemanagerService from "@/services/filemanagerService";

const CardItem = ({
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

  const handleClickButtonActions: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setActiveDropdown(!activeDropdown);
    return;
  };

  const handleClickDeleteElement = async (
    e: React.MouseEvent<HTMLHeadingElement>
  ): Promise<void> => {
    e.stopPropagation();
    handleSetAlert("loading", "Deleting...", true);
    await filemanagerService.deleteItem(parseEscapeString(path), type);
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
        idCategory={idCategory!}
        className="h-full [&&]:w-24"
      ></CardIcon>
      <div className="flex flex-col items-start justify-center ml-4">
        <Heading className="font-semibold text-sm text-black" element="h2">
          {title}
        </Heading>
        <Paragraph className="font-normal text-xs text-lightGray">{subTitle}</Paragraph>
      </div>
      <ButtonActions
        onClick={(e) => {
          handleClickButtonActions(e);
        }}
        innerRef={refButtonActions}
      ></ButtonActions>

      {activeDropdown ? (
        <DropdownActions
          offsetLeft={refButtonActions.current?.offsetLeft ?? 0}
          onClickDelete={(e) => {
            void handleClickDeleteElement(e);
          }}
        ></DropdownActions>
      ) : null}
    </Card>
  );
};

export default CardItem;
