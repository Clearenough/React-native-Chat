import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {userEndpoints} from '../../@constants/apiEndpoint';
import {ChatRoomNavigationProp, IChat, IUser} from '../../@types/common';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {setCurrentChat} from '../../store/slices/chat/chatSlice';
import {selectSortedChats} from '../../store/slices/chat/selectors';
import {selectUser} from '../../store/slices/user/selectors';
import ChatsListItem from '../ChatsListItem';

function ChatsList() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ChatRoomNavigationProp>();
  const chats = useAppSelector(selectSortedChats);
  const user = useAppSelector(selectUser);
  const [usersInfo, setUsersInfo] = useState<IUser[]>([]);
  console.log(
    chats.map(ch => ch.members),
    'CHATS',
    usersInfo.map(inf => inf._id),
    'INFOS',
  );
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(userEndpoints.findMembersInfo + user._id);
      const memberInfo = await response.json();
      setUsersInfo(memberInfo);
    }
    fetchUsers();
  }, [user._id, chats]);

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
    ({item}: ListRenderItemInfo<IChat>) => {
      if (!item.lastMessage) {
        return null;
      }
      if (usersInfo.length === 0) {
        return null;
      }
      // const messages = allMsessages[chat._id];
      // if (!messages) {
      //   return null;
      // }
      // const lastMessage = messages[messages.length - 1];
      // if (!lastMessage) {
      //   return null;
      // }
      const secondMemberId = item.members.find(m => m !== user._id);
      const secondUser = usersInfo.find(us => secondMemberId === us._id)!;
      if (!secondUser) {
        return null;
      }
      return (
        <View>
          <ChatsListItem
            user={secondUser}
            message={item.lastMessage}
            pressHandler={() => onPress(secondUser._id, item._id)}
            chat={item}
          />
        </View>
      );
    },
    [onPress, user._id, usersInfo],
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <FlatList
          renderItem={renderItem}
          data={chats}
          keyExtractor={item => item._id}
          // ListFooterComponentStyle={styles.container}
          ItemSeparatorComponent={renderSeparator}
          // ListHeaderComponent={edgeSeparator}
          // ListFooterComponent={edgeSeparator}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    width: 343,
    alignSelf: 'center',
  },
  separator: {
    height: 16,
  },
});

export default ChatsList;
