import * as React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import HomeScreen from "./screens/HomeScreen";
import ToDoScreen from "./screens/ToDoScreen";
import NotesScreen from "./screens/NotesScreen";
import LogInScreen from "./screens/LogInScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
const TabNavigator = ()=>{
  return(
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "ToDo") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Notes") {
              iconName = focused ? "book" : "book-outline";
            }
            return <Ionicons name={iconName} size={size} color={"#E45082"} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="ToDo" component={ToDoScreen} />
        <Tab.Screen name="Notes" component={NotesScreen} />
      </Tab.Navigator>
  )
};
*/

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
