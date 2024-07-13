import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import apiClient from "../../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Client } from "@stomp/stompjs";
import Line from "../../components/Line";
import { SOCKET_URI } from "../../api/common";

const ChatRoom3 = () => {
  const navigation = useNavigation();
  const [client, setClient] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [roomId, setRoomId] = useState(1);
  const [userIds, setUserIds] = useState(34);
  const sendUserId = 30;
  const scrollViewRef = useRef();

  // 대화 내용 조회
  const fetchData = async () => {
    const inputURL = `/chat/${roomId}`;

    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        // params: { userId: profile.id },
      });

      const chatData = response.data;
      console.log("대화 내용 :::", chatData);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            subscribeToRoom(client, roomId);
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
  }, []);

  const subscribeToRoom = (client, roomId) => {
    client.subscribe(`/sub/room/${roomId}`, (message) => {
      console.log("Received message:", message);
      try {
        const parsedMessage = JSON.parse(message.body);
        setReceivedMessages((prevMessages) => [...prevMessages, parsedMessage]);
      } catch (error) {
        console.error("Failed to parse message body:", message.body);
      }
    });
  };

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
    if (client && client.connected) {
      if (!roomId) {
        // 채팅방이 없으면 생성
        createRoom();
      } else {
        // 채팅방이 있으면 메시지 전송
        client.publish({
          destination: "/pub/chat/message/room",
          body: JSON.stringify({
            roomId: roomId,
            sendUserId: sendUserId,
            message: currentMessage,
          }),
        });
        console.log(`Message sent: ${currentMessage}`);
        setCurrentMessage("");
      }
    } else {
      console.log("Client not connected or roomId not set");
    }
  };

  const handleChatList = () => {
    navigation.navigate("MainScreen", { screen: "ChatList" });
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [receivedMessages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.container}>
        <ScrollView style={[styles.messagesContainer]} ref={scrollViewRef}>
          <View
            style={{
              alignItems: "center",
              gap: 16,
              paddingBottom: 60,
              paddingTop: 68,
            }}
          >
            <View
              style={{
                backgroundColor: "#6ADCA3",
                borderWidth: 3,
                borderBottomWidth: 4.5,
                borderRightWidth: 4.5,
                borderColor: "#1F1F1F",
                borderRadius: 55,
                paddingBottom: 9,
                paddingTop: 9,
                paddingRight: 18,
                paddingLeft: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1F1F1F",
                  fontFamily: "SUITE_Bold",
                }}
              >
                Today
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={handleChatList}>
                <Image
                  source={require("../../assets/prevBtn.png")}
                  style={{ width: 24, height: 24, bottom: 11 }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#5C5C5C",
                  textAlign: "center",
                }}
              >
                "친구가 아닌 사용자입니다. 친구를 맺을까요?"
              </Text>
              <Image
                source={require("../../assets/infoCircle.png")}
                style={{ width: 24, height: 24, bottom: 11 }}
              />
            </View>
          </View>

          {receivedMessages.map((message, index) => (
            <View key={index}>
              {!message.isMine && (
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Image
                    source={require("../../assets/Avatar.png")}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#1F1F1F",
                      paddingTop: 3,
                    }}
                  >
                    민지
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: message.isMine ? "flex-end" : "flex-start",
                  // marginVertical: 5,
                }}
              >
                {message.isMine && (
                  <Text style={[styles.time, { marginRight: 8 }]}>
                    {message.time}
                  </Text>
                )}
                <View
                  style={[
                    message.isMine ? styles.message : styles.friendMessage,
                    { marginBottom: 25 },
                  ]}
                >
                  <Text>{message.text}</Text>
                </View>
                {!message.isMine && (
                  <Text style={[styles.time, { marginLeft: 8, bottom: 25 }]}>
                    {message.time}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        <Line h={1} color={"#C1C1C1"} />
        <View
          style={{
            paddingLeft: 22,
            paddingRight: 22,
            paddingTop: 20,
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={currentMessage}
              onChangeText={setCurrentMessage}
              placeholder="메시지를 입력해주세요"
            />
            <TouchableOpacity onPress={sendMessage}>
              <Image
                source={require("../../assets/chatSend.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFBF6",
    // paddingTop: 68,
  },
  messagesContainer: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 9,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "#1F1F1F",
    backgroundColor: "#fff",
    flex: -1,
    alignSelf: "flex-end",
    maxWidth: "60%",
  },
  friendMessage: {
    marginVertical: 5,
    borderRadius: 9,
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: "#1F1F1F",
    padding: 10,
    backgroundColor: "#E8E9E8",
    flex: -1, // 내용물에 따라 크기 조정
    alignSelf: "flex-start", // 메시지를 왼쪽 정렬
    maxWidth: "60%",
    marginLeft: 49,
    bottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderColor: "#C1C1C1",
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 19,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontWeight: 700,
    color: "#5C5C5C",
    // padding: 10,
  },
  icon: {
    width: 20,
    height: 21,
    marginLeft: 10,
  },
  time: {
    fontSize: 10,
    fontWeight: 500,
    color: "#C1C1C1",
    alignSelf: "flex-end",
    marginBottom: 25,
  },
});

export default ChatRoom3;
