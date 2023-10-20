import React, {useContext} from 'react';
import {StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native';
import {FormContext} from '../../contexts/FormContext';
import {formValidation} from '../../helpers/formValidation';
import RegisterButton from '../common/RegisterButton';
import RegisterInputText from '../common/RegisterInputText';

function Form() {
  const {formState, formDispatch} = useContext(FormContext);

  const textStyle: TextStyle = {
    fontSize: 20,
    padding: 10,
    color: '#FFDDE2',
  };
  const viewStyle: ViewStyle = {
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#DE369D',
  };

  function handler() {
    formValidation(formState, formDispatch);
    console.log(formState);
  }

  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <Text style={styles.text}>Registration</Text>
      <RegisterInputText
        placeholder={'Name'}
        inputValidationType={'name'}
        inputKey={'name'}
      />
      <RegisterInputText
        placeholder={'username'}
        inputValidationType={'username'}
        inputKey={'username'}
      />
      <RegisterInputText
        placeholder={'password'}
        inputValidationType={'password'}
        inputKey={'password'}
        secure={true}
      />
      <RegisterButton
        title={'Register'}
        textStyle={textStyle}
        viewStyle={viewStyle}
        handler={handler}
      />
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
});

export default Form;
