import Link from "next/link";

import type { JSX } from "react";
import type { Metadata } from "next";

import Heading from "@/components/Headers/Heading/Heading";
import FormLogin from "@/components/Forms/FormLogin/FormLogin";

export const metadata: Metadata = {
  title: "Sign In",
};

function LoginPage(): JSX.Element {
  return (
    <article className="flex flex-col items-start justify-around w-full lg:w-[50%] lg:p-4 lg:rounded-tr-lg lg:rounded-br-lg lg:justify-evenly lg:h-full">
      <Heading element="h2" className="text-4xl font-semibold text-white">
        You&apos;re back, how nice!
      </Heading>

      <FormLogin></FormLogin>

      <Link
        href={"/register"}
        aria-label="go to register page"
        className="self-end text-center border-solid border-2 border-white rounded-full mt-2 py-2 w-[50%] text-white transition-all active:scale-75"
      >
        Sign up
      </Link>

      <Link
        href={"/reset"}
        aria-label="go to reset your password"
        className="mt-2 text-white text-xs transition-all hover:underline active:scale-75"
      >
        Forgot your password
      </Link>
    </article>
  );
}

export default LoginPage;
