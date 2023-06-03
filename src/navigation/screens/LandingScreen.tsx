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
    <View style={styles.container}>
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../../../assets/landingBack.png")}
    >
      <View style={styles.buttonsContainer}>
        <View style={{ alignItems:"center",}}>
          <View style={{ padding: 10}}>
            <Button
                mode="contained"
                onPress={() => navigation.navigate("Register")}
                style={{ 
                  width:250, 
                  height:60, 
                  backgroundColor: Colors.secondery, 
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
                  borderColor: Colors.secondery,
                  justifyContent:"center" 
                }}>
                <Text style={{color: Colors.secondery,  fontSize:18}}>
                  Login
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
