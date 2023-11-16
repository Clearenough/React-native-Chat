import React, {useEffect} from 'react';
import UsersList from '../../components/UsersList';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {getUsersChats} from '../../store/slices/chatSlice';

function MainScreen() {
  const dispatch = useAppDispatch();
  const id = useAppSelector(state => state.user._id);
  useEffect(() => {
    dispatch(getUsersChats(id));
  }, [dispatch, id]);

  return <UsersList />;
}

export default MainScreen;
