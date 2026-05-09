import Link from "next/link";

import type { JSX } from "react";
import type { Metadata } from "next";

import Heading from "@/components/Headers/Heading/Heading";
import FormRegister from "@/components/Forms/FormRegister/FormRegister";

export const metadata: Metadata = {
  title: "Sign Up",
};

function RegisterPage(): JSX.Element {
  return (
    <article className="flex flex-col items-start justify-around w-full lg:w-[50%] lg:p-4 lg:rounded-tr-lg lg:rounded-br-lg lg:justify-evenly lg:h-full">
      <Heading element="h2" className="text-4xl font-semibold text-white">
        Create an account!
      </Heading>

      <FormRegister></FormRegister>

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

export default RegisterPage;
