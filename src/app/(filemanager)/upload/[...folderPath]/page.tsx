import type { JSX } from "react";
import type { Metadata } from "next";
import type { UploadPageProps } from "@/types/props";

import FormUpload from "@/components/Forms/FormUpload/FormUpload";

export const metadata: Metadata = {
  title: "Upload",
};

async function UploadPage({ params }: UploadPageProps): Promise<JSX.Element> {
  const { folderPath } = await params;
  return (
    <section className="flex items-center justify-center w-full h-[calc(100vh_-_10rem)] lg:h-[calc(100vh_-_6rem)]">
      <FormUpload path={`/${folderPath.join("/")}`}></FormUpload>
    </section>
  );
}

export default UploadPage;
