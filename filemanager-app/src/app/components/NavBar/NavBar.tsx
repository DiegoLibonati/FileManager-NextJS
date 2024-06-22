"use client";

import {
  AiOutlineFolder,
  AiOutlineCloud,
  AiOutlineHome,
  AiFillFolder,
  AiFillCloud,
  AiFillHome,
} from "react-icons/ai";
import { VscRootFolder } from "react-icons/vsc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLogout } from "../Buttons/ButtonLogout/ButtonLogout";

export const NavBar = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <nav className="flex relative flex-row items-center justify-around w-full h-full lg:flex-col lg:justify-start">
      <Link href={"/"} className="lg:my-4">
        {pathname !== "/" ? (
          <AiOutlineHome fontSize={24}></AiOutlineHome>
        ) : null}
        {pathname === "/" ? (
          <AiFillHome fontSize={24} fill={"#8357fe"}></AiFillHome>
        ) : null}
      </Link>
      <Link href={"/folders"} className="lg:my-4">
        {pathname !== "/folders" ? (
          <AiOutlineFolder fontSize={24}></AiOutlineFolder>
        ) : null}
        {pathname === "/folders" ? (
          <AiFillFolder fontSize={24} fill={"#8357fe"}></AiFillFolder>
        ) : null}
      </Link>
      <Link href={"/cloud"} className="lg:my-4">
        {pathname !== "/cloud" ? (
          <AiOutlineCloud fontSize={24}></AiOutlineCloud>
        ) : null}
        {pathname === "/cloud" ? (
          <AiFillCloud fontSize={24} fill={"#8357fe"}></AiFillCloud>
        ) : null}
      </Link>
      <Link href={`/folder/root`} className="lg:my-4">
        {!pathname.includes("/folder/") ? (
          <VscRootFolder fontSize={24}></VscRootFolder>
        ) : null}
        {pathname.includes("/folder/") ? (
          <VscRootFolder fontSize={24} fill={"#8357fe"}></VscRootFolder>
        ) : null}
      </Link>

      <ButtonLogout></ButtonLogout>
    </nav>
  );
};
