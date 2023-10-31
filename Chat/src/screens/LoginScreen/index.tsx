import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RegisterButton from '../../components/common/RegisterButton';
import RegisterInputText from '../../components/common/RegisterInputText';
import FormContainer from '../../components/Form/FormContainer';
import {RootStackParamList} from '../../@types/common';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({navigation}: Props) {
  function handler() {
    navigation.navigate('Register');
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FormContainer
          buttonText="Sign In"
          formButtonHandler={() => null}
          additionalButton={
            <RegisterButton
              title={"don't have an account? Sign up"}
              textStyle={styles.textStyle}
              viewStyle={styles.viewStyle}
              handler={handler}
            />
          }>
          <Text style={styles.text}>Sign In</Text>
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
    backgroundColor: 'white',
  },
  text: {
    fontSize: 40,
  },
  textStyle: {},
  viewStyle: {},
});

export default LoginScreen;
