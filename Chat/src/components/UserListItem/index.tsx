import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface Props {
  username: string;
  handler?: () => void;
}

function UserListItem({username, handler}: Props) {
  return (
    <Pressable style={styles.container} onPress={handler}>
      <Text style={styles.text}>{username.slice(0, 2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    borderRadius: 100,
    height: 40,
    width: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default UserListItem;
