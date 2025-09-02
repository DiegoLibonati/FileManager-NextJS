import dynamic from "next/dynamic";

import { Fragment } from "react";

import { NavBar } from "@src/app/components/NavBar/NavBar";
import { Alert } from "@src/app/components/Alerts/Alert/Alert";
import { HeaderTitleSkeleton } from "@src/app/components/Skeletons/HeaderTitleSkeleton/HeaderTitleSkeleton";

const LazyHeaderTitle = dynamic(
  () =>
    import("@src/app/components/Headers/HeaderTitle/HeaderTitle").then(
      (mod) => mod.HeaderTitle
    ),
  { ssr: false, loading: () => <HeaderTitleSkeleton></HeaderTitleSkeleton> }
);

export default function FileManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <Fragment>
      <header className="fixed bottom-0 w-full h-16 z-10 bg-white bg-opacity-95 shadow-md rounded-tl-lg rounded-tr-lg lg:h-screen lg:w-16">
        <NavBar></NavBar>
      </header>
      <main className="flex flex-col w-full min-h-screen h-full relative bg-bodyBackground p-4 mb-16 lg:mb-0 lg:ml-16">
        <section className="flex items-center justify-start w-full h-16">
          <LazyHeaderTitle></LazyHeaderTitle>
        </section>
        {children}
      </main>
      <Alert></Alert>
    </Fragment>
  );
}
