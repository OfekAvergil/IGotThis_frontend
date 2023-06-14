import * as React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Button } from "react-native-paper";
import userStore from "../../stores/userStore";
import { Colors } from "../../consts";


const SupervisorHomeScreen = ({ navigation }: any) => {
  return (
    <View style={{height:"100%"}}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: "black", fontSize: 25, fontWeight:"500" }}>
          Hello {userStore.user?.user_name}, let's organize their day!
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 10 }}>
          <Text> Plan their schedule</Text>
        </View>
        <Button
            onPress={() => navigation.navigate("Calendar")}
          > Add events
          </Button>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 10 }}>
          <Text> Give them some tasks</Text>
        </View>
        <Button
            onPress={() => navigation.navigate("ToDo")}
          > Add tasks
          </Button>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 10 }}>
          <Text> Want to update on their last events?</Text>
        </View>
        <Button
            onPress={() => navigation.navigate("ToDo")}
          > Go to Notes
          </Button>
      </View>
    </View>
  );
};

export default SupervisorHomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginBottom: 5,
  },
});
