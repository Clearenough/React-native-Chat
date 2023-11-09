import React from 'react';
import {Pressable} from 'react-native';
import DeleteSVG from '../../../@svg/DeleteSVG';

function DeleteButton() {
  return (
    <Pressable>
      <DeleteSVG color="black" />
    </Pressable>
  );
}

export default DeleteButton;
