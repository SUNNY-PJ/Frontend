import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Chat from "./screen/Chat/chat";
import Chat2 from "./screen/Chat/chat2";
import Bottom from "./components/Bottom";
import ChatRoom from "./screen/Chat/chatRoom";

const Stack = createStackNavigator();

function ChatScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Chat" component={Chat} /> */}
      <Stack.Screen name="Chat2" component={Chat2} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
}

export default ChatScreen;
