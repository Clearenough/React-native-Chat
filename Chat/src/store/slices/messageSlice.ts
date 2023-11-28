import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {messageEndpoints} from '../../@constants/apiEndpoint';
import {IMessage, IMessageCreate, IServerError} from '../../@types/common';
import {errorExtractor} from '../../helpers/errorExtractor';

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async function (messageInfo: IMessageCreate, {rejectWithValue}) {
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

    return data as IMessage;
  },
);

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async function (chatId: string, {rejectWithValue}) {
    const response = await fetch(messageEndpoints.message + chatId);
    const data: IMessage[] | IServerError | string = await response.json();
    let message = '';
    if (!response.ok) {
      if (typeof data === 'string' || 'message' in data) {
        message = errorExtractor(data);
        return rejectWithValue(message);
      }
    }

    return data as IMessage[];
  },
);

export interface MessageState {
  messages: IMessage[];
  error: string;
  status: string;
}

export const initialState: MessageState = {
  messages: [],
  error: '',
  status: '',
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      createMessage.fulfilled,
      (state, action: PayloadAction<IMessage>) => {
        state.messages.push(action.payload);
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
        state.messages = action.payload;
        state.status = 'resolved';
      },
    );
    builder.addCase(getMessages.pending, state => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.error = action.payload;
    });
  },
});

export default messageSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
