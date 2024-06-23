import { Heading } from "@/app/components/Headers/Heading/Heading";
import { FormRegister } from "@/app/components/Forms/FormRegister/FormRegister";
import Link from "next/link";

export default function RegisterPage(): JSX.Element {
  return (
    <article className="flex flex-col items-start justify-around w-full lg:w-[50%] lg:p-4 lg:rounded-tr-lg lg:rounded-br-lg lg:justify-evenly lg:h-full">
      <Heading element="h2" className="text-4xl font-semibold text-white">
        Create an account!
      </Heading>

      <FormRegister></FormRegister>

      <Link
        href={"/login"}
        className="self-end text-center border-solid border-2 border-white rounded-full mt-2 py-2 w-[50%] text-white transition-alls active:scale-75"
      >
        Sign in
      </Link>
    </article>
  );
}
