import * as React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Button, Card } from "react-native-paper";
import userStore from "../../stores/userStore";
import { Colors } from "../../consts";


const SupervisorHomeScreen = ({ navigation }: any) => {
  return (
    <View style={{height:"100%"}}>
      <View style={{ padding: 10, marginBottom:20 }}>
        <Text style={{ color: "black", fontSize: 25, fontWeight:"500" }}>
          Hello , let's organize {userStore.user?.user_name}'s day!
        </Text>
      </View>
      <Card style={styles.container}>
        <View style={{ padding: 10 }}>
          <Text style={{ color: "black", fontSize: 18, fontWeight:"500" }}> Plan schedule</Text>
        </View>
        <Button
                  mode = "contained"
                  style={{width: 200, alignSelf:"center"}}
            onPress={() => navigation.navigate("Calendar")}
          > Add events +
          </Button>
      </Card>
      <Card style={styles.container}>
        <View style={{ padding: 10 }}>
          <Text style={{ color: "black", fontSize: 18, fontWeight:"500" }}> Give them some tasks</Text>
        </View>
        <Button
          style={{width: 200, alignSelf:"center"}}
          mode = "contained"
            onPress={() => navigation.navigate("ToDo")}
          > Add tasks +
          </Button>
      </Card>
      <Card style={styles.container}>
        <View style={{ padding: 10 }}>
          <Text style={{ color: "black", fontSize: 18, fontWeight:"500" }}> Want to update on their last events?</Text>
        </View>
        <Button
         style={{width: 200, alignSelf:"center"}}
            mode = "contained"
            onPress={() => navigation.navigate("ToDo")}
          > Go to Notes
          </Button>
      </Card>
    </View>
  );
};

export default SupervisorHomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginBottom: 5,
    height:120
  },
});
