import React, {useContext, useEffect, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FormActionType, IFormPayload} from '../../../@types/common';
import {FormContext} from '../../../contexts/FormContext';
import {validation} from '../../../helpers/formValidation';
import ShowPasswordButton from '../ShowPasswordButton';

interface Props {
  placeholder: string;
  inputValidationType: 'name' | 'username' | 'password';
  inputKey: string;
  containerStyles: StyleProp<ViewStyle>;
  labelContainerStyles: StyleProp<ViewStyle>;
  labelTextStyles: StyleProp<TextStyle>;
  inputStyles: StyleProp<TextStyle>;
  inputContainerStyles: StyleProp<ViewStyle>;
  errorTextStyles: StyleProp<TextStyle>;
  secure: boolean;
}

function RegisterInputText({
  placeholder,
  inputValidationType,
  inputKey,
  containerStyles,
  labelContainerStyles,
  labelTextStyles,
  inputStyles,
  inputContainerStyles,
  errorTextStyles,
  secure,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {formState, formDispatch} = useContext(FormContext);
  const animation = useSharedValue(0);
  const transform = useAnimatedStyle(() => {
    const translateY = interpolate(animation.value, [0, 1], [0, -25]);
    const translateX = interpolate(animation.value, [0, 1], [0, -10]);
    return {
      transform: [{translateX}, {translateY}],
    };
  });

  useEffect(() => {
    const payload: IFormPayload = {
      key: inputKey,
      value: {
        value: '',
        error: '',
        inputValidationType,
      },
    };
    formDispatch({
      type: FormActionType.value,
      payload,
    });
  }, [formDispatch, inputKey, inputValidationType]);

  function onFocus() {
    animation.value = withTiming(1, {
      duration: 150,
    });
  }

  function onBlur() {
    if (formState[inputKey] && formState[inputKey].value) {
      return;
    }
    animation.value = withTiming(0, {
      duration: 150,
    });
  }

  function onChangeText(text: string) {
    const error = validation[inputValidationType](text, 8);
    const payload: IFormPayload = {
      key: inputKey,
      value: {
        ...formState[inputKey],
        value: text,
        error,
      },
    };
    formDispatch({
      type: FormActionType.value,
      payload,
    });
  }

  return (
    <View>
      <View style={containerStyles}>
        <Animated.View style={[labelContainerStyles, transform]}>
          <Text style={labelTextStyles}>{placeholder}</Text>
        </Animated.View>
        <View style={inputContainerStyles}>
          <TextInput
            style={inputStyles}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={secure && !isPasswordVisible}
          />
          {inputValidationType === 'password' && secure && (
            <ShowPasswordButton
              isPasswordVisible={isPasswordVisible}
              handler={() => setIsPasswordVisible(!isPasswordVisible)}
              containerStyle={styles.buttonContainer}
            />
          )}
        </View>
      </View>
      {formState[inputKey]?.value && formState[inputKey]?.error && (
        <Text style={errorTextStyles}>{formState[inputKey].error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  labelContainer: {
    position: 'absolute',
    margin: 15,
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: 'white',
  },
  input: {
    padding: 20,
  },
  buttonContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

export default RegisterInputText;
