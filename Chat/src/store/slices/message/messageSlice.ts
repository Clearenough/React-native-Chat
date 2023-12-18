import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {messageEndpoints} from '../../../@constants/apiEndpoint';
import {
  IChatMessages,
  ILastMessage,
  IMessage,
  IMessageCreate,
  IServerError,
} from '../../../@types/common';
import {errorExtractor} from '../../../helpers/errorExtractor';
import {RootState} from '../../store';
import {setLastMessage} from '../chat/chatSlice';

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async function (messageInfo: IMessageCreate, {rejectWithValue, dispatch}) {
    const response = await fetch(messageEndpoints.message, {
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(messageInfo),
      method: 'POST',
    });
    const data: IMessage | IServerError | string = await response.json();
    let message = '';
    if (!response.ok) {
      if (typeof data === 'string' || 'message' in data) {
        message = errorExtractor(data);
        return rejectWithValue(message);
      }
    }
    const lastMessage: ILastMessage = {
      message: data as IMessage,
      isNull: false,
    };
    dispatch(setLastMessage(lastMessage));
    return data as IMessage;
  },
);

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async function (message: IMessage, {rejectWithValue, getState, dispatch}) {
    const response = await fetch(messageEndpoints.message + message._id, {
      headers: {'Content-Type': 'application/json'},
      method: 'DELETE',
    });
    const data: IServerError | string = await response.json();
    let responseMessage = '';
    if (!response.ok) {
      if (typeof data !== 'string') {
        responseMessage = errorExtractor(data);
        return rejectWithValue(responseMessage);
      }
    }
    const state = getState() as RootState;
    const messages = state.message.messages[message.chatId];
    const index = messages.findIndex(mes => message._id === mes._id);
    const maxIndex = messages.length - 1;
    if (index === maxIndex) {
      if (index === 0) {
        dispatch(setLastMessage({message, isNull: true}));
      }
      dispatch(
        setLastMessage({message: messages[messages.length - 2], isNull: false}),
      );
    }
    return message;
  },
);

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async function (chatId: string, {rejectWithValue, dispatch}) {
    const response = await fetch(messageEndpoints.message + chatId);
    const data: IMessage[] | IServerError | string = await response.json();
    let message = '';
    if (!response.ok) {
      if (typeof data === 'string' || 'message' in data) {
        message = errorExtractor(data);
        return rejectWithValue(message);
      }
    }
    const messages = data as IMessage[];
    const lastMessage = (data as IMessage[])[(data as IMessage[]).length - 1];
    if (messages.length === 0) {
      dispatch(setLastMessage({message: lastMessage, isNull: true}));
    }
    dispatch(setLastMessage({message: lastMessage, isNull: false}));
    return data as IMessage[];
  },
);

export interface MessageState {
  messages: IChatMessages;
  error: string;
  status: string;
}

export const initialState: MessageState = {
  messages: {},
  error: '',
  status: '',
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      // if (!state.messages.find(message => message._id === action.payload._id)) {
      //   state.messages.push(action.payload);
      // }
      if (!state.messages[action.payload.chatId]) {
        state.messages[action.payload.chatId] = [];
      }
      if (
        !state.messages[action.payload.chatId].find(
          message => message._id === action.payload._id,
        )
      ) {
        state.messages[action.payload.chatId].push(action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createMessage.fulfilled,
      (state, action: PayloadAction<IMessage>) => {
        if (!state.messages[action.payload.chatId]) {
          state.messages[action.payload.chatId] = [];
        }
        state.messages[action.payload.chatId].push(action.payload);
        state.status = 'resolved';
      },
    );
    builder.addCase(createMessage.pending, state => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(
      getMessages.fulfilled,
      (state, action: PayloadAction<IMessage[]>) => {
        if (action.payload.length === 0) {
          return;
        }
        state.messages[action.payload[0].chatId] = action.payload;
        state.status = 'resolved';
      },
    );
    builder.addCase(getMessages.pending, state => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(
      deleteMessage.fulfilled,
      (state, action: PayloadAction<IMessage>) => {
        state.messages[action.payload.chatId] = state.messages[
          action.payload.chatId
        ].filter(message => message._id !== action.payload._id);
        state.status = 'resolved';
      },
    );
    builder.addCase(deleteMessage.pending, state => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.error = action.payload;
    });
  },
});

export const {addMessage} = messageSlice.actions;

export default messageSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
