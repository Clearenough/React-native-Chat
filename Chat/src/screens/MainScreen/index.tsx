import React, {useContext, useEffect} from 'react';
import {
  IOnlineUser,
  ISocketPayload,
  SocketActionType,
} from '../../@types/common';
import UsersList from '../../components/UsersList';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {getUsersChats} from '../../store/slices/chatSlice';

function MainScreen() {
  const dispatch = useAppDispatch();
  const {socketState, dispatch: contextDispatch} = useContext(SocketContext);
  const id = useAppSelector(state => state.user._id);

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

  return <UsersList />;
}

export default MainScreen;
