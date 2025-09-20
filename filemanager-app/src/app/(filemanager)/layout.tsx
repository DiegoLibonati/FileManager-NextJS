import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { Fragment } from "react";

import { NavBar } from "@src/app/components/NavBar/NavBar";
import { Alert } from "@src/app/components/Alerts/Alert/Alert";
import { HeaderTitleSkeleton } from "@src/app/components/Skeletons/HeaderTitleSkeleton/HeaderTitleSkeleton";

export const metadata: Metadata = {
  title: "FileManager",
  description:
    "FileManager is a modern application for organizing, uploading, and managing files with cloud support.",
  keywords: ["FileManager", "Next.js", "MongoDB", "Cloud", "Gestión de archivos"],
  authors: [{ name: "Diego Libonati" }],
  openGraph: {
    title: "FileManager",
    description:
      "Gestiona y organiza tus archivos fácilmente en la nube con FileManager.",
    url: "https://your-site.com",
    siteName: "FileManager",
    // images: [
    //   {
    //     url: "/logo192.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "FileManager",
    //   },
    // ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FileManager",
    description:
      "Gestiona y organiza tus archivos fácilmente en la nube con FileManager.",
    // images: ["/logo192.png"],
    creator: "@your-user",
  },
  icons: {
    icon: "/favicon.ico",
    // apple: "/logo192.png",
  },
  // manifest: "/manifest.json",
};


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
