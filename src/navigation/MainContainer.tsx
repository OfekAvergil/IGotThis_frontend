import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { Colors, Pages } from "../consts";

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
import PickViewScreen from "./screens/PickViewScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator () {
  const [isSuperviosr, setIsSuperviosr] = React.useState(false);
  
  React.useEffect(() => {
    if(userStore.user?.isSuperviosr) setIsSuperviosr(true);
    else setIsSuperviosr(false);
  },[userStore.user?.isSuperviosr])

  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";
            if (route.name === Pages.Home) {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === Pages.Calendar) {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === Pages.ToDo) {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === Pages.Notes) {
              iconName = focused ? "book" : "book-outline";
            }
            return <Ionicons name={iconName} size={size} color={Colors.secondery} />;
          },
          header: () => (<Header />),
        })}
      >
         { isSuperviosr? 
         <Tab.Screen name={Pages.Home} component={SupervisorHomeScreen} /> 
        :
        <Tab.Screen name={Pages.Home} component={HomeScreen} /> 
        }
        <Tab.Screen name={Pages.Calendar} component={CalenderScreen} />
        <Tab.Screen name={Pages.ToDo} component={ToDoScreen} />
        <Tab.Screen name={Pages.Notes} component={NotesScreen} />
      </Tab.Navigator>
  );
};

export default function MainContainer() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Pages.Landing} component={LandingScreen} />
        <Stack.Screen name={Pages.Login} component={LogInScreen} />
        <Stack.Screen name={Pages.Register} component={RegisterScreen} />
        <Stack.Screen name={Pages.Info} component={infoScreen} />
        <Stack.Screen name={Pages.NavBar} component={TabNavigator} />
        <Stack.Screen name={Pages.GettingReady} component={GettingReadyScreen} />
        <Stack.Screen name={Pages.CurrentEvent} component={CurrentEventScreen} />
        <Stack.Screen name={Pages.Settings} component={SettingsPage} />
        <Stack.Screen name={Pages.Walkthrough} component={Walkthrough} />
        <Stack.Screen name={Pages.PickView} component={PickViewScreen} />
        <Stack.Screen name={Pages.ForgetPassword} component={ForgetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
