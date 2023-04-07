import {Provider as PaperProvider,} from 'react-native-paper';
import MainContainer from './src/navigation/MainContainer';
import React from 'react';

export default function App() {
  return (
    <PaperProvider>
      <MainContainer/>
    </PaperProvider>
  );
}

