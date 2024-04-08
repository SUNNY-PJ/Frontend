import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxy_url } from "../../api/common";

const StompClientComponent = () => {
  const proxy = proxy_url;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connectWebSocket = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");

      const ws = new WebSocket(`ws://${proxy}/stomp`);
      console.log("???", ws);

      ws.onopen = () => {
        console.log("socket open");
        // 인증 토큰을 포함한 CONNECT 프레임 전송
        const connectFrame = JSON.stringify({
          type: "CONNECT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        ws.send(connectFrame);
        console.log(connectFrame);

        // SUBSCRIBE 프레임 전송
        const subscribeFrame = JSON.stringify({
          type: "SUBSCRIBE",
          destination: "/sub/user/15",
          id: "unique-id-1",
          ack: "auto",
        });
        ws.send(subscribeFrame);
        console.log(subscribeFrame);
      };

      ws.onmessage = (e) => {
        const receivedMsg = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, receivedMsg.body]);
        console.log("메세지 받았다!!!", receivedMsg);
      };

      ws.onerror = (e) => {
        console.error(e.message);
      };

      return () => {
        ws.close();
        console.log("socket close:::");
      };
    };

    connectWebSocket();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Received Messages:</Text>
      {messages.map((msg, index) => (
        <Text key={index} style={styles.message}>
          {msg}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
  },
});

export default StompClientComponent;
