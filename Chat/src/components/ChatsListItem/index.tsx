import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {IUser} from '../../@types/common';
import UserIcon from '../common/UserIcon';

interface Props {
  pressHandler: () => void;
  message: string;
  user: IUser;
}

function ChatsListItem({pressHandler, message, user}: Props) {
  return (
    <Pressable onPress={pressHandler} style={styles.container}>
      <UserIcon
        username={user.username}
        userStyles={styles.user}
        textStyles={styles.userText}
      />
      <View>
        <Text style={styles.userText}>{user.username}</Text>
        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          {message}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    color: '#C6C7CD',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16.8,
  },
  user: {
    backgroundColor: 'purple',
    borderRadius: 100,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.6,
  },
});

export default ChatsListItem;
