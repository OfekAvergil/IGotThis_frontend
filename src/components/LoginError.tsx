import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "../consts";
import userStore from "../stores/userStore";

const LoginError = () => {
  const [isErrorDisplayed, setErrorDisplayed] = useState(false);

  React.useEffect(() => {
    setErrorDisplayed(userStore.errorMessage);
  }, [userStore.errorMessage]);

  return (
    <View style={{ alignItems: "center", marginVertical:5}}>
      {isErrorDisplayed && (
        <Text style={{ color: Colors.pink }}>
          mail or password are incorrect
        </Text>
      )}
    </View>
  );
};

export default LoginError;
