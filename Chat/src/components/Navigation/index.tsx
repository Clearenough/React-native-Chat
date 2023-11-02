import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types/common';
import MainScreen from '../../screens/MainScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import {useAppSelector} from '../../hooks/storeHooks';

const Stack = createNativeStackNavigator<RootStackParamList>();
function Navigation() {
  const user = useAppSelector(state => state.user);

  return (
    <Stack.Navigator>
      {user._id ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegistrationScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default Navigation;
