import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
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
  const [client, setClient] = useState(null); // STOMP 클라이언트를 상태로 관리
  const [message, setMessage] = useState(""); // 발행할 메시지 상태

  useEffect(() => {
    const initializeWebSocket = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      const stompClient = new StompJs.Client({
        webSocketFactory: () =>
          new WebSocket(`${proxyUrl.replace("http", "ws")}/stomp`),
        connectHeaders: {
          Authorization: `${accessToken}`,
        },
        onConnect: () => {
          console.log("Connected to the server");
          const userId = 1;
          stompClient.subscribe(`/sub/chat/${userId}`, (message) => {
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

      stompClient.activate();
      setClient(stompClient); // 클라이언트를 상태로 설정
    };

    initializeWebSocket();
  }, []);

  // 메시지 발행 함수
  const sendMessage = () => {
    if (client && client.connected) {
      const userId = 1;
      client.publish({
        destination: `/pub/chat/${userId}`,
        body: JSON.stringify({
          sendId: userId,
          message: message,
        }),
      });
      setMessage(""); // 발행 후 입력 필드 초기화
    }
  };

  return (
    <View style={styles.container}>
      <Text>STOMP WebSocket Example</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default StompWebSocketComponent;
