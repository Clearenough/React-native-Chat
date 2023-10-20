import {
  FormActionType,
  IFormAction,
  IFormPayload,
  IFormState,
} from '../@types/common';

export function formValidation(
  formState: IFormState,
  formDispatch: React.Dispatch<IFormAction>,
) {
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
}

function usernameValidation(username: string, minimumLength: number): string {
  if (username.length < minimumLength) {
    return `username must be at least ${minimumLength} characters`;
  }
  return '';
}

function passwordValidation(password: string): string {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
  if (!regex.test(password)) {
    return 'password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
  }
  return '';
}
