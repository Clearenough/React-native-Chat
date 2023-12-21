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
      <View style={styles.inputContainer}>
        <TextInput
          value={messageText}
          onChangeText={setMessageText}
          style={styles.textInput}
        />
        <View style={styles.senderContainer}>
          <SendButton handler={onPressHandler} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    height: 84,
    // paddingBottom: 21,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#050833',
    borderRadius: 15,
    height: 32,
    marginTop: 12,
    alignItems: 'center',
  },
  textInput: {
    height: 13.5,
    width: 319,
    marginVertical: 4,
    marginHorizontal: 12,
    color: '#fff',
  },
  senderContainer: {
    paddingRight: 12,
  },
});

export default MessageSender;
