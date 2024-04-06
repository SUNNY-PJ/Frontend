import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { proxy_url } from "../common";

const WebSocketComponent = () => {
  const proxy = proxy_url;

  useEffect(() => {
    const userId = 15;
    const ws = new WebSocket(`ws://${proxy}/sub/user/${userId}`);

    ws.onopen = () => {
      console.log("Connected to the server");
    };

    ws.onmessage = (e) => {
      // 서버로부터 메시지 받기
      const message = JSON.parse(e.data);
      console.log("Received message: ", message);
    };

    ws.onerror = (e) => {
      // 에러 처리
      console.log("WebSocket error: ", e.message);
    };

    ws.onclose = (e) => {
      // 연결 종료
      console.log("WebSocket closed: ", e.code, e.reason);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>WebSocket Example</Text>
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

export default WebSocketComponent;
