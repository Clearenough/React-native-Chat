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
    marginTop: 84,
    maxWidth: 343,
  },
  text: {
    fontSize: 40,
  },
  textStyle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.032,
    color: '#000',
    paddingVertical: 12,
  },
  viewStyle: {
    width: 343,
    marginTop: 40,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#29CCBB',
  },
});

export default Form;
