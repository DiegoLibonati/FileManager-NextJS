import type { JSX } from "react";

import { FileManagerService } from "@/server/services/filemanager.service";

import CardCategory from "@/components/Cards/CardCategory/CardCategory";
import Heading from "@/components/Headers/Heading/Heading";

const SectionCategories = (): JSX.Element => {
  const categories = FileManagerService.getCategories();

  return (
    <section className="flex flex-col items-start justify-center w-full h-auto mt-8">
      <Heading className="font-semibold text-base lg:text-xl" element="h2">
        Category
      </Heading>

      <article className="grid grid-cols-4 gap-2 grid-rows-1 w-full h-auto mt-4 lg:h-32">
        {categories.map((category) => {
          return (
            <CardCategory
              key={category.id}
              idCategory={category.id}
              categoryName={category.name}
              bgColor={category.background_color}
              color={category.icon_color}
              href={`/category/${category.id}`}
            ></CardCategory>
          );
        })}
      </article>
    </section>
  );
};

export default SectionCategories;
