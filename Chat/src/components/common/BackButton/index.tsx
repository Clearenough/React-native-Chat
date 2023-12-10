import React from 'react';
import {Pressable} from 'react-native';
import BackSVG from '../../../@svg/BackSVG';

interface Props {
  handler: () => void;
}

function BackButton({handler}: Props) {
  return (
    <Pressable onPress={handler}>
      <BackSVG color={'white'} />
    </Pressable>
  );
}

export default BackButton;
