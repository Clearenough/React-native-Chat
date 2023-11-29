import React, {useContext, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {IMessageCreate} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {createMessage} from '../../store/slices/messageSlice';
import SendButton from '../common/SendButton';

interface Props {
  chatId: string;
  messageText: string;
  recipientId: string;
  setMessageText(message: string): void;
}

function MessageSender({
  chatId,
  messageText,
  recipientId,
  setMessageText,
}: Props) {
  const {socketState} = useContext(SocketContext);
  const {_id} = useAppSelector(state => state.user);
  const lastMessage = useAppSelector(
    state => state.message.messages[state.message.messages.length - 1],
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (socketState.socket) {
      socketState.socket.emit('sendMessage', lastMessage);
      console.log(lastMessage);
    }
  }, [lastMessage, socketState.socket]);

  async function onPressHandler() {
    const messageCreate: IMessageCreate = {
      chatId,
      senderId: _id,
      recipientId,
      text: messageText,
    };
    dispatch(createMessage(messageCreate));
    setMessageText('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={messageText}
        onChangeText={setMessageText}
        style={styles.textInput}
      />
      <SendButton handler={onPressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textInput: {
    width: '70%',
    backgroundColor: 'white',
  },
});

export default MessageSender;
