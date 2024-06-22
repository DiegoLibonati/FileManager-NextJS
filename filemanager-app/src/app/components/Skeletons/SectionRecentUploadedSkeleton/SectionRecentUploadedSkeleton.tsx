export const SectionRecentUploadedSkeleton = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start justify-center w-full h-auto mt-8">
      <article className="h-6 w-36 bg-gray-200 animate-pulse lg:h-7 lg:w-44"></article>
      <article className="w-full h-24 p-4 bg-gray-200 animate.pulse rounded-lg lg:h-32 mt-2"></article>
    </section>
  );
};
