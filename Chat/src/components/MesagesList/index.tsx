import React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import {getMessages} from '../../API/messageAPI';
import Message from '../Message';

interface Props {
  firstUser: IUser;
  secondUser: IUser;
  chatId: string;
}

function MessagesList({firstUser, secondUser, chatId}: Props) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  console.log(firstUser, secondUser);

  useEffect(() => {
    async function fetchMessages() {
      const chatMessages = await getMessages(chatId);
      setMessages(chatMessages);
    }
    fetchMessages();
  }, [chatId]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IMessage>) => {
      let senderUser: IUser;
      if (item.senderId === firstUser._id) {
        senderUser = firstUser;
      } else {
        senderUser = secondUser;
      }
      return <Message user={senderUser} message={item} />;
    },
    [firstUser, secondUser],
  );

  return (
    <View>
      <FlatList
        renderItem={renderItem}
        data={messages}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

export default MessagesList;
