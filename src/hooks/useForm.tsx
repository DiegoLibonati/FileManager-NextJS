import { useState } from "react";

import type { ChangeEventHandler } from "react";
import type { UseForm } from "@/types/hooks";

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
