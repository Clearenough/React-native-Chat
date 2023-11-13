import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Text,
} from 'react-native';
import {IUserSignUp, RootStackParamList} from '../../@types/common';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RegisterButton from '../../components/common/RegisterButton';
import RegisterInputText from '../../components/common/RegisterInputText';
import FormContainer from '../../components/Form/FormContainer';
import {useAppDispatch} from '../../hooks/storeHooks';
import {userAuthentication} from '../../store/slices/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

function RegistrationScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  function handler() {
    navigation.navigate('Login');
  }

  function formButtonHandler<T>(payload: T) {
    dispatch(userAuthentication(payload as IUserSignUp));
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
          buttonText="Register"
          formButtonHandler={formButtonHandler}
          additionalButton={
            <RegisterButton
              title={'have an account? Sign in'}
              textStyle={styles.textStyle}
              viewStyle={styles.viewStyle}
              handler={handler}
            />
          }>
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
    backgroundColor: 'white',
  },
  text: {
    fontSize: 40,
  },
  textStyle: {},
  viewStyle: {},
});

export default RegistrationScreen;
