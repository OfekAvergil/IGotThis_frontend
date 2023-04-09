import * as React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import userStore from "../../stores/userStore";

export default function HomeScreen() {
  
  return (
    <>
      <Text
        onPress={() => alert("This is the Home screen")}
        style={{ fontSize: 30 }}
      >
        Home Screen
      </Text>
    </>
  );
}
