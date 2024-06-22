import { BiSolidVideos } from "react-icons/bi";
import { FaFolder, FaMusic } from "react-icons/fa";
import { LuImage } from "react-icons/lu";
import { SiGoogledocs } from "react-icons/si";
import { CardIconProps } from "../../../../../next-env";
import { Card } from "../Card/Card";

export const CardIcon = ({
  idCategory,
  color,
  bgColor,
  className,
  children,
}: CardIconProps): JSX.Element => {
  return (
    <Card
      className={`flex items-center justify-center rounded-lg w-full ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {!idCategory && <FaFolder fontSize={28} fill={color}></FaFolder>}

      {idCategory === "documents" && (
        <SiGoogledocs fontSize={28} fill={color}></SiGoogledocs>
      )}
      {idCategory === "images" && (
        <LuImage fontSize={28} fill={color}></LuImage>
      )}
      {idCategory === "videos" && (
        <BiSolidVideos fontSize={28} fill={color}></BiSolidVideos>
      )}
      {idCategory === "music" && <FaMusic fontSize={28} fill={color}></FaMusic>}
      {children}
    </Card>
  );
};
