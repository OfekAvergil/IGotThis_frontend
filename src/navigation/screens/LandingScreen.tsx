import React, { useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";

const LandingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../../assets/landingBack.png")}
    >
      <View style={styles.container}>
        <View style={{marginBottom:"80px",  height:"auto", alignItems:"center",}}>
          <View style={{ padding: "10px", height:"auto"}}>
          <Button
              mode="contained"
              onPress={() => navigation.navigate("Register")}
              style={{ width:"250px", height:"60px", backgroundColor:"#6029D2", justifyContent:"center"}}
          >
              <Text style={{color:"white", fontWeight:"600", fontSize:18}}>
                SIGN ME IN !
              </Text>
          </Button>
          </View>
          <View style={{ padding: "10px", height:"auto"}}>

          <Button
              mode="outlined"
              onPress={() => navigation.navigate("Login")}
              style={{ width:"250px", height:"60px", borderColor:"#6029D2" ,justifyContent:"center" }}
          >
            <Text style={{color:"#6029D2",  fontSize:18}}>
              Login
            </Text>
          </Button>
          </View>

        </View>
      </View>
    </ImageBackground>
  </SafeAreaView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent:"flex-end"
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
