import * as React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from "./screens/HomeScreen";
import ToDoScreen from "./screens/ToDoScreen";
import NotesScreen from "./screens/NotesScreen";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "ToDo") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Notes") {
              iconName = focused ? "book" : "book-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="ToDo" component={ToDoScreen} />
        <Tab.Screen name="Notes" component={NotesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
