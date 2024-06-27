import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StompJs from "@stomp/stompjs";
import { proxyUrl } from "../../api/common";
import GoalMsg from "../../components/Modal/goal/goalMsg";
import { TextEncoder, TextDecoder } from "text-encoding";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const StompWebSocketComponent = () => {
  const [isOpenGoalMessage, setIsOpenGoalMessage] = useState(false);
  const [messageData, setMessageData] = useState({});

  useEffect(() => {
    const initializeWebSocket = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      const client = new StompJs.Client({
        webSocketFactory: () =>
          new WebSocket(`${proxyUrl.replace("http", "ws")}/stomp`),
        connectHeaders: {
          Authorization: `${accessToken}`,
        },
        onConnect: () => {
          console.log("Connected to the server");
          const userId = 15;
          client.subscribe(`/sub/user/${userId}`, (message) => {
            console.log("Received message:", message.body);
            const parsedMessage = JSON.parse(message.body);
            setMessageData(parsedMessage);
            setIsOpenGoalMessage(true);
          });
        },
        onStompError: (frame) => {
          console.error("Broker reported error:", frame.headers["message"]);
          console.error("Additional details:", frame.body);
        },
      });

      client.activate();
    };

    initializeWebSocket();
  }, []);

  return (
    <View style={styles.container}>
      <Text>STOMP WebSocket Example</Text>
      {isOpenGoalMessage && (
        <GoalMsg
          isOpenGoalMessage={isOpenGoalMessage}
          openGoalMessage={() => setIsOpenGoalMessage(false)}
          percentage={messageData.percentage}
          cost={messageData.goalSave}
          fail={messageData.percentage < 0}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StompWebSocketComponent;
