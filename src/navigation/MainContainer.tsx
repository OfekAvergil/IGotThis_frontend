import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { Colors } from "../consts";

//Screens
import HomeScreen from "./screens/HomeScreen";
import ToDoScreen from "./screens/ToDoScreen";
import NotesScreen from "./screens/NotesScreen";
import LogInScreen from "./screens/LogInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LandingScreen from "./screens/LandingScreen";
import CurrentEventScreen from "./screens/CurrentEventScreen";
import CalenderScreen from "./screens/CalendarScreen";
import SettingsPage from "./screens/SettingsScreen";
import GettingReadyScreen from "./screens/GettingReadyScreen";
import infoScreen from "./screens/infoScreen";
import Walkthrough from "./screens/WalkthroughScreen";
import userStore from "../stores/userStore";
import SupervisorHomeScreen from "./screens/SupervisorHomeScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator () {
  const [userType, setUserType] = React.useState(0);
  
  React.useEffect(() => {
    if(userStore.user?.isSuperviosr) setUserType(2);
    else setUserType(1);
  },[userStore.user?.isSuperviosr])

  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Calendar") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "ToDo") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Notes") {
              iconName = focused ? "book" : "book-outline";
            }
            return <Ionicons name={iconName} size={size} color={Colors.secondery} />;
          },
          header: () => (<Header />),
        })}
      >
         { userType === 2? 
         <Tab.Screen name="Home" component={HomeScreen} /> 
        :
        <Tab.Screen name="Home" component={SupervisorHomeScreen} /> 
        }
        <Tab.Screen name="Calendar" component={CalenderScreen} />
        <Tab.Screen name="ToDo" component={ToDoScreen} />
        <Tab.Screen name="Notes" component={NotesScreen} />
      </Tab.Navigator>
  );
};

export default function MainContainer() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Info" component={infoScreen} />
        <Stack.Screen name="NavBar" component={TabNavigator} />
        <Stack.Screen name="GettingReady" component={GettingReadyScreen} />
        <Stack.Screen name="CurrentEvent" component={CurrentEventScreen} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="Walkthrough" component={Walkthrough} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
