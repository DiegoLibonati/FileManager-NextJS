export const SectionCategoriesSkeleton = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start justify-center w-full h-auto mt-8">
      <div className="w-20 h-6 bg-gray-200 animate-pulse lg:h-7 lg:w-24"></div>

      <article className="grid grid-cols-4 gap-2 grid-rows-1 w-full h-auto mt-4 lg:h-32">
        <div className="flex flex-col items-center justify-center w-full h-auto">
          <div className="h-12 w-full lg:h-32 rounded-lg lg:p-4 bg-gray-200 animate-pulse"></div>
          <div className="w-7 h-4 mt-2 lg:hidden bg-gray-200 animate-pulse"></div>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-auto">
          <div className="h-12 w-full lg:h-32 rounded-lg lg:p-4 bg-gray-200 animate-pulse"></div>
          <div className="w-7 h-4 mt-2 lg:hidden bg-gray-200 animate-pulse"></div>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-auto">
          <div className="h-12 w-full lg:h-32 rounded-lg lg:p-4 bg-gray-200 animate-pulse"></div>
          <div className="w-7 h-4 mt-2 lg:hidden bg-gray-200 animate-pulse"></div>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-auto">
          <div className="h-12 w-full lg:h-32 rounded-lg lg:p-4 bg-gray-200 animate-pulse"></div>
          <div className="w-7 h-4 mt-2 lg:hidden bg-gray-200 animate-pulse"></div>
        </div>
      </article>
    </section>
  );
};
