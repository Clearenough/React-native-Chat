import {messageEndpoints} from '../@constants/apiEndpoint';
import {IMessage, IMessageCreate} from '../@types/common';

export async function createMessage(
  chatId: string,
  senderId: string,
  text: string,
): Promise<IMessage> {
  const body: IMessageCreate = {
    chatId,
    senderId,
    text,
  };
  const response = await fetch(messageEndpoints.message, {
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
    method: 'POST',
  });
  const message: IMessage = await response.json();
  return message;
}

export async function getMessages(chatId: string): Promise<IMessage[]> {
  const response = await fetch(messageEndpoints.message + chatId);
  const messages: IMessage[] = await response.json();
  return messages;
}
