import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screen/Login";
import Kakao from "./constant/kakao";

const Stack = createStackNavigator();

function KakaoScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Kakao" component={Kakao} />
    </Stack.Navigator>
  );
}

export default KakaoScreen;
