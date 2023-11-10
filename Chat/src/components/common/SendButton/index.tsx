import React from 'react';
import {Pressable} from 'react-native';
import SendSVG from '../../../@svg/SendSVG';

interface Props {
  handler: () => void;
}

function SendButton({handler}: Props) {
  return (
    <Pressable onPress={handler}>
      <SendSVG />
    </Pressable>
  );
}

export default SendButton;
