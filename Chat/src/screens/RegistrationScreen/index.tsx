import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Text,
  View,
} from 'react-native';
import {IUserSignUp, RootStackParamList} from '../../@types/common';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RegisterButton from '../../components/common/RegisterButton';
import RegisterInputText from '../../components/common/RegisterInputText';
import FormContainer from '../../components/Form/FormContainer';
import {useAppDispatch} from '../../hooks/storeHooks';
import {userAuthentication} from '../../store/slices/user/userSlice';

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
          buttonText="Continue"
          formButtonHandler={formButtonHandler}
          additionalButton={
            <View style={styles.viewStyle}>
              <Text style={styles.textStyle}>Already have an account?</Text>
              <RegisterButton
                title={'Sign in'}
                textStyle={styles.transitionButtonText}
                viewStyle={styles.transitionButtonView}
                handler={handler}
              />
            </View>
          }>
          <Text style={styles.text}>Sign up</Text>
          <View style={styles.inputsContainer}>
            <RegisterInputText
              placeholder={'Enter your name'}
              inputValidationType={'name'}
              inputKey={'name'}
              secure={false}
              containerStyles={styles.containerStyles}
              labelContainerStyles={styles.labelContainerStyles}
              labelTextStyles={styles.labelTextStyles}
              inputStyles={styles.inputStyles}
              inputContainerStyles={styles.inputContainerStyles}
              errorTextStyles={styles.errorTextStyles}
            />
            <RegisterInputText
              placeholder={'Enter your username'}
              inputValidationType={'username'}
              inputKey={'username'}
              secure={false}
              containerStyles={styles.containerStyles}
              labelContainerStyles={styles.labelContainerStyles}
              labelTextStyles={styles.labelTextStyles}
              inputStyles={styles.inputStyles}
              inputContainerStyles={styles.inputContainerStyles}
              errorTextStyles={styles.errorTextStyles}
            />
            <RegisterInputText
              placeholder={'Password'}
              inputValidationType={'password'}
              inputKey={'password'}
              secure={true}
              containerStyles={styles.containerStyles}
              labelContainerStyles={styles.labelContainerStyles}
              labelTextStyles={styles.labelTextStyles}
              inputStyles={styles.inputStyles}
              inputContainerStyles={styles.inputContainerStyles}
              errorTextStyles={styles.errorTextStyles}
            />
          </View>
        </FormContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 56,
    color: '#F9F9F9',
  },
  inputsContainer: {
    paddingTop: 90,
    gap: 40,
  },
  containerStyles: {
    borderRadius: 4,
    borderColor: '#A7A8B0',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  labelContainerStyles: {
    position: 'absolute',
    top: 14,
    left: 16,
    backgroundColor: '#050833',
  },
  labelTextStyles: {
    color: '#A7A8B0',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 19.6,
  },
  inputStyles: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
  },
  inputContainerStyles: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  textStyle: {
    color: '#C6C7CD',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
  },
  viewStyle: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 16,
    bottom: 56,
  },
  transitionButtonText: {
    color: '#29CCBB',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19.6,
  },
  transitionButtonView: {},
  errorTextStyles: {
    color: '#FF886C',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16.8,
  },
});

export default RegistrationScreen;
