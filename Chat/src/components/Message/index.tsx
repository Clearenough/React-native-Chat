import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {IMessage, IUser} from '../../@types/common';
import {useAppSelector} from '../../hooks/storeHooks';
import {selectUser} from '../../store/slices/user/selectors';

interface Props {
  user: IUser;
  message: IMessage;
  longPressHandler: () => void;
}

function Message({user, message, longPressHandler}: Props) {
  const currentUser = useAppSelector(selectUser);

  return (
    <Pressable
      style={
        user._id === currentUser._id
          ? [styles.container, styles.yourMessages]
          : [styles.container]
      }
      onLongPress={() => {
        longPressHandler();
      }}>
      <View
        style={
          user._id === currentUser._id
            ? [styles.textContainer, styles.yourMessagesContainer]
            : [styles.textContainer]
        }>
        <Text style={styles.text}>{message.text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  yourMessages: {
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  yourMessagesContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#7132E5',
  },
  text: {
    color: 'white',
  },
});

export default Message;
