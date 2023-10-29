import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  token: string;
  id: string;
}

const initialState: UserState = {
  token: '',
  id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});
