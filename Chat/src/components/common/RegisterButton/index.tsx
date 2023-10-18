import React from 'react';
import {Pressable, Text, TextStyle, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  title: string;
  textStyle: TextStyle;
  viewStyle: ViewStyle;
  handler: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function RegisterButton({title, textStyle, viewStyle, handler}: Props) {
  const animation = useSharedValue(1);

  function onPress() {
    animation.value = withSequence(
      withTiming(0.5, {
        duration: 100,
      }),
      withTiming(1, {
        duration: 100,
      }),
    );
    handler();
  }

  return (
    <AnimatedPressable
      style={[viewStyle, {opacity: animation}]}
      onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </AnimatedPressable>
  );
}

export default RegisterButton;
