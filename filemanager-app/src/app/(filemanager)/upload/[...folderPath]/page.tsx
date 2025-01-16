import { FormUpload } from "@/app/components/Forms/FormUpload/FormUpload";

interface UploadPageProps {
  params: {
    folderPath: string[];
  };
}

export default function UploadPage({ params }: UploadPageProps): JSX.Element {
  return (
    <section className="flex items-center justify-center w-full h-[calc(100vh_-_10rem)] lg:h-[calc(100vh_-_6rem)]">
      <FormUpload path={`/${params.folderPath.join("/")}`}></FormUpload>
    </section>
  );
}
