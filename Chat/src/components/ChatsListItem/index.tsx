import React, {useContext, useEffect, useState} from 'react';
import {Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';
import {Text} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import DeleteSVG from '../../@svg/DeleteSVG';
import {IChat, IMessage, IUser} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';
import {formatTimeDifference} from '../../helpers/formatTimeDifference';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {deleteChat} from '../../store/slices/chat/chatSlice';
import {selectCurrentChatId} from '../../store/slices/chat/selectors';
import {
  addMessage,
  deleteMessage,
} from '../../store/slices/message/messageSlice';
import DeleteModal from '../common/DeleteModal';
import UserIcon from '../common/UserIcon';

interface Props {
  pressHandler: () => void;
  message: IMessage;
  user: IUser;
  chat: IChat;
}

function ChatsListItem({pressHandler, message, user, chat}: Props) {
  const {socketState} = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector(selectCurrentChatId);
  const [isVisible, setIsVisible] = useState(false);
  const {width: windowWidth} = useWindowDimensions();

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const onDeleteChat = () => {
    if (socketState.socket === null) {
      return;
    }
    dispatch(deleteChat(chat._id));
    setIsVisible(!isVisible);
  };

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      if (-event.translationX > windowWidth * 0.3) {
        translateX.value = withTiming(-83, undefined, () => {});
      } else {
        translateX.value = event.translationX;
      }
    },
    onEnd: event => {
      if (event.translationX < 0) {
        if (-event.translationX > windowWidth * 0.3) {
          translateX.value = withTiming(-83);
          opacity.value = withTiming(1, undefined, isFinished => {
            if (isFinished) {
              runOnJS(setIsVisible)(true);
              translateX.value = withTiming(0);
            }
          });
        } else {
          translateX.value = withTiming(0);
          opacity.value = withTiming(0);
        }
      } else {
        translateX.value = withTiming(0);
        opacity.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    let iconOpacity;
    if (-translateX.value > windowWidth * 0.15) {
      iconOpacity = withTiming(1);
    } else {
      iconOpacity = withTiming(0, {duration: 100});
    }
    return {opacity: iconOpacity};
  });

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
    <View>
      <Animated.View
        style={[
          styles.iconAnimatedContainer,
          styles.deleteIconContainer,
          rIconContainerStyle,
        ]}>
        <View style={styles.iconContainer}>
          <View style={styles.delete}>
            <DeleteSVG />
            <Text style={styles.deleteText}>Delete</Text>
          </View>
        </View>
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={rStyle}>
          <Pressable onPress={pressHandler} style={styles.container}>
            <UserIcon
              username={user.username}
              userStyles={styles.user}
              textStyles={styles.userText}
            />
            <View style={styles.contentContainer}>
              <View style={styles.usernameContainer}>
                <Text style={styles.userText}>{user.username}</Text>
                <Text
                  style={styles.text}
                  numberOfLines={2}
                  ellipsizeMode="tail">
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
        </Animated.View>
      </PanGestureHandler>
      <DeleteModal
        deleteHandler={onDeleteChat}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text={'chat'}
      />
    </View>
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
  iconAnimatedContainer: {
    width: 68,
    top: '0%',
    alignSelf: 'baseline',
    position: 'absolute',
  },
  iconContainer: {
    height: '100%',
    width: 62,
    // paddingHorizontal: 8,
    backgroundColor: '#FF0B5A',
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#FFF',
    fontFamily: 'Space Grotesk',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16.8,
    overflow: 'hidden',
  },
  deleteIconContainer: {
    right: -5,
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
