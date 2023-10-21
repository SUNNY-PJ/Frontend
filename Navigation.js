import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Splash from "./screen/splash";
import FriendsList from "./screen/Friends/friendsList";
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
import Community from "./screen/Community/community";
import MyPage from "./screen/MyPage/myPage";
import SettingProfile from "./screen/MyPage/settingProfile";
import MyInfo from "./screen/MyPage/myInfo";
import MyScrap from "./screen/MyPage/myScrap";
import MyWrite from "./screen/MyPage/myWrite";
import MyComment from "./screen/MyPage/myComment";
import FriendProfile from "./screen/Friends/friendProfile";

const Stack = createStackNavigator();

function StackScreen() {
  return (
    // <Stack.Navigator initialRouteName="Splash">
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Top {...props} />,
      }}
    >
      {/* <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      /> */}
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
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="SettingProfile" component={SettingProfile} />
      <Stack.Screen name="MyInfo" component={MyInfo} />
      <Stack.Screen name="MyScrap" component={MyScrap} />
      <Stack.Screen name="MyWrite" component={MyWrite} />
      <Stack.Screen name="MyComment" component={MyComment} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FriendProfile"
        component={FriendProfile}
      />
    </Stack.Navigator>
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
