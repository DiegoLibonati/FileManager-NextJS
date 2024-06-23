import { Heading } from "@/app/components/Headers/Heading/Heading";
import { FormLogin } from "@/app/components/Forms/FormLogin/FormLogin";
import Link from "next/link";

export default function Login(): JSX.Element {
  return (
    <article className="flex flex-col items-start justify-around w-full lg:w-[50%] lg:p-4 lg:rounded-tr-lg lg:rounded-br-lg lg:justify-evenly lg:h-full">
      <Heading element="h2" className="text-4xl font-semibold text-white">
        You're back, how nice!
      </Heading>

      <FormLogin></FormLogin>

      <Link
        href={"/register"}
        className="self-end text-center border-solid border-2 border-white rounded-full mt-2 py-2 w-[50%] text-white transition-all active:scale-75"
      >
        Sign up
      </Link>

      <Link
        href={"/reset"}
        className="mt-2 text-white text-xs transition-all hover:underline active:scale-75"
      >
        Forgot your password
      </Link>
    </article>
  );
}
