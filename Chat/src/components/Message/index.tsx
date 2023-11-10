import React from 'react';
import {Text, View} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import UserListItem from '../UserListItem';

interface Props {
  user: IUser;
  message: IMessage;
}

function Message({user, message}: Props) {
  return (
    <View>
      <UserListItem username={user.username} />
      <Text>{message.text}</Text>
    </View>
  );
}

export default Message;
