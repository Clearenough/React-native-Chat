import React from 'react';
import {Pressable} from 'react-native';
import DropoutSVG from '../../../@svg/DropoutSVG';

interface Props {
  handler: () => void;
}

function DropoutButton({handler}: Props) {
  return (
    <Pressable onPress={handler}>
      <DropoutSVG />
    </Pressable>
  );
}

export default DropoutButton;
