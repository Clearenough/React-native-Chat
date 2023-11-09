import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import {userBreakpoints} from '../../@constants/apiBreackpoint';
import {
  IServerError,
  IUser,
  IUserSignIn,
  IUserSignUp,
} from '../../@types/common';

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

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async function (userSignUp: IUserSignIn, {rejectWithValue}) {
    const response = await fetch(userBreakpoints.login, {
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
  _id: string;
  username: string;
  status: string;
  error: string;
}

const initialState: UserState = {
  token: '',
  _id: '',
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
      state._id = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addMatcher(isResolved, (state, action) => {
        state.status = 'resolved';
        state._id = action.payload._id;
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

function isResolved(action: AnyAction) {
  return action.type.endsWith('fulfilled');
}

function isPending(action: AnyAction) {
  return action.type.endsWith('pending');
}
