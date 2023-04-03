import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from './src/navigation/MainContainer';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  
  return (
    <PaperProvider>
      <MainContainer/>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
