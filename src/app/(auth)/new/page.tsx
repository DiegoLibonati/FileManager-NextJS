import Link from "next/link";

import type { JSX } from "react";
import type { Metadata } from "next";
import type { NewPasswordPageProps } from "@/types/props";

import Heading from "@/components/Headers/Heading/Heading";
import FormResetPassword from "@/components/Forms/FormResetPassword/FormResetPassword";

export const metadata: Metadata = {
  title: "New Password",
};

function NewPasswordPage({ searchParams }: NewPasswordPageProps): JSX.Element {
  const username = searchParams.username;

  return (
    <article className="flex flex-col items-start justify-around w-full lg:w-[50%] lg:p-4 lg:rounded-tr-lg lg:rounded-br-lg lg:justify-evenly lg:h-full">
      <Heading element="h2" className="text-4xl font-semibold text-white">
        Change your password {username}
      </Heading>

      <FormResetPassword></FormResetPassword>

      <Link
        href={"/login"}
        aria-label="go to login page"
        className="self-end text-center border-solid border-2 border-white rounded-full mt-2 py-2 w-[50%] text-white transition-alls active:scale-75"
      >
        Sign in
      </Link>
    </article>
  );
}

export default NewPasswordPage;
