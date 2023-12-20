// Navigation.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import StackScreen from "./StackScreen";
import HiddenBottomScreen from "./HiddenBottomScreen";
import Top from "./components/Top";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={StackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatStack"
          component={HiddenBottomScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
