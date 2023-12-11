import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {chatEndpoints} from '../../../@constants/apiEndpoint';
import {IChat, IChatCreate, IServerError} from '../../../@types/common';
import {errorExtractor} from '../../../helpers/errorExtractor';
import {getMessages} from '../message/messageSlice';

export const createChat = createAsyncThunk(
  'chats/createChat',
  async function (chat: IChatCreate, {rejectWithValue, dispatch}) {
    const response = await fetch(chatEndpoints.createChat, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(chat),
    });
    const data: IChat | IServerError | string = await response.json();
    let message = '';
    if (!response.ok) {
      if (typeof data === 'string' || !('members' in data)) {
        message = errorExtractor(data);
        return rejectWithValue(message);
      }
    }
    const createdChat = data as IChat;
    dispatch(setCurrentChat(createdChat._id));
    dispatch(getMessages(createdChat._id));
    return createdChat;
  },
);

export const deleteChat = createAsyncThunk(
  'chats/deleteChat',
  async function (chatId: string, {rejectWithValue}) {
    const response = await fetch(chatEndpoints.deleteChat + chatId, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });
    const data: IServerError | string = await response.json();
    let message = '';
    if (!response.ok) {
      if (typeof data !== 'string') {
        message = errorExtractor(data);
        return rejectWithValue(message);
      }
    }
    return chatId;
  },
);

export const getUsersChats = createAsyncThunk(
  'chats/getUsersChats',
  async function (userId: string, {rejectWithValue, dispatch}) {
    const response = await fetch(chatEndpoints.getUserChats + userId);
    const data: IChat[] | IServerError | string = await response.json();

    let message = '';
    if (!response.ok) {
      if (!Array.isArray(data)) {
        message = errorExtractor(data);
        return rejectWithValue(message);
      }
    }
    const chats = data as unknown as IChat[];
    for (let i = 0; i < chats.length; i++) {
      dispatch(getMessages(chats[i]._id));
    }
    return data as IChat[];
  },
);

export const findChat = createAsyncThunk(
  'chats/findChat',
  async function (ids: IChatCreate, {rejectWithValue}) {
    const url = chatEndpoints.getChat + ids.firstId + '/' + ids.secondId;
    const response = await fetch(url);
    const data: IChat | IServerError | string = await response.json();
    let message = '';
    if (!response.ok) {
      if (typeof data === 'string' || 'message' in data) {
        message = errorExtractor(data);
        return rejectWithValue(message);
      }
    }
    return data as IChat;
  },
);

export interface ChatState {
  chats: IChat[];
  currentChat: string;
  status: string;
  error: string;
}

const initialState: ChatState = {
  chats: [],
  currentChat: '',
  status: '',
  error: '',
};

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChat = action.payload;
    },
    resetCurrentChat: state => {
      state.currentChat = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createChat.fulfilled,
      (state, action: PayloadAction<IChat>) => {
        state.status = 'resolved';
        if (state.chats.find(chat => chat._id === action.payload._id)) {
          return;
        }
        state.chats.push(action.payload);
      },
    );
    builder.addCase(createChat.pending, state => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(
      getUsersChats.fulfilled,
      (state, action: PayloadAction<IChat[]>) => {
        state.chats = action.payload;
        state.status = 'resolved';
      },
    );
    builder.addCase(getUsersChats.pending, state => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(
      deleteChat.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.chats = state.chats.filter(ch => ch._id !== action.payload);
        state.status = 'resolved';
      },
    );
    builder.addCase(deleteChat.pending, state => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.error = action.payload;
    });
  },
});

export const {setCurrentChat, resetCurrentChat} = chatSlice.actions;

export default chatSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
