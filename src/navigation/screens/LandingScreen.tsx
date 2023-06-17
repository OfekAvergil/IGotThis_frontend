import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Button } from "react-native-paper";
import { Colors, Pages, Strings } from "../../consts";
import * as Notifications from 'expo-notifications';
import eventsStore, { event } from '../../stores/eventsStore';
import userStore from "../../stores/userStore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const LandingScreen = ({ navigation }: any) => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  
  useEffect(()=> {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('notification', notification)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const currentEvent: event =  response.notification.request.content.data as event;
      eventsStore.setCurrentEvent(currentEvent.id);
      console.log('current:', eventsStore.currentEventId)
      if(userStore.gettingReadyTime == '0'){
        navigation.navigate(Pages.CurrentEvent);  
      } else {
        navigation.navigate(Pages.GettingReady);  
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../../../assets/landingBack.png")}>
      <View style={styles.buttonsContainer}>
        <View style={{ alignItems:"center",}}>
          <View style={{ padding: 10}}>
            <Button
                mode="contained"
                onPress={() => navigation.navigate(Pages.Register)}
                style={{ 
                  width:250, 
                  height:60, 
                  backgroundColor: Colors.secondery, 
                  justifyContent:"center"}}>
                <Text style={{color:"white", fontWeight:"600", fontSize:18}}>
                  {Strings.sign_in_button}
                </Text>
            </Button>
          </View>
          <View style={{ padding: 10}}>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate(Pages.Login)}
                style={{ 
                  width:250, 
                  height:60, 
                  borderColor: Colors.secondery,
                  justifyContent:"center"}}>
                <Text style={{color: Colors.secondery,  fontSize:18}}>
                  {Strings.login_page_button}
                </Text>
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
      </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  buttonsContainer: {
    height:"100%",
    justifyContent:"flex-end",
    paddingBottom:50
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  centerContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
