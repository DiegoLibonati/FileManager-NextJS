export const FolderListWithActionsSkeleton = (): JSX.Element => {
  return (
    <section className="grid grid-cols-1 gap-2 mt-2 lg:grid-cols-3">
      <article className="w-full h-24 p-4 bg-gray-200 animate.pulse rounded-lg lg:h-32"></article>
      <article className="w-full h-24 p-4 bg-gray-200 animate.pulse rounded-lg lg:h-32"></article>
      <article className="w-full h-24 p-4 bg-gray-200 animate.pulse rounded-lg lg:h-32"></article>
      <article className="w-full h-24 p-4 bg-gray-200 animate.pulse rounded-lg lg:h-32"></article>
    </section>
  );
};
