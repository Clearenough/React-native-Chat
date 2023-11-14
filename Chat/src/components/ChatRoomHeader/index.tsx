import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChatRoomNavigationProp, IUser} from '../../@types/common';
import BackButton from '../common/BackButton';
import DeleteButton from '../common/DeleteButton';
import UserListItem from '../UserListItem';

interface Props {
  user: IUser;
}

function ChatRoomHeader({user}: Props) {
  const navigation = useNavigation<ChatRoomNavigationProp>();

  function backHandler() {
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <BackButton handler={backHandler} />
      <View style={styles.userContainer}>
        <UserListItem username={user.username} />
        <Text>{user.username}</Text>
      </View>
      <DeleteButton />
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
