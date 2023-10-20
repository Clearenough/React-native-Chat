import {FormActionType, IFormAction, IFormState} from '../../@types/common';

export default function formReducer(state: IFormState, action: IFormAction) {
  const {key, value: registerInputValue} = action.payload;
  if (action.type === FormActionType.value) {
    return {
      ...state,
      [`${key}`]: {
        ...registerInputValue,
        value: registerInputValue.value,
      },
    };
  }
  if (action.type === FormActionType.error) {
    return {
      ...state,
      [`${key}`]: {
        ...registerInputValue,
        error: registerInputValue.error,
      },
    };
  }
  return state;
}
