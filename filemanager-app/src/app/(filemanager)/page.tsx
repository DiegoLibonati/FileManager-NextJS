import { SectionChart } from "@/containers/home/SectionChart/SectionChart";
import { SectionCategories } from "@/containers/home/SectionCategories/SectionCategories";
import { SectionRecentUploaded } from "@/containers/home/SectionRecentUploaded/SectionRecentUploaded";

export default function Home(): JSX.Element {
  return (
    <>
      <SectionChart></SectionChart>
      <SectionCategories></SectionCategories>
      <SectionRecentUploaded></SectionRecentUploaded>
    </>
  );
}
