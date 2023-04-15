import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import userStore from "../stores/userStore";


const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    userStore.user_name = null;
    userStore.user_password = null;
    console.log(navigation);
    navigation.navigate('Login');
  };

  return <Button onPress={handleLogout}>Log Out</Button>;
};

export default LogoutButton;

const styles = StyleSheet.create({
  logOutButton: {
    width: 30,
  },
  logOutButtonText: {
    color: "grey",
  },
});
