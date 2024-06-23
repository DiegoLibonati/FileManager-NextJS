import { Heading } from "@/app/components/Headers/Heading/Heading";
import Link from "next/link";
import { NewPasswordPageProps } from "@/app/lib/entities";
import { FormResetPassword } from "@/app/components/Forms/FormResetPassword/FormResetPassword";

export default function NewPassword({
  searchParams,
}: NewPasswordPageProps): JSX.Element {
  const username = searchParams.username;

  return (
    <article className="flex flex-col items-start justify-around w-full lg:w-[50%] lg:p-4 lg:rounded-tr-lg lg:rounded-br-lg lg:justify-evenly lg:h-full">
      <Heading element="h2" className="text-4xl font-semibold text-white">
        Change your password {username}
      </Heading>

      <FormResetPassword></FormResetPassword>

      <Link
        href={"/login"}
        className="self-end text-center border-solid border-2 border-white rounded-full mt-2 py-2 w-[50%] text-white transition-alls active:scale-75"
      >
        Sign in
      </Link>
    </article>
  );
}
