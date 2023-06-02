import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from "react-native-paper";
import { Colors } from '../consts';
import Icon from 'react-native-paper/src/components/Icon'


const CurrentEventHeader = (props: { header: string, hour: string, note: string, handleExit: ()=>void }) => {

  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection:"row", width:"100%", alignItems:"center"}}>
        <View style={{flex: 3, justifyContent:"flex-start",}}>
            <Text style={{ color: "white", fontSize: 25, fontWeight:"500" }}>{props.header}</Text>
          </View>
        <View  style={{flex: 1, flexDirection:"row",justifyContent:"flex-end"}}>
          <IconButton
                  icon="close"
                  iconColor={Colors.basicGrey}
                  onPress={props.handleExit}
                  style={{ height:22, width:22 }}/>
        </View>
      </View>
      <View style={{paddingBottom:5}}>
        <Text style={{ color: Colors.basicGrey, fontSize: 18, textAlign: "left" }}> {props.hour}</Text>
      </View>
      <View style={{flexDirection:"row", width:"100%", alignItems:"center"}}>
      <Icon source="exclamation" size={24} color={Colors.primary} />
      <Text style={{color:Colors.primary,paddingRight:5 }}>
        don't forget:
      </Text>
      <Text style={{color:Colors.basicGrey, }}>
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
      alignItems: "left",
      justifyContent: 'space-evenly',
      padding: 20,
      backgroundColor: Colors.secondery,
      borderBottomWidth: 0,
      elevation: 0,
      width: "100%",
    },
  });