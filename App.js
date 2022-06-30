/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from './src/styles/theme';
import AuthNavigator from './src/views/auth/AuthNavigator';
import { persistor, Store } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';

const App = () => {


  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <AuthNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default () => (
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
