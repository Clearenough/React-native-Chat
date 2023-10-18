import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import InputText from '../../components/common/InputText';
import RegisterButton from '../../components/common/RegisterButton';

function RegistrationScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.text}>Register</Text>
          <InputText
            placeholder="Name"
            isText={name ? true : false}
            handler={setName}
          />
          <InputText
            placeholder="Username"
            isText={username ? true : false}
            handler={setUsername}
          />
          <InputText
            placeholder="Password"
            isText={password ? true : false}
            handler={setPassword}
          />
          <RegisterButton
            title="Register"
            textStyle={textStyle}
            viewStyle={viewStyle}
            handler={() => null}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default RegistrationScreen;
