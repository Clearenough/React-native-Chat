import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';

import {userEndpoints} from '../../@constants/apiEndpoint';
import {ChatRoomNavigationProp, IUser} from '../../@types/common';
import {createChat} from '../../API/chatAPI';
import {useAppSelector} from '../../hooks/storeHooks';
import UserListItem from '../UserListItem';

function UsersList() {
  const user = useAppSelector(state => state.user);
  const navigation = useNavigation<ChatRoomNavigationProp>();

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(userEndpoints.getUsers);
      const data: IUser[] = await response.json();
      setUsers(data.filter(item => item._id !== user._id));
    };
    fetchUsers();
  }, [user]);

  const onPress = useCallback(
    async (_id: string) => {
      const chat = await createChat({firstId: user._id, secondId: _id});
      navigation.navigate('ChatRoom', {
        secondUserId: _id,
        chatId: chat._id,
      });
    },
    [navigation, user._id],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IUser>) => (
      <UserListItem
        username={item.username}
        handler={() => onPress(item._id)}
      />
    ),
    [onPress],
  );

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={users}
        keyExtractor={item => item._id}
        ListFooterComponentStyle={styles.container}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default UsersList;
