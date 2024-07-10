import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client } from "@stomp/stompjs";
import { SOCKET_URI } from "../../api/common";
import { TextDecoder, TextEncoder } from "text-encoding";

// 글로벌 스코프에 TextDecoder와 TextEncoder를 추가
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

const WebSocket3 = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [roomId, setRoomId] = useState(1); // roomId 초기값 설정

  console.log("receivedMessages ::::", receivedMessages);

  useEffect(() => {
    const initializeWebSocket = async () => {
      const token = await AsyncStorage.getItem("access_token");
      setAccessToken(token);

      const client = new Client({
        brokerURL: `ws://${SOCKET_URI}/stomp`,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => {
          console.log(new Date(), str);
        },
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("Connected to the server");
          // <--- 구독 --->
          // roomId를 아는 경우
          client.subscribe(`/sub/room/${roomId}`, (message) => {
            console.log("Received message:", message);
            try {
              const noParsedMessage = message.body;
              const parsedMessage = JSON.parse(message.body);
              console.log("No Parsed message:", noParsedMessage);
              console.log("Parsed message:", parsedMessage);
              setReceivedMessages((prevMessages) => [
                ...prevMessages,
                parsedMessage,
              ]);
            } catch (error) {
              console.error("Failed to parse message body:", message.body);
            }
          });
        },
        onStompError: (frame) => {
          console.error("STOMP error", frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        },
        onWebSocketError: (evt) => {
          console.error("WebSocket error", evt);
        },
        onWebSocketClose: (evt) => {
          console.log("WebSocket closed", evt);
        },
      });

      client.activate();
      setClient(client);
    };

    initializeWebSocket();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [roomId]); // roomId가 변경될 때마다 WebSocket을 재초기화

  const sendMessage = () => {
    if (client && client.connected) {
      // <--- 발행 --->
      client.publish({
        destination: "/pub/chat/message/room",
        body: JSON.stringify({
          roomId: roomId,
          sendUserId: 30,
          message: message,
        }),
      });
      console.log(`Message sent: ${message}`);
      setMessage("");
    } else {
      console.log("Client not connected");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
        style={styles.input}
      />
      <Button title="Send Message" onPress={sendMessage} />
      <Text>Received Messages:</Text>
      {receivedMessages.map((msg, index) => (
        <Text key={index}>
          {msg.nickname}: {msg.message}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default WebSocket3;
