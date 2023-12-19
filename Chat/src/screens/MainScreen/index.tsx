import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  IOnlineUser,
  ISocketPayload,
  SocketActionType,
} from '../../@types/common';
import ChatsList from '../../components/ChatsList';
import MainScreenHeader from '../../components/MainScreenHeader';
import UsersList from '../../components/UsersList';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {getUsersChats} from '../../store/slices/chat/chatSlice';
import {selectUser} from '../../store/slices/user/selectors';

function MainScreen() {
  const dispatch = useAppDispatch();
  const {socketState, dispatch: contextDispatch} = useContext(SocketContext);
  const {_id: id} = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getUsersChats(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (socketState.socket) {
      socketState.socket.emit('addNewUser', id);
    }
  }, [dispatch, id, socketState.socket]);

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
    return () => {
      if (socketState.socket) {
        socketState.socket.off('getOnlineUsers');
      }
    };
  }, [contextDispatch, socketState.socket]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MainScreenHeader />
      </View>
      <UsersList />
      <ChatsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  headerContainer: {
    maxWidth: 343,
    alignSelf: 'center',
    paddingTop: 64,
  },
});

export default MainScreen;
