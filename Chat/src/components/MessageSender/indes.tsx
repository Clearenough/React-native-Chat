import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {IMessageCreate} from '../../@types/common';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {createMessage} from '../../store/slices/messageSlice';
import SendButton from '../common/SendButton';

interface Props {
  chatId: string;
  messageText: string;
  setMessageText(message: string): void;
}

function MessageSender({chatId, messageText, setMessageText}: Props) {
  const {_id} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  async function onPressHandler() {
    const messageCreate: IMessageCreate = {
      chatId,
      senderId: _id,
      text: messageText,
    };
    await dispatch(createMessage(messageCreate));
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
