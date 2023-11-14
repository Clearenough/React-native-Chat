import {chatEndpoints} from '../@constants/apiEndpoint';
import {IChat, IChatCreate} from '../@types/common';

export async function createChat(ids: IChatCreate) {
  const response = await fetch(chatEndpoints.createChat, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(ids),
  });
  const data: IChat = await response.json();
  return data;
}

export async function getUsersChats(userId: string) {
  const response = await fetch(chatEndpoints.getUserChats + userId);
  const data: IChat[] = await response.json();
  return data;
}

export async function findChat(ids: IChatCreate) {
  const url = chatEndpoints.getChat + ids.firstId + '/' + ids.secondId;
  const response = await fetch(url);
  const data: IChat = await response.json();
  return data;
}
