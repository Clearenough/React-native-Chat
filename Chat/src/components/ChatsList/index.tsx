import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {userEndpoints} from '../../@constants/apiEndpoint';
import {ChatRoomNavigationProp, IUser} from '../../@types/common';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {setCurrentChat} from '../../store/slices/chat/chatSlice';
import {selectChats} from '../../store/slices/chat/selectors';
import {selectMessages} from '../../store/slices/message/selectors';
import {selectUser} from '../../store/slices/user/selectors';
import ChatsListItem from '../ChatsListItem';

function ChatsList() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ChatRoomNavigationProp>();
  const chats = useAppSelector(selectChats);
  const user = useAppSelector(selectUser);
  const allMsessages = useAppSelector(selectMessages);
  const [usersInfo, setUsersInfo] = useState<IUser[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(userEndpoints.findMembersInfo + user._id);
      const memberInfo = await response.json();
      setUsersInfo(memberInfo);
    }
    fetchUsers();
  }, [user._id]);

  const onPress = useCallback(
    (secondUserId: string, chatId: string) => {
      dispatch(setCurrentChat(chatId));
      navigation.navigate('ChatRoom', {
        secondUserId,
      });
    },
    [dispatch, navigation],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IUser>) => {
      const chat = chats.find(ch => ch.members.includes(item._id));
      if (!chat) {
        return null;
      }
      const messages = allMsessages[chat._id];
      if (!messages) {
        return null;
      }
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage) {
        return null;
      }
      return (
        <ChatsListItem
          user={item}
          message={lastMessage.text}
          pressHandler={() => onPress(item._id, chat._id)}
        />
      );
    },
    [allMsessages, chats, onPress],
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={usersInfo}
        keyExtractor={item => item._id}
        // ListFooterComponentStyle={styles.container}
        ItemSeparatorComponent={renderSeparator}
        // ListHeaderComponent={edgeSeparator}
        // ListFooterComponent={edgeSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    width: 343,
    alignSelf: 'center',
  },
  separator: {
    height: 8,
  },
});

export default ChatsList;
