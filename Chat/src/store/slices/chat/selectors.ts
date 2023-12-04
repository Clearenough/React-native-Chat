// import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
// import {selectUser} from '../user/selectors';

export const selectChats = (state: RootState) => state.chat.chats;

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
