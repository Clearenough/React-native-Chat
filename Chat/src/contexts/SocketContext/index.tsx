import React, {useEffect, useReducer} from 'react';
import {io} from 'socket.io-client';
import {
  ISocketContext,
  ISocketPayload,
  ISocketState,
  SocketActionType,
} from '../../@types/common';
import socketReducer from './reducer';

interface Props {
  children: React.ReactNode;
}

const initValue: ISocketState = {
  socket: null,
  onlineUsers: [],
};

export const SocketContext = React.createContext<ISocketContext>({
  socketState: initValue,
  dispatch: () => undefined,
});

function SocketContextProvider({children}: Props) {
  const [state, dispatch] = useReducer(socketReducer, initValue);

  useEffect(() => {
    const newSocket = io('http://localhost:3001/');
    const payload: ISocketPayload = {
      socket: newSocket,
    };
    dispatch({
      type: SocketActionType.socket,
      payload,
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socketState: state,
        dispatch: dispatch,
      }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
