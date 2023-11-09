import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {userBreakpoints} from '../../@constants/apiBreackpoint';
import {ChatRoomProps, IChat, IUser} from '../../@types/common';
import {findChat} from '../../API/chatAPI';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import {useAppSelector} from '../../hooks/storeHooks';

function ChatRoom({route}: ChatRoomProps) {
  const {_id} = useAppSelector(state => state.user);
  const [secondUser, setSecondUser] = useState<IUser>();
  const [chat, setChat] = useState<IChat>();

  const {secondUserId, chatId} = route.params;

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(userBreakpoints.findUser + secondUserId);
      const data: IUser = await response.json();
      setSecondUser(data);
    }
    fetchUser();
  }, [chatId, secondUserId]);

  useEffect(() => {
    async function fetchChat() {
      const chatInfo = await findChat({firstId: _id, secondId: secondUserId});
      setChat(chatInfo);
    }
    fetchChat();
  }, [_id, secondUserId]);

  return secondUser ? <ChatRoomHeader user={secondUser} /> : <Text>Hahah</Text>;
}

export default ChatRoom;
