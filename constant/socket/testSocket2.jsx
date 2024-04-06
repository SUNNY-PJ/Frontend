import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { proxy_url } from "../common";

const StompClientComponent = () => {
  const proxy = proxy_url;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // WebSocket 연결 열기
    const ws = new WebSocket(`ws://${proxy}/ws`);
    ws.onopen = () => {
      // STOMP 프레임을 사용하여 SUBSCRIBE
      const msg = JSON.stringify({
        type: "SUBSCRIBE",
        destination: "/sub/user/15", // 구독할 대상 주소
        id: "unique-id-1", // 구독 ID
        ack: "auto",
      });
      ws.send(msg);
    };

    ws.onmessage = (e) => {
      // 메시지 받기
      const receivedMsg = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, receivedMsg.body]);
    };

    ws.onerror = (e) => {
      // 에러 처리
      console.error(e.message);
    };

    return () => {
      ws.close();
    };
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
