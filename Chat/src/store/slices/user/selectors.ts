import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export const selectUser = (state: RootState) => state.user.user;
export const selectUsers = (state: RootState) => state.user.users;
export const selectUsersInfo = (state: RootState) => state.user.membersInfos;

export const selectFilteredUsersInfos = createSelector(
  [selectUsersInfo],
  users => {
    return users.filter(user => user !== null);
  },
);
