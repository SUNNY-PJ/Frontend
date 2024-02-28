import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CommunityProvider } from "./context/communityContext";
import MainScreen from "./MainScreen";
import SignUpScreen from "./SignUpScreen";
import ChatScreen from "./ChatScreen";
import KakaoScreen from "./KakaoScreen";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <CommunityProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="KakaoScreen"
            component={KakaoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CommunityProvider>
  );
}

export default Navigation;
