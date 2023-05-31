import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { Colors } from "../../consts";

const LandingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../../assets/landingBack.png")}
    >
      <View style={styles.container}>
        <View style={{marginBottom:80, alignItems:"center",}}>
          <View style={{ padding: 10}}>
            <Button
                mode="contained"
                onPress={() => navigation.navigate("Register")}
                style={{ 
                  width:250, 
                  height:60, 
                  backgroundColor: Colors.secondary, 
                  justifyContent:"center"
                }}>
                <Text style={{color:"white", fontWeight:"600", fontSize:18}}>
                  SIGN ME IN !
                </Text>
            </Button>
          </View>
          <View style={{ padding: 10}}>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate("Login")}
                style={{ 
                  width:250, 
                  height:60, 
                  borderColor: Colors.secondary,
                  justifyContent:"center" 
                }}>
                <Text style={{color: Colors.secondary,  fontSize:18}}>
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
