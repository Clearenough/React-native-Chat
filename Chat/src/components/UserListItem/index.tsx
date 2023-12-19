import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import UserIcon from '../common/UserIcon';

interface Props {
  username: string;
  isUserOnline: boolean;
  displayOnlineStatus: boolean;
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
          <Text style={styles.text}>{username}</Text>
          <Text style={styles.text}>Online</Text>
        </View>
      );
    }
    return (
      <View style={styles.onlineText}>
        <Text style={styles.text}>{username}</Text>
        <Text style={styles.text}>Offline</Text>
      </View>
    );
  }

  return (
    <Pressable style={styles.container} onPress={handler}>
      <UserIcon
        username={username}
        userStyles={styles.user}
        textStyles={styles.text}
      />
      <Text style={styles.usernameText} numberOfLines={1}>
        {username}
      </Text>
      {displayOnlineStatus && onlineStatusDisplay()}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  user: {
    backgroundColor: 'purple',
    borderRadius: 100,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  usernameText: {
    maxWidth: 44,
    overflow: 'hidden',
    color: '#C6C7CD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 14,
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
