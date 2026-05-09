import { Suspense } from "react";

import type { JSX } from "react";
import type { Metadata } from "next";
import type { CategoryPageProps } from "@/types/props";

import { categoryTitles } from "@/lib/categories";

import SectionFilesSkeleton from "@/components/Skeletons/SectionFilesSkeleton/SectionFilesSkeleton";

import SectionFiles from "@/containers/category/SectionFiles/SectionFiles";

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;
  return {
    title: categoryTitles[categoryId] ?? "Category",
  };
}

async function CategoryPage({ params }: CategoryPageProps): Promise<JSX.Element> {
  const { categoryId } = await params;
  return (
    <Suspense fallback={<SectionFilesSkeleton></SectionFilesSkeleton>}>
      <SectionFiles idCategory={categoryId}></SectionFiles>
    </Suspense>
  );
}

export default CategoryPage;
