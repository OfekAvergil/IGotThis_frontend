import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from "react-native-paper";
import { Colors } from '../consts';
import Icon from 'react-native-paper/src/components/Icon'


const CurrentEventHeader = (props: { header: string, hour: string, note: string, handleExit: ()=>void, location?: string }) => {

  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection:"row",  alignItems:"center", marginTop: 20}}>
        <View style={{flex: 3, justifyContent:"flex-start",}}>
            <Text style={{ color: "white", fontSize: 30, fontWeight:"500" }}>{props.header}</Text>
          </View>
        <View  style={{flex: 1, flexDirection:"row",justifyContent:"flex-end"}}>
          <IconButton
                  icon="close"
                  iconColor="white"
                  onPress={props.handleExit}
                  style={{ height:22, width:22 }}/>
        </View>
      </View>
      <View style={{paddingVertical:15, flexDirection:"row"}}>
      <Icon source="clock" size={24} color={Colors.basicGrey} />

        <Text style={{ color: Colors.basicGrey, fontSize: 18, textAlign: "left", marginRight:15 }}> {props.hour}</Text>
        <Icon source="navigation-variant" size={24} color={Colors.basicGrey} />

        {props.location && <Text style={{ color: Colors.basicGrey, fontSize: 18, textAlign: "left" }}> {props.location}</Text>}
      </View>
      <View style={{flexDirection:"row", alignContent:"center"}}>
        <Icon source="exclamation" size={24} color="black" />
        <Text style={{color:"black", paddingRight:5, fontSize: 18,fontWeight:"500" }}>
          don't forget:
        </Text>
        <Text style={{color:Colors.basicGrey, fontSize: 18 }}>
          {props.note} 
        </Text>
      </View>

    </View>
  );
};

export default CurrentEventHeader;

const styles = StyleSheet.create({
    
    headerContainer: {
      flex: 1,
      alignItems: "flex-start",
      // justifyContent: 'space-evenly',
      padding: 20,
      backgroundColor: Colors.secondery,
      borderBottomWidth: 0,
      elevation: 0,
      width: "100%",
    },
  });