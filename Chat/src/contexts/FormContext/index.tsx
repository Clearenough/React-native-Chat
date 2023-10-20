import React, {useReducer} from 'react';
import {IFormContext, IFormState} from '../../@types/common';
import formReducer from './reducer';

interface Props {
  children: React.ReactNode;
}

const initValue: IFormState = {};

export const FormContext = React.createContext<IFormContext>({
  formState: initValue,
  formDispatch: () => undefined,
});

function FormContextProvider({children}: Props) {
  const [state, dispatch] = useReducer(formReducer, initValue);

  return (
    <FormContext.Provider
      value={{
        formState: state,
        formDispatch: dispatch,
      }}>
      {children}
    </FormContext.Provider>
  );
}

export default FormContextProvider;
