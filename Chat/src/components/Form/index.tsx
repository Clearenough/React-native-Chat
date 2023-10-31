import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';
import {FormContext} from '../../contexts/FormContext';
import {formValidation} from '../../helpers/formValidation';
import RegisterButton from '../common/RegisterButton';

interface Props {
  children: React.ReactNode;
  formButtonHandler: <T>(payload: T) => void;
  buttonText: string;
  additionalButton?: React.ReactNode;
}

function Form({
  children,
  formButtonHandler,
  buttonText,
  additionalButton,
}: Props) {
  const {formState, formDispatch} = useContext(FormContext);

  function handler() {
    const isError = formValidation(formState, formDispatch);
    if (isError) {
      return;
    }
    let payload = {};
    for (const key in formState) {
      payload = {
        ...payload,
        [key]: formState[key].value,
      };
    }
    formButtonHandler(payload);
  }

  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      {children}
      <RegisterButton
        title={buttonText}
        textStyle={styles.textStyle}
        viewStyle={styles.viewStyle}
        handler={handler}
      />
      {additionalButton}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  text: {
    fontSize: 40,
  },
  textStyle: {
    fontSize: 20,
    padding: 10,
    color: '#FFDDE2',
  },
  viewStyle: {
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#DE369D',
  },
});

export default Form;
