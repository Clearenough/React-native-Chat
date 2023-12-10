import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export const selectMessages = (state: RootState) => state.message.messages;
export const selectCurrentChatMessages = (state: RootState) =>
  state.message.messages[state.chat.currentChat];

export const selectLastMessage = createSelector(
  [selectCurrentChatMessages],
  messages => {
    if (!messages || messages.length === 0) {
      return null;
    }
    return messages[messages.length - 1];
  },
);
