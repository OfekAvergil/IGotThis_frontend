import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from "react-native-paper";
import { Colors } from '../consts';

const LoginHeader = (props: { header: string }) => {

  return (
    <View style={styles.headerContainer}>
        <View style={{flex: 3, alignItems:"center"}}>
            <Image
                style={{ width: 150, height: 135 }}
                source={require("../../assets/whitelogo.png")}
            />
            <Text style={{ color: "white", fontSize: 18 }}>{props.header}</Text>
        </View>
    </View>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
    
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: 5,
      backgroundColor: Colors.secondary,
      borderBottomWidth: 0,
      elevation: 0,
      width: "100%",
    },
  });