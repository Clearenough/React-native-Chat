import React from 'react';
import {useCallback, useEffect} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {getMessages} from '../../store/slices/messageSlice';
import Message from '../Message';

interface Props {
  firstUser: IUser;
  secondUser: IUser;
  chatId: string;
}

function MessagesList({firstUser, secondUser, chatId}: Props) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.message.messages);

  useEffect(() => {
    async function fetchMessages() {
      dispatch(getMessages(chatId));
    }
    fetchMessages();
  }, [chatId, dispatch]);

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
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={messages}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessagesList;
