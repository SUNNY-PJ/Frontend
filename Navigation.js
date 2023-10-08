import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Splash from "./screen/splash";
import FriendsList from "./constant/friendsList";
import Note from "./constant/note";
import Statistics from "./constant/statistics";
import Top from "./components/Top";
import Bottom from "./components/Bottom";
import Login from "./screen/Login";
import SignUp from "./constant/SignUp";
import Kakao from "./constant/kakao";
import Spending from "./constant/spending";
import History from "./constant/history";
import ApiTest from "./constant/apiTest";
import Community from "./constant/Community/community";

const Stack = createStackNavigator();

function StackScreen() {
  return (
    // <Stack.Navigator initialRouteName="Splash">
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Top {...props} />,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kakao"
        component={Kakao}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="FriendsList" component={FriendsList} />
      <Stack.Screen name="Note" component={Note} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Spending" component={Spending} />
      <Stack.Screen name="ApiTest" component={ApiTest} />
      <Stack.Screen name="Community" component={Community} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomStack() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Community" component={Community} />
      <BottomTab.Screen name="Statistics" component={Statistics} />
      <BottomTab.Screen name="ApiTest" component={ApiTest} />
    </BottomTab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <StackScreen />
      <Bottom />
    </NavigationContainer>
  );
}

export default Navigation;
