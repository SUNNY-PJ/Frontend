import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CommunityProvider } from "./context/communityContext";
import MainScreen from "./MainScreen";
import SignUpScreen from "./SignUpScreen";
import ChatScreen from "./ChatScreen";
import KakaoScreen from "./KakaoScreen";
import { SaveDataProvider } from "./context/saveDataContext";

const Stack = createStackNavigator();

function Navigation({ isSignedIn }) {
  return (
    <CommunityProvider>
      <SaveDataProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isSignedIn ? (
              <>
                {/* 로그인 상태 */}
                <Stack.Screen
                  name="MainScreen"
                  component={MainScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                {/* 비로그인 상태 */}
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
              </>
            )}
            {/* <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{ headerShown: false }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SaveDataProvider>
    </CommunityProvider>
  );
}

export default Navigation;
