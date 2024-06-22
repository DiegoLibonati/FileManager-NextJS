import { ButtonUpgrade } from "@/components/Buttons/ButtonUpgrade/ButtonUpgrade";
import { Paragraph } from "@/components/Paragraph/Paragraph";
import { GiUpgrade } from "react-icons/gi";

export const SectionUpgradePlan = (): JSX.Element => {
  return (
    <section className="flex flex-row items-center justify-start relative bg-primary p-4 rounded-lg mt-8">
      <GiUpgrade className="fill-secondary text-4xl"></GiUpgrade>

      <article className="flex flex-col ml-4">
        <Paragraph className="text-white text-sm">Unlimited storage</Paragraph>
        <Paragraph className="text-white text-base">$ 5 / mo</Paragraph>
      </article>

      <ButtonUpgrade></ButtonUpgrade>
    </section>
  );
};
