import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as StompJs from "@stomp/stompjs";
import { TextEncoder, TextDecoder } from "text-encoding";
import { proxyUrl } from "../common";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const StompWebSocketComponent = () => {
  useEffect(() => {
    console.log(
      "stomp socket 실행함:::",
      `${proxyUrl.replace("http", "ws")}/ws/websocket`
    );
    const client = new StompJs.Client({
      webSocketFactory: () =>
        new WebSocket(`${proxyUrl.replace("http", "ws")}/ws/websocket`),
      onConnect: () => {
        console.log("Connected to the server");

        const userId = 15;
        client.subscribe(`/sub/user/${userId}`, (message) => {
          console.log("Received message:", message.body);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
      },
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  return (
    <View style={styles.container}>
      <Text>STOMP WebSocket Example</Text>
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
