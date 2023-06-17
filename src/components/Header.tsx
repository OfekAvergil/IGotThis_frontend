import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LogoutButton from './LogoutButton';
import { IconButton } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Colors, Pages } from '../consts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Header = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
            navigate(Pages.Settings);  
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