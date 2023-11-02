import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {userBreakpoints} from '../../@constants/apiBreackpoint';
import {IUser} from '../../@types/common';
import {useAppSelector} from '../../hooks/storeHooks';
import UserListItem from '../UserListItem';

function UsersList() {
  const user = useAppSelector(state => state.user);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(userBreakpoints.getUsers);
      const data: IUser[] = await response.json();
      setUsers(data.filter(item => item._id !== user._id));
    };
    fetchUsers();
  }, [user]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IUser>) => (
      <UserListItem username={item.username} />
    ),
    [],
  );

  return (
    <FlatList
      renderItem={renderItem}
      data={users}
      keyExtractor={item => item._id}
      horizontal
    />
  );
}

export default UsersList;
