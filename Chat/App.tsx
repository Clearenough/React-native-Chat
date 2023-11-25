/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/store/store';
import Navigation from './src/components/Navigation';
import SocketContextProvider from './src/contexts/SocketContext';

function App() {
  return (
    <NavigationContainer>
      <SocketContextProvider>
        <SafeAreaView style={styles.container}>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </SafeAreaView>
      </SocketContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
