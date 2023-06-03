import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import userStore from "../stores/userStore";


const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    userStore.user_name = null;
    userStore.user_password = null;
    console.log(navigation);
    navigation.navigate('Login');
  };

  return <Button style={styles.logOutButton} onPress={handleLogout}>
    <Text>
      Log Out
    </Text>
  </Button>;
};

export default LogoutButton;

const styles = StyleSheet.create({
  logOutButton: {
      height: 45    
  },
});
