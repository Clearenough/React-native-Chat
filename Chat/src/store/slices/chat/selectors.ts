// import {createSelector} from '@reduxjs/toolkit';
import {IChat} from '../../../@types/common';
import {sortChatsByTime} from '../../../helpers/sortChatsByTime';
import {RootState} from '../../store';
// import {selectUser} from '../user/selectors';

export const selectChats = (state: RootState) => state.chat.chats;
export const selectCurrentChatId = (state: RootState) => state.chat.currentChat;
export const selectSortedChats = (state: RootState): IChat[] => {
  const chats: IChat[] = [];
  for (const [, chat] of state.chat.chats) {
    chats.push(chat);
  }
  return sortChatsByTime(chats);
};
// export const selectCurrentChat = createSelector(
//   [selectChats, selectUser],
//   (chats, user) => {
//     return chats.find(chat => {
//       return (
//         chat.members.includes(user._id) && chat.members.includes(secondUserId)
//       );
//     });
//   },
// );

// const currentChat = useAppSelector(state => {
//   return state.chat.chats.find(chat => {
//     return (
//       chat.members.includes(user._id) && chat.members.includes(secondUserId)
//     );
//   });
// });
