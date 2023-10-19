import React from 'react';
import Form from '.';
import FormContextProvider from '../../contexts/FormContext';

function FormContainer() {
  return (
    <FormContextProvider>
      <Form />
    </FormContextProvider>
  );
}

export default FormContainer;
