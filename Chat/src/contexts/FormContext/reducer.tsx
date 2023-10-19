import {FormActionType, IFormAction, IFormState} from '../../@types/common';

export default function formReducer(state: IFormState, action: IFormAction) {
  if (action.type === FormActionType.name) {
    return {
      ...state,
      name: action.payload.name!,
    };
  }
  if (action.type === FormActionType.username) {
    return {
      ...state,
      username: action.payload.username!,
    };
  }
  if (action.type === FormActionType.password) {
    return {
      ...state,
      password: action.payload.password!,
    };
  }
  if (action.type === FormActionType.error) {
    return {
      ...state,
      errors: {
        ...state.errors,
        ...action.payload.errors,
      },
    };
  }
  return state;
}
