import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client } from "@stomp/stompjs";
import { proxy_url } from "../../constant/common";
import { TextDecoder, TextEncoder } from "text-encoding";

// 글로벌 스코프에 TextDecoder와 TextEncoder를 추가
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

const WebSocketComponent = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const initializeWebSocket = async () => {
      const token = await AsyncStorage.getItem("access_token");
      setAccessToken(token);

      const client = new Client({
        brokerURL: `ws://${proxy_url}/stomp`,
        connectHeaders: {
          Authorization: `${token}`,
        },
        debug: (str) => {
          console.log(new Date(), str);
        },
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("connected");
          client.subscribe("/sub/chat/1", (message) => {
            setReceivedMessage(message.body);
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
  }, []);

  const sendMessage = () => {
    if (client && client.connected) {
      client.publish({
        destination: "/pub/chat/1",
        body: JSON.stringify({
          sendId: "1",
          message: message,
        }),
      });
      console.log(`Message sent: ${message}`); // 메시지 전송 후 로그 출력
      setMessage(""); // 메시지 전송 후 입력 필드 초기화
    } else {
      console.log("Client not connected");
    }
  };

  return (
    <View>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
      />
      <Button title="Send Message" onPress={sendMessage} />
      <Text>Received Message: {receivedMessage}</Text>
    </View>
  );
};

export default WebSocketComponent;
