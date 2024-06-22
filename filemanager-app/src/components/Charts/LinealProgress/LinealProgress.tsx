import { LinealProgressProps } from "../../../../next-env";

export const LinealProgress = ({
  percentage,
}: LinealProgressProps): JSX.Element => {
  return (
    <div className="relative w-full bg-white h-2 rounded-full mt-2 lg:h-8">
      <div
        className="absolute bg-secondary h-2 left-0 rounded-full lg:h-8"
        style={{ width: percentage }}
      ></div>
    </div>
  );
};
