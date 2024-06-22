import { NavBar } from "@/app/components/NavBar/NavBar";
import { HeaderTitle } from "@/app/components/Headers/HeaderTitle/HeaderTitle";
import { Alert } from "@/app/components/Alerts/Alert/Alert";

export default function FileManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <header className="fixed bottom-0 w-full h-16 z-10 bg-white bg-opacity-95 shadow-md rounded-tl-lg rounded-tr-lg lg:h-screen lg:w-16">
        <NavBar></NavBar>
      </header>
      <main className="flex flex-col w-full min-h-screen h-full relative bg-bodyBackground p-4 mb-16 lg:mb-0 lg:ml-16">
        <section className="flex items-center justify-start w-full h-16">
          <HeaderTitle></HeaderTitle>
        </section>
        {children}
      </main>
      <Alert></Alert>
    </>
  );
}
