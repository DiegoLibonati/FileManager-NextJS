export const SectionFolderListWithoutActionsSkeleton = () => {
  return (
    <section className="flex flex-col items-start justify-center w-full h-auto mt-8">
      <div className="w-14 h-6 bg-gray-200 animate-pulse lg:w-20 lg:h-7"></div>

      <article className="grid grid-cols-1 gap-2 mb-2 w-full lg:grid-cols-3 mt-2">
        <div className="rounded-lg p-4 h-20 w-full bg-gray-200 animate-pulse"></div>
        <div className="rounded-lg p-4 h-20 w-full bg-gray-200 animate-pulse"></div>
        <div className="rounded-lg p-4 h-20 w-full bg-gray-200 animate-pulse"></div>
        <div className="rounded-lg p-4 h-20 w-full bg-gray-200 animate-pulse"></div>
      </article>
    </section>
  );
};
