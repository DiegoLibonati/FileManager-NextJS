import Link from "next/link";

import { Heading } from "@src/app/components/Headers/Heading/Heading";
import { FormSendEmailResetPassword } from "@src/app/components/Forms/FormSendEmailResetPassword/FormSendEmailResetPassword";

export default function ResetPasswordPage(): JSX.Element {
  return (
    <article className="flex flex-col items-start justify-around w-full lg:w-[50%] lg:p-4 lg:rounded-tr-lg lg:rounded-br-lg lg:justify-evenly lg:h-full">
      <Heading element="h2" className="text-4xl font-semibold text-white">
        Forgot your password?
      </Heading>

      <FormSendEmailResetPassword></FormSendEmailResetPassword>

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
