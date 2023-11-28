import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Socket} from 'socket.io-client';

export interface IFormErrors {
  [key: string]: string;
}

export interface IRegisterInput {
  value: string;
  error: string;
  inputValidationType: 'name' | 'username' | 'password';
}

// export interface IFormState {
//   name: string;
//   username: string;
//   password: string;
//   errors: IFormErrors;
// }

export interface IFormContext {
  formState: IFormState;
  formDispatch: React.Dispatch<IFormAction>;
}

export interface IFormState {
  [key: string]: IRegisterInput;
}

export interface IFormPayload {
  key: string;
  value: IRegisterInput;
}

export interface IFormAction {
  type: FormActionType;
  payload: IFormPayload;
}

export enum FormActionType {
  'value' = 'SET_VALUE',
  'error' = 'SET_ERROR',
}

export const InputTypeFormActionTypeAccordance = {
  name: 'SET_NAME',
  username: 'SET_USERNAME',
  password: 'SET_PASSWORD',
};

export interface ISocketContext {
  socketState: ISocketState;
  dispatch: React.Dispatch<ISocketAction>;
}

export interface ISocketState {
  socket: null | Socket;
  onlineUsers: IOnlineUser[];
}

export interface ISocketPayload {
  socket?: Socket;
  onlineUsers?: IOnlineUser[];
}

export interface ISocketAction {
  type: SocketActionType;
  payload: ISocketPayload;
}

export enum SocketActionType {
  'socket' = 'SET_SOCKET',
  'users' = 'SET_ONLINE_USERS',
}

// export type IFormState2 = {
//   [key: string]: string;
// } & {
//   errors: IFormErrors;
// };

// export type IFormPayload = Partial<IFormState>;

export type RootStackParamList = {
  ChatRoom: {secondUserId: string};
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Profile: {userId: string};
};

export type ChatRoomProps = NativeStackScreenProps<
  RootStackParamList,
  'ChatRoom',
  'MyStack'
>;

export type ProfileRoomProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile',
  'MyStack'
>;

export type ChatRoomNavigationProp = ChatRoomProps['navigation'];

export interface IUser {
  _id: string;
  name: string;
  username: string;
  token: string;
}

export interface IOnlineUser {
  userId: string;
  socketId: string;
}

export interface IUserSignUp {
  name: string;
  username: string;
  password: string;
}

export interface IUserSignIn {
  username: string;
  password: string;
}

export interface IServerError {
  message: string;
}

export interface IChat {
  members: [string, string];
  _id: string;
}

export interface IChatCreate {
  firstId: string;
  secondId: string;
}

export interface IMessage {
  _id: string;
  chatId: string;
  senderId: string;
  text: string;
}

export interface IMessageCreate {
  chatId: string;
  senderId: string;
  text: string;
}

export interface ISocketMessage extends IMessage {
  recipientId: string;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}
