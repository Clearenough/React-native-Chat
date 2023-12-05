/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {store} from './src/store/store';
import Navigation from './src/components/Navigation';
import SocketContextProvider from './src/contexts/SocketContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const navTheme = DefaultTheme;
navTheme.colors.background = '#050833';

function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer theme={navTheme}>
        <SocketContextProvider>
          <Provider store={store}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <Navigation />
          </Provider>
        </SocketContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
