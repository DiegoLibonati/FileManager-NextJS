"use client";

import { FaPlus } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export const ButtonAdd = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickAdd = (): void => {
    const arrPath = pathname.split("/");
    const currentPath = arrPath.slice(2, arrPath.length).join("/");
    router.push(`/upload/${currentPath}`);
    return;
  };

  return (
    <button
      className="flex items-center justify-center absolute top-4 right-4 h-8 w-8 text-2xl bg-primary rounded-full cursor-pointer shadow-md"
      type="button"
      onClick={handleClickAdd}
    >
      <FaPlus fontSize={16} fill="#fff"></FaPlus>
    </button>
  );
};
