import React, {useContext, useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';
import {formatTimeDifference} from '../../helpers/formatTimeDifference';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {selectCurrentChatId} from '../../store/slices/chat/selectors';
import {
  addMessage,
  deleteMessage,
} from '../../store/slices/message/messageSlice';
import UserIcon from '../common/UserIcon';

interface Props {
  pressHandler: () => void;
  message: IMessage;
  user: IUser;
}

function ChatsListItem({pressHandler, message, user}: Props) {
  const {socketState} = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector(selectCurrentChatId);
  useEffect(() => {
    if (socketState.socket === null) {
      return;
    }
    socketState.socket.on('getMessage', (res: IMessage) => {
      if (res.senderId !== user._id) {
        dispatch(addMessage(res));
      }
    });
    return () => {
      if (socketState.socket !== null) {
        socketState.socket.off('getMessage');
      }
    };
  }, [currentChatId, dispatch, socketState.socket, user, user._id]);

  useEffect(() => {
    if (socketState.socket === null) {
      return;
    }
    socketState.socket.on('getDeletedMessage', (res: IMessage) => {
      dispatch(deleteMessage(res));
    });
    return () => {
      if (socketState.socket === null) {
        return;
      }
      socketState.socket.off('getDeletedMessage');
    };
  }, [dispatch, socketState.socket]);

  return (
    <Pressable onPress={pressHandler} style={styles.container}>
      <UserIcon
        username={user.username}
        userStyles={styles.user}
        textStyles={styles.userText}
      />
      <View style={styles.contentContainer}>
        <View style={styles.usernameContainer}>
          <Text style={styles.userText}>{user.username}</Text>
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {message.text}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.text}>
            {formatTimeDifference(message.createdAt).time}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    width: 375,
    alignItems: 'flex-start',
    maxHeight: 44,
  },
  contentContainer: {
    flexDirection: 'row',
    width: 291,
    justifyContent: 'space-between',
    gap: 8,
  },

  usernameContainer: {
    maxWidth: 235,
    justifyContent: 'flex-start',
  },
  timeContainer: {},
  text: {
    color: '#C6C7CD',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 13,
    overflow: 'hidden',
  },
  user: {
    backgroundColor: 'purple',
    borderRadius: 100,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.6,
  },
});

export default ChatsListItem;
