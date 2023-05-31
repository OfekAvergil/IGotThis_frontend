import * as React from "react";
import NextEvent from "../../components/NextEvent";
import NextTasks from "../../components/NextTasks";
import {
  View,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import userStore from "../../stores/userStore";
import { Colors } from "../../consts";

const HomeScreen = () => {

  return (
    <View>
      <View style={{ flex: 1, marginBottom:20, padding: 10 }}>
        <Text style={{ color: "black", fontSize: 25, fontWeight:"500" }}>
          Hello {userStore.user_name} !
        </Text>
      </View>
      <NextEvent />
      <NextTasks />
      <View>
        <View style={{ flex: 1, marginBottom:20, padding: 10, }}>
            <Text style={{ flex: 1 }}> Need some help?</Text>
        </View>
        <View style={{   alignItems:"center", flexDirection:"row"}}>
          <View style={{ padding: 5, }}>
            <Button
                icon = "phone"
                mode="contained"
                onPress={() =>{}}
                labelStyle={{ fontSize: 18 }}
                style={{ width:195, height:80, backgroundColor: Colors.secondary, justifyContent:"center"}}>
                <Text style={{color:"white", fontSize:18}}>
                  Call Help
                </Text>
            </Button>
          </View>
          <View style={{ padding: 5}}>
            <Button
                icon = "home"
                mode="outlined"
                onPress={() => {}}
                labelStyle={{ fontSize: 18, color:Colors.secondary }}
                style={{ width:195, height:80, borderColor: Colors.secondary ,justifyContent:"center" }}>
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
