import * as React from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is the Home screen")}
        style={{ fontSize: 30 }}
      >
        Home Screen
      </Text>
    </View>
  );
}