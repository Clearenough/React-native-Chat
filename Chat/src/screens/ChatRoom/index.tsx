import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {userEndpoints} from '../../@constants/apiEndpoint';
import {ChatRoomProps, IChat, IUser} from '../../@types/common';
import {findChat} from '../../API/chatAPI';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessagesList from '../../components/MesagesList';
import MessageSender from '../../components/MessageSender/indes';
import {useAppSelector} from '../../hooks/storeHooks';

function ChatRoom({route}: ChatRoomProps) {
  const user = useAppSelector(state => state.user);
  const [secondUser, setSecondUser] = useState<IUser>();
  const [_, setChat] = useState<IChat>();
  const [message, setMessage] = useState<string>('');

  const {secondUserId, chatId} = route.params;

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(userEndpoints.findUser + secondUserId);
      const data: IUser = await response.json();
      setSecondUser(data);
    }
    fetchUser();
  }, [chatId, secondUserId]);

  useEffect(() => {
    async function fetchChat() {
      const chatInfo = await findChat({
        firstId: user._id,
        secondId: secondUserId,
      });
      setChat(chatInfo);
    }
    fetchChat();
  }, [user, secondUserId]);

  return secondUser ? (
    <View style={styles.container}>
      <ChatRoomHeader user={secondUser} />
      <MessagesList firstUser={user} secondUser={secondUser} chatId={chatId} />
      <MessageSender
        chatId={chatId}
        messageText={message}
        setMessageText={setMessage}
      />
    </View>
  ) : (
    <Text>Error</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
  },
});

export default ChatRoom;
