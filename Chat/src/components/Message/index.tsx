import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import UserListItem from '../UserListItem';

interface Props {
  user: IUser;
  message: IMessage;
  longPressHandler: () => void;
}

function Message({user, message, longPressHandler}: Props) {
  return (
    <Pressable
      style={styles.container}
      onLongPress={() => {
        longPressHandler();
      }}>
      <UserListItem
        username={user.username}
        isUserOnline={false}
        displayOnlineStatus={false}
      />
      <Text>{message.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Message;
