import { ChangeEventHandler, useState } from "react";

type UseForm<T> = {
  formState: T;
  onChangeInput: ChangeEventHandler<HTMLInputElement>;
  onClearForm: () => void;
};

export const useForm = <T,>(initialValue: T): UseForm<T> => {
  const [formState, setFormState] = useState<T>(initialValue);

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleClearForm = (): void => {
    setFormState(initialValue);
    return;
  };

  return {
    formState: formState,
    onChangeInput: handleChangeInput,
    onClearForm: handleClearForm,
  };
};
