import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client } from "@stomp/stompjs";
import { SOCKET_URI } from "../../api/common";
import { TextDecoder, TextEncoder } from "text-encoding";

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

// 사용자 아이디
// 30 예림
// 31 선웅
// 34 수연

const WebSocket3 = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [userIds, setUserIds] = useState("");
  const sendUserId = 30;

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
          if (roomId) {
            client.subscribe(`/sub/room/${roomId}`, (message) => {
              console.log("Received message:", message);
              try {
                const parsedMessage = JSON.parse(message.body);
                setReceivedMessages((prevMessages) => [
                  ...prevMessages,
                  parsedMessage,
                ]);
              } catch (error) {
                console.error("Failed to parse message body:", message.body);
              }
            });
          }
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
  }, [roomId]);

  const createRoom = () => {
    if (client && client.connected) {
      const usersArray = userIds.split(",").map((id) => parseInt(id.trim()));
      client.publish({
        destination: "/pub/chat/message/users",
        body: JSON.stringify({
          users: usersArray,
          sendUserId: sendUserId,
          message: "새로운 채팅방이 생성되었습니다.",
        }),
      });
      console.log(`Room creation message sent for users: ${usersArray}`);
    } else {
      console.log("Client not connected");
    }
  };

  const sendMessage = () => {
    if (client && client.connected && roomId) {
      client.publish({
        destination: "/pub/chat/message/room",
        body: JSON.stringify({
          roomId: roomId,
          sendUserId: sendUserId,
          message: message,
        }),
      });
      console.log(`Message sent: ${message}`);
      setMessage("");
    } else {
      console.log("Client not connected or roomId not set");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={userIds}
        onChangeText={setUserIds}
        placeholder="Enter user IDs (comma separated)"
        style={styles.input}
      />
      <Button title="Create Room" onPress={createRoom} />
      <TextInput
        value={String(roomId || "")}
        onChangeText={(text) => setRoomId(Number(text))}
        placeholder="Enter room ID"
        style={styles.input}
      />
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
