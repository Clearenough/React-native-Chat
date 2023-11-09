import {chatBreakpoints} from '../@constants/apiBreackpoint';
import {IChat, IChatCreate} from '../@types/common';

export async function createChat(ids: IChatCreate) {
  const response = await fetch(chatBreakpoints.createChat, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(ids),
  });
  const data: IChat = await response.json();
  return data;
}

export async function getUsersChats(userId: string) {
  const response = await fetch(chatBreakpoints.getUserChats + userId);
  const data: IChat[] = await response.json();
  return data;
}

export async function findChat(ids: IChatCreate) {
  const url = chatBreakpoints.getChat + ids.firstId + '/' + ids.secondId;
  const response = await fetch(url);
  const data: IChat = await response.json();
  return data;
}
