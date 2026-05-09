import type { TypeAlert, User } from "@/types/app";
import type { AlertState } from "@/types/states";

export interface UseAlertStore {
  alert: AlertState;
  handleSetAlert: (type: TypeAlert, message: string, open: boolean) => void;
}

export interface UseForm<T> {
  formState: T;
  onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
  onClearForm: () => void;
}

export interface UseSession<T> {
  session: T | null;
}

export interface UseUserStore {
  user: User | null;
  handleSetUser: (user: User | null) => void;
}
