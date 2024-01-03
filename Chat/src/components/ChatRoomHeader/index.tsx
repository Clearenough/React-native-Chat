import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ChatRoomNavigationProp, IUser} from '../../@types/common';
import BackButton from '../common/BackButton';
import UserIcon from '../common/UserIcon';

interface Props {
  user: IUser;
  additionalButton?: React.JSX.Element;
  backButtonHandler: () => void;
  userListItemHandler?: () => void;
}

function ChatRoomHeader({user, additionalButton, backButtonHandler}: Props) {
  const navigation = useNavigation<ChatRoomNavigationProp>();

  function onPress() {
    navigation.navigate('Profile', {
      userId: user._id,
    });
  }

  return (
    <View style={styles.container}>
      <BackButton handler={backButtonHandler} />
      <Pressable style={styles.userContainer} onPress={onPress}>
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
      </Pressable>
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
