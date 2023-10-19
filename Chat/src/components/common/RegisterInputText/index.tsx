import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FormActionType} from '../../../@types/common';
import {FormContext} from '../../../contexts/FormContext';

interface Props {
  placeholder: string;
  inputType: 'name' | 'username' | 'password';
}

function RegisterInputText({placeholder, inputType}: Props) {
  const {formState, formDispatch} = useContext(FormContext);
  const animation = useSharedValue(0);
  const transform = useAnimatedStyle(() => {
    const translateY = interpolate(animation.value, [0, 1], [0, -25]);
    const translateX = interpolate(animation.value, [0, 1], [0, -10]);
    return {
      transform: [{translateX}, {translateY}],
    };
  });

  function onFocus() {
    animation.value = withTiming(1, {
      duration: 150,
    });
  }

  function onBlur() {
    if (formState[inputType]) {
      return;
    }
    animation.value = withTiming(0, {
      duration: 150,
    });
  }

  function onChangeText(text: string) {
    formDispatch({
      type: FormActionType[inputType],
      payload: {[inputType]: text},
    });
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.labelContainer, transform]}>
        <Text>{placeholder}</Text>
      </Animated.View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={inputType === 'password'}
      />
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
