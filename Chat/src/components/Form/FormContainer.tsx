import React from 'react';
import Form from '.';
import FormContextProvider from '../../contexts/FormContext';

interface Props {
  children: React.ReactNode;
  buttonText: string;
  additionalButton?: React.ReactNode;
}

function FormContainer({children, buttonText, additionalButton}: Props) {
  return (
    <FormContextProvider>
      <Form buttonText={buttonText} additionalButton={additionalButton}>
        {children}
      </Form>
    </FormContextProvider>
  );
}

export default FormContainer;
