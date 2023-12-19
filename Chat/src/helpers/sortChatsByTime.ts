import {IChat} from '../@types/common';
import {formatTimeDifference} from './formatTimeDifference';

export function sortChatsByTime(chats: IChat[]) {
  const filteredChats: IChat[] = chats.filter(
    chat => chat.lastMessage !== null,
  );
  const sortedChats: IChat[] = filteredChats.sort((a, b) => {
    const firtsMes = a.lastMessage?.createdAt!;
    const secondMes = b.lastMessage?.createdAt!;
    const diff =
      formatTimeDifference(firtsMes).diff -
      formatTimeDifference(secondMes).diff;
    return diff;
  });
  return sortedChats;
}
