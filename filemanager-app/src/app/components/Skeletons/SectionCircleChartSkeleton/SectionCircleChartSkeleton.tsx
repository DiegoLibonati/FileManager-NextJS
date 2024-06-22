import React from "react";

export const SectionCircleChartSkeleton = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-auto lg:flex-row">
      <article className="flex flex-col items-start self-start lg:hidden">
        <div className="w-8 h-6 bg-gray-200 animate-pulse mb-1"></div>
        <div className="w-6 h-4 bg-gray-200 animate-pulse mb-1"></div>
      </article>

      <div className="flex items-center justify-center w-48 h-48 rounded-full bg-gray-200 animate-pulse lg:w-64 lg:h-64"></div>

      <article className="flex flex-col items-start self-end lg:hidden">
        <div className="w-8 h-6 bg-gray-200 animate-pulse mb-1"></div>
        <div className="w-6 h-4 bg-gray-200 animate-pulse mb-1"></div>
      </article>

      <article className="hidden flex-col ml-8 lg:flex">
        <div className="flex flex-col items-start self-start mx-2 my-2">
          <div className="w-8 h-6 bg-gray-200 animate-pulse mb-1"></div>
          <div className="w-6 h-4 bg-gray-200 animate-pulse mb-1"></div>
        </div>
        <div className="flex flex-col items-start self-start mx-2 my-2">
          <div className="w-8 h-6 bg-gray-200 animate-pulse mb-1"></div>
          <div className="w-6 h-4 bg-gray-200 animate-pulse mb-1"></div>
        </div>
      </article>
    </section>
  );
};
