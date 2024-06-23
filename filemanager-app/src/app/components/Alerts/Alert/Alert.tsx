"use client";

import { Paragraph } from "@/app/components/Paragraph/Paragraph";
import { useAlertStore } from "@/app/hooks/useAlertStore";
import { FaInfoCircle, FaWindowClose } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { BiLoader } from "react-icons/bi";

export const Alert = (): JSX.Element => {
  const { alert, handleSetAlert } = useAlertStore();

  return (
    <div
      className={`flex-row items-center justify-start absolute z-[10] bg-secondary w-full h-auto rounded-bl-lg rounded-br-lg shadow-md p-2 lg:w-[50%] lg:right-2 lg:top-2 lg:rounded-lg ${
        alert.open ? "flex" : "hidden"
      }`}
    >
      {alert.type === "info" ? (
        <FaInfoCircle
          fontSize={32}
          fill="#fff"
          className="w-[10%]"
        ></FaInfoCircle>
      ) : null}

      {alert.type === "error" ? (
        <MdError fontSize={32} fill="#fff" className="w-[10%]"></MdError>
      ) : null}

      {alert.type === "warning" ? (
        <CiWarning fontSize={32} fill="#fff" className="w-[10%]"></CiWarning>
      ) : null}

      {alert.type === "loading" ? (
        <BiLoader
          fontSize={32}
          fill="#fff"
          className="w-[10%] animate-pulse"
        ></BiLoader>
      ) : null}

      <Paragraph className="text-sm text-white font-semibold ml-2 w-[80%]">
        {alert.message}
      </Paragraph>

      <FaWindowClose
        fontSize={32}
        fill="#fff"
        className="w-[10%] cursor-pointer"
        onClick={() => handleSetAlert("info", "", false)}
      ></FaWindowClose>
    </div>
  );
};
