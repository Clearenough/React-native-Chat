import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {createMessage} from '../../API/messageAPI';
import {useAppSelector} from '../../hooks/storeHooks';
import SendButton from '../common/SendButton';

interface Props {
  chatId: string;
  messageText: string;
  setMessageText(message: string): void;
}

function MessageSender({chatId, messageText, setMessageText}: Props) {
  const {_id} = useAppSelector(state => state.user);

  async function handler() {
    await createMessage(chatId, _id, messageText);
    setMessageText('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={messageText}
        onChangeText={setMessageText}
        style={styles.textInput}
      />
      <SendButton handler={handler} />
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
