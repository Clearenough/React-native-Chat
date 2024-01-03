import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {userEndpoints} from '../../../@constants/apiEndpoint';
import {
  IServerError,
  IUser,
  IUserSignIn,
  IUserSignUp,
} from '../../../@types/common';
import {errorExtractor} from '../../../helpers/errorExtractor';

export const userAuthentication = createAsyncThunk<
  IUser,
  IUserSignUp | IUserSignIn,
  {
    rejectValue: string;
  }
>('users/userAuthentication', async function (userSignUp, {rejectWithValue}) {
  let url: string;
  if ('name' in userSignUp) {
    url = userEndpoints.register;
  } else {
    url = userEndpoints.login;
  }
  const response = await fetch(url, {
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
});

export const userDelete = createAsyncThunk<
  null,
  string,
  {
    rejectValue: string;
  }
>('users/userDelete', async function (userId, {rejectWithValue}) {
  const response = await fetch(userEndpoints.deleteUser + userId, {
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
  return null;
});

export const findMembersInfo = createAsyncThunk<
  IUser[],
  string,
  {
    rejectValue: string;
  }
>('users/membersInfos', async function (userId, {rejectWithValue}) {
  const response = await fetch(userEndpoints.findMembersInfo + userId);
  const data: IUser[] | IServerError | string = await response.json();
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
});

export interface IUserState {
  token: string;
  _id: string;
  username: string;
  name: string;
  status: string;
  error: string;
}

export interface IUserSliceState {
  user: IUser;
  membersInfos: IUser[];
  status: string;
  error: string;
}

const user: IUser = {
  token: '',
  _id: '',
  username: '',
  name: '',
};

const initialState: IUserSliceState = {
  user,
  membersInfos: [],
  status: '',
  error: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.user._id = action.payload;
    },
    logout: state => {
      state.user._id = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userAuthentication.pending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(userAuthentication.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.user._id = action.payload._id;
        state.user.token = action.payload.token;
        state.user.username = action.payload.username;
        state.user.name = action.payload.name;
      })
      .addCase(userAuthentication.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
        state.status = 'error';
      })
      .addCase(userDelete.pending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(userDelete.fulfilled, state => {
        state.status = 'resolved';
        state.user._id = '';
      })
      .addCase(userDelete.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
        state.status = 'error';
      })
      .addCase(findMembersInfo.pending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(findMembersInfo.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = '';
        state.membersInfos = action.payload;
      })
      .addCase(findMembersInfo.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
        state.status = 'error';
      });
  },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
