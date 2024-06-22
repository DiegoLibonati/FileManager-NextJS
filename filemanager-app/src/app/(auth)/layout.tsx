import { Alert } from "@/components/Alerts/Alert/Alert";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <main className="flex relative items-center justify-center w-full min-h-screen h-full bg-primary p-8">
        <section className="flex flex-col items-center justify-center w-full bg-primary lg:flex-row lg:h-[30rem] lg:shadow-md lg:w-[60rem] lg:rounded-lg">
          <article className="hidden items-center justify-center w-[50%] h-full bg-white p-4 rounded-tl-lg rounded-bl-lg lg:flex">
            <Image
              src="/authImage.png"
              alt="Auth FileManager"
              width={300}
              height={300}
            ></Image>
          </article>

          {children}
        </section>
      </main>
      <Alert></Alert>
    </>
  );
}
