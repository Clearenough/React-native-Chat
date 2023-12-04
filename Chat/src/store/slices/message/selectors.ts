import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export const selectMessages = (state: RootState) => state.message.messages;

export const selectLastMessage = createSelector([selectMessages], messages => {
  return messages[messages.length - 1];
});
