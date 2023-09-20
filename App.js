import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsList from "./constant/friendsList";
import Note from "./constant/note";
import Statistics from "./constant/statistics";
import Top from "./components/Top";
import Bottom from "./components/Bottom";
import Login from "./constant/Login";
import Kakao from "./constant/kakao";

const Stack = createNativeStackNavigator();
// Stack object를 반환함. { Screen, Navigator }로 구성됨.

function App() {
  return (
    // NavigationContainer로 감싸야 함.
    <NavigationContainer>
      {/* <Top /> */}
      <Stack.Navigator
        initialRouteName="Note"
        screenOptions={{
          header: (props) => <Top {...props} />,
        }}
      >
        <Stack.Screen name="FriendsList" component={FriendsList} />
        <Stack.Screen name="Note" component={Note} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Kakao" component={Kakao} />
      </Stack.Navigator>
      <Bottom />
    </NavigationContainer>
  );
}

export default App;
