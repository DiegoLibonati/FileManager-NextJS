import { Fragment } from "react";
import Image from "next/image";
import type { Metadata } from "next";

import { Alert } from "@src/app/components/Alerts/Alert/Alert";


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

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <Fragment>
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
    </Fragment>
  );
}
