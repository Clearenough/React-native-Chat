import {
  ISocketAction,
  ISocketState,
  SocketActionType,
} from '../../@types/common';

export default function socketReducer(
  state: ISocketState,
  action: ISocketAction,
) {
  const {socket, onlineUsers} = action.payload;
  console.log(action.type, action.payload);
  if (action.type === SocketActionType.socket) {
    console.log('SOCKET');
    if (socket) {
      return {
        ...state,
        socket,
      };
    }
    return state;
  }
  if (action.type === SocketActionType.users) {
    console.log('USERS');
    if (onlineUsers) {
      return {
        ...state,
        onlineUsers,
      };
    }

    return state;
  }
  return state;
}
