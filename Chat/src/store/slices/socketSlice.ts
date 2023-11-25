import {createSlice} from '@reduxjs/toolkit';
import {Socket} from 'socket.io-client';

export interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const {setSocket} = socketSlice.actions;

export default socketSlice.reducer;
