import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import  userStore from '../stores/userStore'

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Do something here to log out the user
    // userStore.clearUserData();
    // navigation.navigate('Login');
  };

  return (
        <Button
        onPress={() => {
            handleLogout();
        }}>
        <Text style={styles.logOutButtonText}>Log Out</Text>
    </Button>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
    logOutButton:{
        width: 30,
    },
    logOutButtonText: {
        color: "grey",
      },
  });