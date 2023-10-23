import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Text,
} from 'react-native';
import RegisterInputText from '../../components/common/RegisterInputText';
import FormContainer from '../../components/Form/FormContainer';

function RegistrationScreen() {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FormContainer buttonText="Register">
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
        </FormContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 40,
  },
});

export default RegistrationScreen;
