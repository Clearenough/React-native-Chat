import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';

import {ChatRoomNavigationProp, IChatCreate, IUser} from '../../@types/common';
import {SocketContext} from '../../contexts/SocketContext';

import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {createChat} from '../../store/slices/chat/chatSlice';
import {selectUser, selectUsers} from '../../store/slices/user/selectors';
import {getUsers} from '../../store/slices/user/userSlice';
import UserListItem from '../UserListItem';

function UsersList() {
  const dispatch = useAppDispatch();
  const {socketState} = useContext(SocketContext);
  const user = useAppSelector(selectUser);
  const navigation = useNavigation<ChatRoomNavigationProp>();

  // const [users, setUsers] = useState<IUser[]>([]);
  const users = useAppSelector(selectUsers);
  console.log(users);
  useEffect(() => {
    // const fetchUsers = async () => {
    //   const response = await fetch(userEndpoints.getUsers);
    //   const data: IUser[] = await response.json();
    //   setUsers(data.filter(item => item._id !== user._id));
    // };
    // fetchUsers();
    dispatch(getUsers());
  }, [user, socketState, dispatch]);

  const onPress = useCallback(
    async (_id: string) => {
      const newChat: IChatCreate = {
        firstId: user._id,
        secondId: _id,
      };
      dispatch(createChat(newChat));
      navigation.navigate('ChatRoom', {
        secondUserId: _id,
      });
    },
    [dispatch, navigation, user._id],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IUser>) => {
      const isUserOnline = socketState.onlineUsers.some(
        u => u.userId === item._id,
      );
      return (
        <UserListItem
          username={item.username}
          handler={() => onPress(item._id)}
          displayOnlineStatus={isUserOnline}
          isUserOnline={isUserOnline}
          onlineStatusDisplayType={'mark'}
        />
      );
    },

    [onPress, socketState],
  );

  const renderSeparator = () => <View style={styles.separator} />;
  const edgeSeparator = () => <View style={styles.edgeSeparator} />;

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderItem}
        data={users}
        keyExtractor={item => item._id}
        // ListFooterComponentStyle={styles.container}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={edgeSeparator}
        ListFooterComponent={edgeSeparator}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  separator: {
    width: 15.8,
  },
  edgeSeparator: {
    width: 25,
  },
});

export default UsersList;
