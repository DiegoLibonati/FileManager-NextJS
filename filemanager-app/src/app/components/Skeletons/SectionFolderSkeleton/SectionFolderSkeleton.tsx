export const SectionFolderSkeleton = () => {
  return (
    <section className="w-full h-auto">
      <article className="grid grid-cols-1 gap-2 mt-2 lg:grid-cols-3">
        <div className="w-full h-24 p-4 bg-gray-200 animate.pulse rounded-lg lg:h-32"></div>
        <div className="w-full h-24 p-4 bg-gray-200 animate.pulse rounded-lg lg:h-32"></div>
      </article>

      <article className="grid grid-cols-1 gap-2 mt-2 lg:grid-cols-3">
        <div className="w-full h-24 p-4 bg-gray-200 animate.pulse rounded-lg lg:h-32"></div>
      </article>
    </section>
  );
};
