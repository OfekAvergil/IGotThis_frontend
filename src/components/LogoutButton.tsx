import { ParamListBase, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import userStore from "../stores/userStore";
import { Pages, Strings } from "../consts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const LogoutButton = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    userStore.logOut();
    navigate(Pages.Login);
  };

  return <Button style={styles.logOutButton} onPress={handleLogout}>
    <Text>
      {Strings.log_out_button}
    </Text>
  </Button>;
};

export default LogoutButton;

const styles = StyleSheet.create({
  logOutButton: {
      height: 45    
  },
});
