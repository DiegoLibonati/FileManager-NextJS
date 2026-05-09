import { Fragment } from "react";

import type { JSX } from "react";
import type { Metadata } from "next";
import type { FileManagerLayoutProps } from "@/types/props";

import NavBar from "@/components/NavBar/NavBar";
import Alert from "@/components/Alerts/Alert/Alert";
import HeaderTitleLazy from "@/components/Headers/HeaderTitle/HeaderTitleLazy";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function FileManagerLayout({ children }: FileManagerLayoutProps): JSX.Element {
  return (
    <Fragment>
      <header className="fixed bottom-0 w-full h-16 z-10 bg-white bg-opacity-95 shadow-md rounded-tl-lg rounded-tr-lg lg:h-screen lg:w-16">
        <NavBar></NavBar>
      </header>
      <main className="flex flex-col w-full min-h-screen h-full relative bg-background p-4 mb-16 lg:mb-0 lg:ml-16">
        <section className="flex items-center justify-start w-full h-16">
          <HeaderTitleLazy />
        </section>
        {children}
      </main>
      <Alert></Alert>
    </Fragment>
  );
}

export default FileManagerLayout;
