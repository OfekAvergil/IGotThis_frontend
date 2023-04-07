import {MD3LightTheme, Provider as PaperProvider,} from 'react-native-paper';
import MainContainer from './src/navigation/MainContainer';
import React from 'react';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#E5517E',
    secondary: '#6029D2',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <MainContainer/>
    </PaperProvider>
  );
}

