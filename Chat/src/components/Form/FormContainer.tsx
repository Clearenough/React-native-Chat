import React from 'react';
import Form from '.';
import FormContextProvider from '../../contexts/FormContext';

interface Props {
  children: React.ReactNode;
  formButtonHandler: <T>(payload: T) => void;
  buttonText: string;
  additionalButton?: React.ReactNode;
}

function FormContainer({
  children,
  formButtonHandler,
  buttonText,
  additionalButton,
}: Props) {
  return (
    <FormContextProvider>
      <Form
        buttonText={buttonText}
        additionalButton={additionalButton}
        formButtonHandler={formButtonHandler}>
        {children}
      </Form>
    </FormContextProvider>
  );
}

export default FormContainer;
