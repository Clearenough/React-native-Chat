import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types/common';
import MainScreen from '../../screens/MainScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import {useAppSelector} from '../../hooks/storeHooks';
import ChatRoom from '../../screens/ChatRoom';
import Profile from '../../screens/Profile';
import {selectUser} from '../../store/slices/user/selectors';

const Stack = createNativeStackNavigator<RootStackParamList>();
function Navigation() {
  const user = useAppSelector(selectUser);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user._id ? (
        <Stack.Group>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegistrationScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default Navigation;
