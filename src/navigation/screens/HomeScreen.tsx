import * as React from "react";
import { Text } from "react-native";

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
