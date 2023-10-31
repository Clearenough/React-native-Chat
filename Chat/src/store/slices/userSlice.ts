import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import {userBreakpoints} from '../../@constants/apiBreackpoint';
import {IServerError, IUser, IUserSignUp} from '../../@types/common';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async function (userSignUp: IUserSignUp, {rejectWithValue}) {
    const response = await fetch(userBreakpoints.register, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userSignUp),
    });

    const data: IUser | IServerError | string = await response.json();

    let message = '';
    if (!response.ok) {
      if (typeof data === 'string') {
        message = data;
      } else if ('message' in data) {
        message = data.message;
      }
    }

    if (typeof data === 'string') {
      return rejectWithValue(message);
    }
    if ('message' in data) {
      return rejectWithValue(message);
    }

    return data;
  },
);

export interface UserState {
  token: string;
  id: string;
  username: string;
  status: string;
  error: string;
}

const initialState: UserState = {
  token: '',
  id: '',
  username: '',
  status: '',
  error: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.id = action.payload._id;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = 'error';
      });
  },
});

export default userSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
