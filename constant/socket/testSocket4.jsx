import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as StompJs from "@stomp/stompjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxy_url } from "../../api/common";

const StompWebSocketComponent2 = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const initializeChat = async () => {
      // accessToken을 비동기적으로 검색
      const accessToken = await AsyncStorage.getItem("access_token");

      const stomp = new StompJs.Client({
        brokerURL: `ws://${proxy_url}stomp`,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: (str) => {
          console.log("11111", str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stomp.onConnect = () => {
        console.log("WebSocket 연결이 열렸습니다.");
        const userId = 15;
        const subscriptionDestination = `/sub/user/${userId}`;

        stomp.subscribe(subscriptionDestination, (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            console.log(parsedMessage);
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          } catch (error) {
            console.error("메시지 파싱 오류:", error);
          }
        });

        setStompClient(stomp);
      };

      // STOMP 클라이언트 활성화
      stomp.activate();
    };

    initializeChat();

    return () => {
      // 컴포넌트 언마운트 시 연결 해제
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>STOMP WebSocket ::: </Text>
      {/* 메시지 출력 등 추가 기능 구현 */}
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

export default StompWebSocketComponent2;
