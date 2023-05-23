import * as React from "react";
import NextEvent from "../../components/NextEvent";
import NextTasks from "../../components/NextTasks";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";
import { Colors } from "../../consts";

const HomeScreen = () => {

  return (
    <View>
      <View style={{ flex: 1, marginBottom:"20", padding: 10,  height:'auto' }}>
        <Text style={{ color: "black", fontSize: 25, fontWeight:"500" }}>
          Hello {userStore.user_name} !
        </Text>
      </View>
      <NextEvent />
      <NextTasks />
      <View>
        <View style={{ flex: 1, marginBottom:"20", padding: 10,  height:'auto' }}>
            <Text style={{ flex: 1 }}> Need some help?</Text>
        </View>
        <View style={{  height:"auto", alignItems:"center", flexDirection:"row"}}>
          <View style={{ padding: "5px", height:"auto"}}>
            <Button
                icon = "phone"
                mode="contained"
                onPress={() =>{}}
                labelStyle={{ fontSize: 18 }}
                style={{ width:"195px", height:"80px", backgroundColor: Colors.secondary, justifyContent:"center"}}>
                <Text style={{color:"white", fontSize:18}}>
                  Call Help
                </Text>
            </Button>
          </View>
          <View style={{ padding: "5px", height:"auto"}}>
            <Button
                icon = "home"
                mode="outlined"
                onPress={() => {}}
                labelStyle={{ fontSize: 18, color:Colors.secondary }}
                style={{ width:"195px", height:"80px", borderColor: Colors.secondary ,justifyContent:"center" }}>
              <Text style={{color: Colors.secondary,  fontSize:18}}>
                Navigate Home
              </Text>
            </Button>
            </View>

        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
