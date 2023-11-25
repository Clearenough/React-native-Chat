import React, {useContext, useEffect} from 'react';
import UsersList from '../../components/UsersList';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {getUsersChats} from '../../store/slices/chatSlice';
import {SocketContext} from '../../contexts/SocketContext';
import {ISocketPayload, SocketActionType} from '../../@types/common';

function MainScreen() {
  const dispatch = useAppDispatch();
  const {socketState} = useContext(SocketContext);
  const id = useAppSelector(state => state.user._id);

  useEffect(() => {
    dispatch(getUsersChats(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (socketState.socket) {
      socketState.socket.emit('addNewUser', id);
      socketState.socket.on('getOnlineUsers', (res: ISocketPayload) => {
        dispatch({
          type: SocketActionType.users,
          payload: res,
        });
      });
    }
  }, [id, socketState.socket]);

  return <UsersList />;
}

export default MainScreen;
