import React, {useContext} from 'react';
import {useCallback} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {deleteMessage} from '../../store/slices/message/messageSlice';
import {selectCurrentChatMessages} from '../../store/slices/message/selectors';
import {selectUser} from '../../store/slices/user/selectors';
import Message from '../Message';

interface Props {
  firstUser: IUser;
  secondUser: IUser;
  chatId: string;
}

function MessagesList({firstUser, secondUser}: Props) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectCurrentChatMessages);
  const {socketState} = useContext(SocketContext);
  const user = useAppSelector(selectUser);

  // useEffect(() => {
  //   if (socketState.socket === null) {
  //     return;
  //   }
  //   socketState.socket.on('getDeletedMessage', (message: IMessage) => {
  //     console.log(message.text, 'Deleted message');
  //     dispatch(deleteMessage(message));
  //   });
  //   return () => {
  //     if (socketState.socket === null) {
  //       return;
  //     }
  //     socketState.socket.off('getDeletedMessage');
  //   };
  // }, [dispatch, socketState.socket]);

  const longPressHandler = useCallback(
    (message: IMessage) => {
      if (socketState.socket === null) {
        return;
      }
      if (message.senderId !== user._id) {
        return;
      }
      socketState.socket.emit('deleteMessage', message);
      console.log(message.text, 'Emited Message');
      dispatch(deleteMessage(message));
    },
    [dispatch, socketState.socket, user._id],
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
      {messages ? (
        <FlatList
          renderItem={renderItem}
          data={[...messages].reverse()}
          keyExtractor={item => item._id}
          inverted={true}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessagesList;
