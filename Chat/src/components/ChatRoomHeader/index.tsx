import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {IUser} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';
import BackButton from '../common/BackButton';
import UserListItem from '../UserListItem';

interface Props {
  user: IUser;
  additionalButton: React.JSX.Element;
  backButtonHandler: () => void;
  userListItemHandler?: () => void;
}

function ChatRoomHeader({
  user,
  additionalButton,
  backButtonHandler,
  userListItemHandler,
}: Props) {
  const {socketState} = useContext(SocketContext);

  return (
    <View style={styles.container}>
      <BackButton handler={backButtonHandler} />
      <View style={styles.userContainer}>
        <UserListItem
          username={user.username}
          handler={userListItemHandler}
          displayOnlineStatus={true}
          isUserOnline={socketState.onlineUsers.some(
            u => u.userId === user._id,
          )}
          onlineStatusDisplayType="text"
        />
      </View>
      {additionalButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatRoomHeader;
