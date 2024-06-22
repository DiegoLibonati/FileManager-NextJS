import { ButtonCreateProps } from "@/app/lib/entities";

export const ButtonCreate = ({
  children,
  className,
  onClick,
}: ButtonCreateProps): JSX.Element => {
  return (
    <button
      className={`p-4 bg-white text-primary rounded-lg self-end ${className}`}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
