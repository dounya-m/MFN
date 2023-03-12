import React from 'react';
import { StyleSheet } from 'react-native/types';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';

const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);

// const styles = StyleSheet.create({
//   container:{
//     backgroundColor: "#ffff"
//   }
// }) 

export default Main;
