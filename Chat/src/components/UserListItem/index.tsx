import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  username: string;
}

function UserListItem({username}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{username.slice(0, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default UserListItem;
