"use client";

import { FaInfoCircle, FaWindowClose } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { BiLoader } from "react-icons/bi";

import { Paragraph } from "@src/app/components/Paragraph/Paragraph";

import { useAlertStore } from "@src/app/hooks/useAlertStore";

export const Alert = (): JSX.Element => {
  const { alert, handleSetAlert } = useAlertStore();

  const handleCloseAlert = (): void => {
    handleSetAlert("info", "", false);
  };

  return (
    <div
      className={`flex-row items-center justify-start absolute z-[10] bg-secondary w-full h-auto rounded-bl-lg rounded-br-lg shadow-md p-2 lg:w-[50%] lg:right-2 lg:top-2 lg:rounded-lg alert ${
        alert.open ? "flex" : "hidden"
      }`}
    >
      {alert.type === "info" ? (
        <FaInfoCircle
          fontSize={32}
          fill="#fff"
          className="w-[10%] alert__info"
        ></FaInfoCircle>
      ) : null}

      {alert.type === "error" ? (
        <MdError fontSize={32} fill="#fff" className="w-[10%] alert__error"></MdError>
      ) : null}

      {alert.type === "warning" ? (
        <CiWarning fontSize={32} fill="#fff" className="w-[10%] alert__warning"></CiWarning>
      ) : null}

      {alert.type === "loading" ? (
        <BiLoader
          fontSize={32}
          fill="#fff"
          className="w-[10%] animate-pulse alert__loading"
        ></BiLoader>
      ) : null}

      <Paragraph className="text-sm text-white font-semibold ml-2 w-[80%]">
        {alert.message}
      </Paragraph>

      <button
        className="flex items-center justify-center w-[10%] cursor-pointer border-none bg-none"
        aria-label="close alert"
        onClick={handleCloseAlert}
      >
        <FaWindowClose fontSize={32} fill="#fff"></FaWindowClose>
      </button>
    </div>
  );
};
