import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import userStore from "../../stores/userStore";
import { Strings } from "../../consts";


const SupervisorHomeScreen = ({ navigation }: any) => {
  return (
    <View style={{height:"100%"}}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: "black", fontSize: 25, fontWeight:"500" }}>
          Hello {userStore.user?.user_name}, {Strings.organize_day}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 10 }}>
          <Text>{Strings.plan_schedule}</Text>
        </View>
        <Button
            onPress={() => navigation.navigate("Calendar")}
          > {Strings.add_events}
          </Button>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 10 }}>
          <Text> {Strings.give_tasks} </Text>
        </View>
        <Button
            onPress={() => navigation.navigate("ToDo")}
          > {Strings.add_tasks}
          </Button>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ padding: 10 }}>
          <Text> {Strings.update_events} </Text>
        </View>
        <Button
            onPress={() => navigation.navigate("ToDo")}
          > {Strings.go_to_notes}
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
