import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LogoutButton from './LogoutButton';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../consts';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
        <View style={{flex: 2, justifyContent:"flex-start"}}>
            <Image
                style={{ width: 90, height: 60 }}
                source={require("../../assets/logo-noback.png")}
            />
        </View>
      <View  style={{flex: 1, flexDirection:"row", justifyContent:"flex-end"}}>
        <IconButton
          icon="account"
          iconColor={Colors.primary}
          onPress={() => {
            console.log(navigation);
            navigation.navigate('Settings');  
          }}
          style={{ height:22, width:22 }}/>
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
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderColor: Colors.basicGrey,
      elevation: 0,
      paddingTop: 55,
      paddingBottom:30,
    },
  });