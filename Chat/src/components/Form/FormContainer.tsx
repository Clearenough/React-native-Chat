import React from 'react';
import Form from '.';
import FormContextProvider from '../../contexts/FormContext';

interface Props {
  children: React.ReactNode;
  buttonText: string;
}

function FormContainer({children, buttonText}: Props) {
  return (
    <FormContextProvider>
      <Form buttonText={buttonText}>{children}</Form>
    </FormContextProvider>
  );
}

export default FormContainer;
