import {configureStore} from '@reduxjs/toolkit';
import chatSlice from './slices/chat/chatSlice';
import messageSlice from './slices/message/messageSlice';
import socketSlice from './slices/socketSlice';
import userSlice from './slices/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    message: messageSlice,
    socket: socketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
