import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import PasswordIsInvisibleSVG from '../../../@svg/PasswordIsInvisibleSVG';
import PasswordIsVisibleSVG from '../../../@svg/PasswordIsVisibleSVG';

interface Props {
  handler: () => void;
  isPasswordVisible: boolean;
  containerStyle: StyleProp<ViewStyle>;
}

function ShowPasswordButton({
  handler,
  isPasswordVisible = false,
  containerStyle,
}: Props) {
  return (
    <Pressable onPress={handler} style={containerStyle}>
      {isPasswordVisible ? (
        <PasswordIsVisibleSVG />
      ) : (
        <PasswordIsInvisibleSVG />
      )}
    </Pressable>
  );
}

export default ShowPasswordButton;
