import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {userEndpoints} from '../../@constants/apiEndpoint';
import {ChatRoomProps, ISocketMessage, IUser} from '../../@types/common';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import DeleteButton from '../../components/common/DeleteButton';
import MessagesList from '../../components/MesagesList';
import MessageSender from '../../components/MessageSender/indes';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {deleteChat, findChat} from '../../store/slices/chatSlice';
import {createMessage} from '../../store/slices/messageSlice';

function ChatRoom({route, navigation}: ChatRoomProps) {
  const {socketState} = useContext(SocketContext);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [secondUser, setSecondUser] = useState<IUser>();
  const [message, setMessage] = useState<string>('');

  const {secondUserId} = route.params;

  const currentChat = useAppSelector(state => {
    return state.chat.chats.find(chat => {
      return (
        chat.members.includes(user._id) && chat.members.includes(secondUserId)
      );
    });
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(userEndpoints.findUser + secondUserId);
      const data: IUser = await response.json();
      setSecondUser(data);
    }
    fetchUser();
  }, [secondUserId]);

  useEffect(() => {
    dispatch(
      findChat({
        firstId: user._id,
        secondId: secondUserId,
      }),
    );
  }, [user, secondUserId, dispatch]);

  useEffect(() => {
    if (socketState.socket === null) {
      return;
    }
    socketState.socket.on('getMessage', (res: ISocketMessage) => {
      if (!currentChat || currentChat._id !== res.chatId) {
        return;
      }
      console.log('socket message');
      if (res.senderId !== user._id) {
        dispatch(createMessage(res));
      }
    });
    return () => {
      if (socketState.socket !== null) {
        socketState.socket.off('getMessage');
      }
    };
  }, [currentChat, dispatch, socketState.socket, user._id]);

  function backButtonHandler() {
    navigation.navigate('Main');
  }

  function userListItemHandler() {
    navigation.navigate('Profile', {
      userId: secondUserId,
    });
  }

  return secondUser && currentChat ? (
    <View style={styles.container}>
      <ChatRoomHeader
        user={secondUser}
        backButtonHandler={backButtonHandler}
        userListItemHandler={userListItemHandler}
        additionalButton={
          <DeleteButton
            onPressHandler={() => {
              dispatch(deleteChat(currentChat._id));
              navigation.goBack();
            }}
          />
        }
      />
      <MessagesList
        firstUser={user}
        secondUser={secondUser}
        chatId={currentChat._id}
      />
      <MessageSender
        chatId={currentChat._id}
        messageText={message}
        recipientId={secondUserId}
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
