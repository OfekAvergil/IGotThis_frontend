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
import eventsStore from "./src/stores/eventsStore";


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
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>(''); // Updated type declaration
  const [notification, setNotification] = useState<Notifications.Notification | false>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  
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


    registerForPushNotificationsAsync().then((token: string | undefined) => {
      if (token) {
        runInAction(() => {
          eventsStore.setExpoPushToken(token);
        })
        setExpoPushToken(token);
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('notification', notification)
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Ofek what you want to do here?');
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
  return (
    <PaperProvider theme={theme}>
      <MainContainer/>
    </PaperProvider>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification bodyyyy',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
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
    console.log('finalStatus', finalStatus)

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}