import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Bottom from "../components/Bottom";
import ChatRoom from "../screen/Chat/chatRoom";
import ChatRoom3 from "../screen/Chat/chatRoom3";

const Stack = createStackNavigator();

function ChatScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="ChatRoom3" component={ChatRoom3} />
    </Stack.Navigator>
  );
}

export default ChatScreen;
