import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';

import {userEndpoints} from '../../@constants/apiEndpoint';
import {
  ChatRoomNavigationProp,
  IChatCreate,
  IOnlineUser,
  ISocketPayload,
  IUser,
  SocketActionType,
} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';

import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {createChat} from '../../store/slices/chatSlice';
import UserListItem from '../UserListItem';

function UsersList() {
  const dispatch = useAppDispatch();
  const {socketState, dispatch: contextDispatch} = useContext(SocketContext);
  const user = useAppSelector(state => state.user);
  const navigation = useNavigation<ChatRoomNavigationProp>();

  const [users, setUsers] = useState<IUser[]>([]);
  // const [onlineUsers, setOnlineUsers] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(userEndpoints.getUsers);
      const data: IUser[] = await response.json();
      setUsers(data.filter(item => item._id !== user._id));
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    socketState.socket &&
      socketState.socket.on('getOnlineUsers', (res: IOnlineUser[]) => {
        const payload: ISocketPayload = {
          onlineUsers: res,
        };
        contextDispatch({
          type: SocketActionType.users,
          payload,
        });
      });
  }, [contextDispatch, socketState.socket]);

  const onPress = useCallback(
    async (_id: string) => {
      const newChat: IChatCreate = {
        firstId: user._id,
        secondId: _id,
      };
      await dispatch(createChat(newChat));
      navigation.navigate('ChatRoom', {
        secondUserId: _id,
      });
    },
    [dispatch, navigation, user._id],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IUser>) => {
      const isUserOnline = socketState.onlineUsers.some(
        u => u.userId === item._id,
      );
      return (
        <UserListItem
          username={item.username}
          handler={() => onPress(item._id)}
          displayOnlineStatus={isUserOnline}
          isUserOnline={isUserOnline}
          onlineStatusDisplayType={'mark'}
        />
      );
    },

    [onPress, socketState],
  );

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={users}
        keyExtractor={item => item._id}
        ListFooterComponentStyle={styles.container}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default UsersList;
