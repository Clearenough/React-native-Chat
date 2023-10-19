import {FormActionType, IFormAction, IFormState} from '../@types/common';

export function formValidation(
  formState: IFormState,
  formDispatch: React.Dispatch<IFormAction>,
) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
  const {username, password} = formState;
  let payload = {};
  if (username.length < 6) {
    payload = {
      errors: {
        usernameError: 'username must be at least 6 characters',
      },
    };
  } else {
    payload = {
      errors: {
        usernameError: '',
      },
    };
  }
  console.log(payload);
  formDispatch({
    type: FormActionType.error,
    payload,
  });
  if (!regex.test(password)) {
    payload = {
      errors: {
        passwordError:
          'password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
      },
    };
  } else {
    payload = {
      errors: {
        passwordError: '',
      },
    };
  }
  console.log(payload);
  formDispatch({
    type: FormActionType.error,
    payload,
  });
}
