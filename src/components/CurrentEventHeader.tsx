import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { Colors } from "../consts";
import Icon from "react-native-paper/src/components/Icon";

const CurrentEventHeader = (props: {
  header: string;
  hour: string;
  note?: string;
  handleExit: () => void;
  location?: string;
}) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{ flexDirection: "row", alignItems: "flex-start", marginTop: 20}}
      >
        <View style={{ flex: 4, justifyContent: "flex-start" }}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>
            {props.header}
          </Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <IconButton
            icon="close"
            iconColor="white"
            onPress={props.handleExit}
            style={{ height: 22, width: 22 }}
          />
        </View>
      </View>
      <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <View style={{paddingVertical:15, flexDirection:"row"}}>
          <Icon source="clock" size={24} color={Colors.basicGrey} />
          <Text style={{ color: Colors.basicGrey, fontSize: 18, textAlign: "left", marginRight:15 }}> {props.hour}</Text>
        </View>
        {props.location && 
        <View style={{paddingVertical:15, flexDirection:"row"}}>
          <Icon source="navigation-variant" size={24} color={Colors.basicGrey} />
          <Text style={{ color: Colors.basicGrey, fontSize: 18, textAlign: "left" }}> {props.location}</Text>
        </View>}
      </View>
    </View>
  );
};

export default CurrentEventHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: Colors.secondery,
    borderBottomWidth: 0,
    elevation: 0,
    width: "100%",
    height: "auto",
  },
});
