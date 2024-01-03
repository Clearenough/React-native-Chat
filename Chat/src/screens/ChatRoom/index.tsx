import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChatRoomProps, IMessage} from '../../@types/common';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import DeleteButton from '../../components/common/DeleteButton';
import MessagesList from '../../components/MesagesList';
import MessageSender from '../../components/MessageSender/indes';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  deleteChat,
  findChat,
  setCurrentChat,
} from '../../store/slices/chat/chatSlice';
import {selectCurrentChatId} from '../../store/slices/chat/selectors';
import {addMessage} from '../../store/slices/message/messageSlice';
import {selectUser, selectUsers} from '../../store/slices/user/selectors';

function ChatRoom({route, navigation}: ChatRoomProps) {
  const {socketState} = useContext(SocketContext);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  //const [secondUser, setSecondUser] = useState<IUser>();
  const [message, setMessage] = useState<string>('');

  const {secondUserId} = route.params;
  const secondUser = useAppSelector(selectUsers).find(
    u => u._id === secondUserId,
  )!;
  console.log(secondUser, 'USERIDUSERIDUSERID');
  const currentChatId = useAppSelector(selectCurrentChatId);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const response = await fetch(userEndpoints.findUser + secondUserId);
  //     const data: IUser = await response.json();
  //     setSecondUser(data);
  //   }
  //   fetchUser();
  // }, [secondUserId]);

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
    socketState.socket.on('getMessage', (res: IMessage) => {
      console.log('getNessage', res);
      if (currentChatId !== res.chatId) {
        return;
      }
      if (res.senderId !== user._id) {
        dispatch(addMessage(res));
      }
    });
    return () => {
      if (socketState.socket !== null) {
        socketState.socket.off('getMessage');
      }
    };
  }, [currentChatId, dispatch, socketState.socket, user._id]);

  function backButtonHandler() {
    navigation.navigate('Main');
    dispatch(setCurrentChat(''));
  }

  function userListItemHandler() {
    navigation.navigate('Profile', {
      userId: secondUserId,
    });
  }

  return secondUser && currentChatId ? (
    <View style={styles.container}>
      <ChatRoomHeader
        user={secondUser}
        backButtonHandler={backButtonHandler}
        userListItemHandler={userListItemHandler}
        additionalButton={
          <DeleteButton
            onPressHandler={() => {
              dispatch(deleteChat(currentChatId));
              navigation.goBack();
            }}
          />
        }
      />
      <MessagesList
        firstUser={user}
        secondUser={secondUser}
        chatId={currentChatId}
      />
      <MessageSender
        chatId={currentChatId}
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
    paddingTop: 64,
    flex: 1,
  },
});

export default ChatRoom;
