import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FormActionType, IFormPayload} from '../../../@types/common';
import {FormContext} from '../../../contexts/FormContext';

interface Props {
  placeholder: string;
  inputValidationType: 'name' | 'username' | 'password';
  inputKey: string;
  secure?: boolean;
}

function RegisterInputText({
  placeholder,
  inputValidationType,
  inputKey,
  secure,
}: Props) {
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
    const payload: IFormPayload = {
      key: inputKey,
      value: {
        value: text,
        error: '',
        inputValidationType,
      },
    };
    formDispatch({
      type: FormActionType.value,
      payload,
    });
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.labelContainer, transform]}>
        <Text>{placeholder}</Text>
      </Animated.View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={secure}
        />
        {formState[inputKey]?.error && <Text>{formState[inputKey].error}</Text>}
      </View>
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
});

export default RegisterInputText;
