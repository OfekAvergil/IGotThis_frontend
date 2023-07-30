import {MD3LightTheme, Provider as PaperProvider,} from 'react-native-paper';
import MainContainer from './src/navigation/MainContainer';
import React, { useEffect, useState, useRef } from 'react';
import { runInAction } from "mobx";
import {Audio} from 'expo-av'
import userStore from './src/stores/userStore';
import { Colors } from './src/consts';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import eventsStore, { event } from './src/stores/eventsStore';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 5,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondery,
  },
};

export default function App() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  
  useEffect(()=> {
    /**
     * ask recording permission from user upon first render
     */
    async function getPermission(){
      await Audio.requestPermissionsAsync().then((permission) => {
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


    registerForPushNotificationsAsync().then((token: string | undefined) => {
      if (token) {
        runInAction(() => {
          eventsStore.setExpoPushToken(token);
        })
      }
    });
  }, []);

  
  return (
    <PaperProvider theme={theme}>
      <MainContainer/>
    </PaperProvider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync(
      {
        projectId: 'IGotThis',
      }
    )).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}