import React from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';

interface Props {
  username: string;
  userStyles: ViewStyle;
  textStyles: TextStyle;
}

function UserIcon({username, userStyles, textStyles}: Props) {
  return (
    <View style={userStyles}>
      <Text style={textStyles}>{username.slice(0, 2)}</Text>
    </View>
  );
}

export default UserIcon;
