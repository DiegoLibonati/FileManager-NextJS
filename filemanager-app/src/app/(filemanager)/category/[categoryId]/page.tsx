import { SectionFiles } from "@/containers/category/SectionFiles/SectionFiles";
import { CategoryPageProps } from "../../../../../next-env";

export default function Category({ params }: CategoryPageProps): JSX.Element {
  return <SectionFiles idCategory={params.categoryId as string}></SectionFiles>;
}
