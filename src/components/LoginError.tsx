import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "../consts";
import userStore from "../stores/userStore";

const LoginError = () => {
  const [isErrorDisplayed, setErrorDisplayed] = useState(false);

  React.useEffect(() => {
    userStore.errorMessage === "" ? setErrorDisplayed(false):setErrorDisplayed(true);
  }, [userStore.errorMessage]);

  return (
    <View style={{ alignItems: "center", marginVertical:5}}>
      {isErrorDisplayed && (
        <Text style={{ color: Colors.pink }}>
          {userStore.errorMessage}
        </Text>
      )}
    </View>
  );
};

export default LoginError;
