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
  if (action.type === SocketActionType.socket) {
    if (socket) {
      return {
        ...state,
        socket,
      };
    }
    return state;
  }
  if (action.type === SocketActionType.users) {
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
