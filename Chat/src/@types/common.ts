export interface IFormErrors {
  nameError?: string;
  usernameError?: string;
  passwordError?: string;
}

export interface IFormState {
  name: string;
  username: string;
  password: string;
  errors: IFormErrors;
}

export interface IFormContext {
  formState: IFormState;
  formDispatch: React.Dispatch<IFormAction>;
}

export type IFormPayload = Partial<IFormState>;

export interface IFormAction {
  type: FormActionType;
  payload: IFormPayload;
}

export enum FormActionType {
  'name' = 'SET_NAME',
  'username' = 'SET_USERNAME',
  'password' = 'SET_PASSWORD',
  'error' = 'SET_ERROR',
}

export const InputTypeFormActionTypeAccordance = {
  name: 'SET_NAME',
  username: 'SET_USERNAME',
  password: 'SET_PASSWORD',
};
