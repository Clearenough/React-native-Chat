import React from 'react';
import {Pressable} from 'react-native';
import ProfileSVG from '../../../@svg/ProfileSVG';

interface Props {
  handler: () => void;
}

function DropoutButton({handler}: Props) {
  return (
    <Pressable onPress={handler}>
      <ProfileSVG />
    </Pressable>
  );
}

export default DropoutButton;
