import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IUser} from '../../@types/common';
import BackButton from '../common/BackButton';
import UserIcon from '../common/UserIcon';

interface Props {
  user: IUser;
  additionalButton: React.JSX.Element;
  backButtonHandler: () => void;
  userListItemHandler?: () => void;
}

function ChatRoomHeader({user, additionalButton, backButtonHandler}: Props) {
  return (
    <View style={styles.container}>
      <BackButton handler={backButtonHandler} />
      <View style={styles.userContainer}>
        {/* <UserListItem
          username={user.username}
          handler={userListItemHandler}
          displayOnlineStatus={false}
          isUserOnline={socketState.onlineUsers.some(
            u => u.userId === user._id,
          )}
          onlineStatusDisplayType="text"
        /> */}
        <UserIcon
          username={user.username}
          userStyles={styles.user}
          textStyles={styles.text}
        />
        <Text style={[styles.text, styles.username]}>{user.username}</Text>
      </View>
      {additionalButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 343,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  userContainer: {
    alignItems: 'center',
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
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.6,
  },
  username: {
    fontSize: 12,
  },
});

export default ChatRoomHeader;
