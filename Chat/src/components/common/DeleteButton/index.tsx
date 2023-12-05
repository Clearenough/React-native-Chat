import React from 'react';
import {Pressable} from 'react-native';
import DeleteSVG from '../../../@svg/DeleteSVG';

interface Props {
  onPressHandler: () => void;
}

function DeleteButton({onPressHandler}: Props) {
  return (
    <Pressable onPress={onPressHandler}>
      <DeleteSVG color="black" />
    </Pressable>
  );
}

export default DeleteButton;
