import * as React from "react";
import NextEvent from "../../components/NextEvent";
import NextTasks from "../../components/NextTasks";
import {
  View,
  Text,
  Linking,
} from "react-native";
import { Button } from "react-native-paper";
import userStore from "../../stores/userStore";
import { Colors } from "../../consts";

const HomeScreen = () => {

  const navigateHome = () => {
    const address = 'Yordei Hasira 47 Petach Tikva'; // Replace with your actual home address
  
    // Construct the Google Maps URL with the directions mode set to "transit" (bus)
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&dir_action=navigate&travelmode=transit`;
  
    // Open the Google Maps URL using the Linking module
    Linking.openURL(googleMapsUrl);
  };

  return (
    <View style={{height:"100%"}}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: "black", fontSize: 25, fontWeight:"500" }}>
          Hello {userStore.user_name} !
        </Text>
      </View>
      <NextEvent />
      <NextTasks />
      <View>
        <View style={{ marginBottom:10, padding: 10, }}>
            <Text> Need some help?</Text>
        </View>
        <View style={{ alignItems:"center", flexDirection:"row", padding: 10}}>
          <View style={{ paddingRight: 5, }}>
            <Button
                icon = "phone"
                mode="contained"
                onPress={() =>{}}
                labelStyle={{ fontSize: 16 }}
                style={{ width:175, height:80, backgroundColor: Colors.secondery, justifyContent:"center"}}>
                <Text style={{color:"white", fontSize:18}}>
                  Call Help
                </Text>
            </Button>
          </View>
          <View style={{ padding: 5}}>
            <Button
                icon = "home"
                mode="outlined"
                onPress={() => {navigateHome()}}
                labelStyle={{ fontSize: 16, color:Colors.secondery }}
                style={{ width:175, height:80, borderColor: Colors.secondery ,justifyContent:"center" }}>
              <Text style={{color: Colors.secondery,  fontSize:18}}>
                Go Home 
              </Text>
            </Button>
            </View>

        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
