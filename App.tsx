import {MD3LightTheme, Provider as PaperProvider,} from 'react-native-paper';
import MainContainer from './src/navigation/MainContainer';
import React, { useEffect } from 'react';
import {Audio} from 'expo-av'
import userStore from './src/stores/userStore';
import { Colors } from './src/consts';


const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 5,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
  },
};

export default function App() {
  useEffect(()=> {
    /**
     * ask recording permission from user upon first render
     */
    async function getPermission(){
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log(permission.granted);
        userStore.setAudioPremissions(permission.granted);
      }).catch(error => {
        console.log(error);
      });
    }

    getPermission();
    // //cleanup upon first render
    // return()=>{
    //   if(recording){
    //     stopRecording();
    //   }
    // }
  }, []);

  
  return (
    <PaperProvider theme={theme}>
      <MainContainer/>
    </PaperProvider>
  );
}

