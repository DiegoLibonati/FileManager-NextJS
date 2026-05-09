import { BiSolidVideos } from "react-icons/bi";
import { FaFolder, FaMusic } from "react-icons/fa";
import { LuImage } from "react-icons/lu";
import { SiGoogledocs } from "react-icons/si";

import type { JSX } from "react";
import type { CardIconProps } from "@/types/props";

import Card from "@/components/Cards/Card/Card";

const CardIcon = ({
  idCategory,
  color,
  bgColor,
  className,
  children,
}: CardIconProps): JSX.Element => {
  return (
    <Card
      className={`flex items-center justify-center rounded-lg w-full card__icon ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {!idCategory && (
        <FaFolder fontSize={28} fill={color} className="card__icon__folder"></FaFolder>
      )}

      {idCategory === "documents" && (
        <SiGoogledocs fontSize={28} fill={color} className="card__icon__docs"></SiGoogledocs>
      )}
      {idCategory === "images" && (
        <LuImage fontSize={28} fill={color} className="card__icon__images"></LuImage>
      )}
      {idCategory === "videos" && (
        <BiSolidVideos fontSize={28} fill={color} className="card__icon__videos"></BiSolidVideos>
      )}
      {idCategory === "music" && (
        <FaMusic fontSize={28} fill={color} className="card__icon__music"></FaMusic>
      )}
      {children}
    </Card>
  );
};

export default CardIcon;
