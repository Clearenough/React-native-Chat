import {
  FormActionType,
  IFormAction,
  IFormPayload,
  IFormState,
} from '../@types/common';

export function formValidation(
  formState: IFormState,
  formDispatch: React.Dispatch<IFormAction>,
): boolean {
  console.log(formState);
  for (const key in formState) {
    let payload: IFormPayload;
    let error: string = '';
    const {value, inputValidationType} = formState[key];
    if (inputValidationType === 'name') {
      if (!value.length) {
        error = 'the input field must not be empty';
      }
    }
    if (inputValidationType === 'username') {
      error = usernameValidation(value, 6);
    }
    if (inputValidationType === 'password') {
      error = passwordValidation(value);
    }
    payload = {
      key,
      value: {
        value,
        error,
        inputValidationType,
      },
    };
    formDispatch({
      type: FormActionType.error,
      payload,
    });
  }
  console.log(formState, 'after dispatch');
  const isError = isFormValidationFailed(formState);
  console.log(isError, 'isError');
  return isError;
}

export function isFormValidationFailed(formState: IFormState) {
  for (const key in formState) {
    if (formState[key].error !== '' || formState[key].value === '') {
      return true;
    }
  }
  return false;
}

export function usernameValidation(
  username: string,
  minimumLength: number,
): string {
  if (username.length < minimumLength) {
    return `username must be at least ${minimumLength} characters`;
  }
  return '';
}

export function passwordValidation(password: string): string {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
  if (!regex.test(password)) {
    return 'password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special symbol';
  }
  return '';
}

export const validation = {
  username: usernameValidation,
  password: passwordValidation,
  name: (name: string) => {
    if (!name.length) {
      return 'the input field must not be empty';
    }
    return '';
  },
};
