import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  username: string;
  isUserOnline: boolean;
  displayOnlineStatus?: boolean;
  onlineStatusDisplayType?: 'mark' | 'text';
  handler?: () => void;
}

function UserListItem({
  username,
  isUserOnline,
  displayOnlineStatus = false,
  onlineStatusDisplayType = 'mark',
  handler,
}: Props) {
  function onlineStatusDisplay() {
    if (isUserOnline) {
      if (onlineStatusDisplayType === 'mark') {
        return <View style={styles.online} />;
      }
      return (
        <View style={styles.onlineText}>
          <Text>{username}</Text>
          <Text>Online</Text>
        </View>
      );
    }
    return (
      <View style={styles.onlineText}>
        <Text>{username}</Text>
        <Text>Offline</Text>
      </View>
    );
  }

  return (
    <Pressable style={styles.container} onPress={handler}>
      <View style={styles.user}>
        <Text style={styles.text}>{username.slice(0, 2)}</Text>
      </View>
      {displayOnlineStatus && onlineStatusDisplay()}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  user: {
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
  online: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    right: 0,
    bottom: 0,
  },
  onlineText: {
    justifyContent: 'center',
  },
});

export default UserListItem;
