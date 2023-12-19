import React, {useContext, useState} from 'react';
import {useCallback} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {deleteMessage} from '../../store/slices/message/messageSlice';
import {selectCurrentChatMessages} from '../../store/slices/message/selectors';
import {selectUser} from '../../store/slices/user/selectors';
import DeleteModal from '../common/DeleteModal';
import Message from '../Message';

interface Props {
  firstUser: IUser;
  secondUser: IUser;
  chatId: string;
}

function MessagesList({firstUser, secondUser}: Props) {
  const [isVisible, setIsVisible] = useState(false);
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

  const modalToogle = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const onDeleteMessage = useCallback(
    (message: IMessage) => {
      if (socketState.socket === null) {
        return;
      }
      if (message.senderId !== user._id) {
        return;
      }
      socketState.socket.emit('deleteMessage', message);
      dispatch(deleteMessage(message));
      setIsVisible(!isVisible);
    },
    [dispatch, isVisible, socketState.socket, user._id],
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
        <>
          <Message
            user={senderUser}
            message={item}
            longPressHandler={modalToogle}
          />
          <DeleteModal
            deleteHandler={() => onDeleteMessage(item)}
            setIsVisible={setIsVisible}
            text={'message'}
            isVisible={isVisible}
          />
        </>
      );
    },
    [firstUser, isVisible, modalToogle, onDeleteMessage, secondUser],
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
    width: 343,
    alignSelf: 'center',
    flex: 1,
    paddingBottom: 10,
  },
});

export default MessagesList;
