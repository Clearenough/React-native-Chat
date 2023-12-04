import React, {useContext} from 'react';
import {useCallback, useEffect} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  deleteMessage,
  getMessages,
} from '../../store/slices/message/messageSlice';
import {selectMessages} from '../../store/slices/message/selectors';
import Message from '../Message';

interface Props {
  firstUser: IUser;
  secondUser: IUser;
  chatId: string;
}

function MessagesList({firstUser, secondUser, chatId}: Props) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const {socketState} = useContext(SocketContext);

  useEffect(() => {
    dispatch(getMessages(chatId));
  }, [chatId, dispatch]);

  useEffect(() => {
    if (socketState.socket === null) {
      return;
    }
    socketState.socket.on('getDeletedMessage', (messageId: string) => {
      dispatch(deleteMessage(messageId));
    });
    return () => {
      if (socketState.socket === null) {
        return;
      }
      socketState.socket.off('getDeletedMessage');
    };
  }, [dispatch, socketState.socket]);

  const longPressHandler = useCallback(
    (message: IMessage) => {
      if (socketState.socket === null) {
        return;
      }
      socketState.socket.emit('deleteMessage', message);
      dispatch(deleteMessage(message._id));
    },
    [dispatch, socketState.socket],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IMessage>) => {
      let senderUser: IUser;
      if (item.senderId === firstUser._id) {
        senderUser = firstUser;
      } else {
        senderUser = secondUser;
      }
      return (
        <Message
          user={senderUser}
          message={item}
          longPressHandler={() => longPressHandler(item)}
        />
      );
    },
    [firstUser, longPressHandler, secondUser],
  );

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={[...messages].reverse()}
        keyExtractor={item => item._id}
        inverted={true}
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
