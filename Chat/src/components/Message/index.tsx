import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import UserListItem from '../UserListItem';

interface Props {
  user: IUser;
  message: IMessage;
}

function Message({user, message}: Props) {
  return (
    <View style={styles.container}>
      <UserListItem username={user.username} />
      <Text>{message.text}</Text>
    </View>
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
