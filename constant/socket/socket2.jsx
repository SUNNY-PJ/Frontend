import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client } from "@stomp/stompjs";
import { proxy_url } from "../../api/common";
import { TextDecoder, TextEncoder } from "text-encoding";

// 글로벌 스코프에 TextDecoder와 TextEncoder를 추가
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

const WebSocket2 = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");

  console.log("receivedMessage ::::", receivedMessage);

  useEffect(() => {
    const initializeWebSocket = async () => {
      const token = await AsyncStorage.getItem("access_token");
      setAccessToken(token);

      const client = new Client({
        brokerURL: `ws://43.201.176.22:8081/chat`,

        debug: (str) => {
          console.log(new Date(), str);
        },
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("Connected to the server");
          client.subscribe("/sub/chat/1", (message) => {
            console.log("Received message:", message);
            try {
              const parsedMessage = JSON.parse(message.body);
              console.log("Parsed message:", parsedMessage);
              setReceivedMessage(
                parsedMessage.message ||
                  "No message field in the received object"
              );
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
  }, []);

  const sendMessage = () => {
    if (client && client.connected) {
      client.publish({
        destination: "/pub/chat/1",
        body: JSON.stringify({
          sendId: 1,
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
      <Text>Received Message: {receivedMessage}</Text>
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

export default WebSocket2;
