export interface IFormErrors {
  [key: string]: string;
}

export interface IRegisterInput {
  value: string;
  error: string;
  inputValidationType: 'name' | 'username' | 'password';
}

// export interface IFormState {
//   name: string;
//   username: string;
//   password: string;
//   errors: IFormErrors;
// }

export interface IFormContext {
  formState: IFormState;
  formDispatch: React.Dispatch<IFormAction>;
}

export interface IFormState {
  [key: string]: IRegisterInput;
}

// export type IFormState2 = {
//   [key: string]: string;
// } & {
//   errors: IFormErrors;
// };

// export type IFormPayload = Partial<IFormState>;

export interface IFormPayload {
  key: string;
  value: IRegisterInput;
}

export interface IFormAction {
  type: FormActionType;
  payload: IFormPayload;
}

export enum FormActionType {
  'value' = 'SET_VALUE',
  'error' = 'SET_ERROR',
}

export const InputTypeFormActionTypeAccordance = {
  name: 'SET_NAME',
  username: 'SET_USERNAME',
  password: 'SET_PASSWORD',
};

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

export interface IUserSignUp {
  name: string;
  login: string;
  password: string;
}

export interface IUserSignIn {
  login: string;
  password: string;
}
