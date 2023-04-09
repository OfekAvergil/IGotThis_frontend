import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoutButton from './LogoutButton';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
        <View style={{flex: 3, justifyContent:"flex-start"}}>
            <Image
                style={{ width: 90, height: 60 }}
                source={require("../../assets/logo-noback.png")}
            />
        </View>
      <View  style={{flex: 1, justifyContent:"flex-end"}}>
         <LogoutButton />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: 5,
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      elevation: 0,
    },
  });