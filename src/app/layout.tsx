import { Inter } from "next/font/google";

import type { JSX } from "react";
import type { Metadata } from "next";
import type { RootLayoutProps } from "@/types/props";

import { ProviderRedux } from "@/redux/providers";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Nexdrive",
    template: "%s | Nexdrive",
  },
  description: "Nexdrive is a self-hosted personal cloud file manager built with Next.js 16.",
  keywords: ["Nexdrive", "file manager", "cloud storage", "file upload", "personal cloud"],
  authors: [{ name: "Diego Libonati" }],
  openGraph: {
    title: {
      default: "Nexdrive",
      template: "%s | Nexdrive",
    },
    description: "Nexdrive is a self-hosted personal cloud file manager built with Next.js 16.",
    siteName: "Nexdrive",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Nexdrive",
      template: "%s | Nexdrive",
    },
    description: "Nexdrive is a self-hosted personal cloud file manager built with Next.js 16.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`flex relative flex-col lg:flex-row h-full min-h-screen w-full ${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <ProviderRedux>{children}</ProviderRedux>
      </body>
    </html>
  );
}

export default RootLayout;
