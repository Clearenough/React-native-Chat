/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import RegistrationScreen from './src/screens/RegistrationScreen';
import {store} from './src/store/store';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <RegistrationScreen />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
