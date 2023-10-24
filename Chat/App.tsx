/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './src/store/store';
import MainScreen from './src/screens/MainScreen';
import {RootStackParamList} from './src/@types/common';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Stack.Navigator>
            {false ? (
              <Stack.Group>
                <Stack.Screen name="Main" component={MainScreen} />
              </Stack.Group>
            ) : (
              <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegistrationScreen} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
