import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "./constant/SignUp";

const Stack = createStackNavigator();

function SignUpScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default SignUpScreen;
