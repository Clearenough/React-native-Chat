import React, {useContext, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {IMessageCreate} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {createMessage} from '../../store/slices/message/messageSlice';
import {selectLastMessage} from '../../store/slices/message/selectors';
import {selectUser} from '../../store/slices/user/selectors';
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
  const {_id} = useAppSelector(selectUser);
  const lastMessage = useAppSelector(selectLastMessage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (socketState.socket && lastMessage) {
      socketState.socket.emit('sendMessage', lastMessage);
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
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: '100%',
  },
  textInput: {
    width: '70%',
    color: '#fff',
  },
});

export default MessageSender;
