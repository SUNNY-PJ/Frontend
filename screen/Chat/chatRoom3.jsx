import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
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
import styles from "./chatRoom3.styels";
import useStore from "../../store/store";

const ChatRoom3 = () => {
  const navigation = useNavigation();
  const profile = useStore((state) => state.profile);
  const [client, setClient] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [roomId, setRoomId] = useState(1);
  const [userIds, setUserIds] = useState(34);
  const sendUserId = 30;
  const scrollViewRef = useRef();
  const myId = profile.id;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    const [month, day] = formattedDate.split(".");
    return `${month}월 ${day}일`;
  };

  // 대화 내용 조회
  const fetchData = async () => {
    const inputURL = `/chat/${roomId}`;

    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const chatData = response.data;
      console.log("대화 내용 :::", chatData);

      // 각 메시지에 isMine 플래그 추가 및 날짜 형식 변환
      const updatedChatData = chatData.map((group) => {
        return {
          ...group,
          createDate: formatDate(group.createDate),
          messages: group.messages.map((message) => ({
            ...message,
            isMine: message.userId === myId,
          })),
        };
      });

      setReceivedMessages(updatedChatData);
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
        <TouchableOpacity style={styles.backButton} onPress={handleChatList}>
          <Image
            source={require("../../assets/prevBtn.png")}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <ScrollView style={[styles.messagesContainer]} ref={scrollViewRef}>
          {/* <View style={styles.topSection}>
            <View style={styles.dateSection}>
              <Text style={styles.date}>Today</Text>
            </View>
          </View> */}
          {receivedMessages.map((messageGroup, groupIndex) => (
            <View key={groupIndex} style={{ marginBottom: 50 }}>
              <View style={styles.dateSection}>
                <Text style={styles.date}>{messageGroup.createDate}</Text>
              </View>
              {messageGroup.messages.map((message, messageIndex) => (
                <View key={messageIndex} style={styles.messageContainer}>
                  {!message.isMine && (
                    <View style={styles.friendMessageContainer}>
                      <Image
                        source={require("../../assets/Avatar.png")}
                        style={styles.avatar}
                      />
                      <Text style={styles.friendsName}>{message.nickname}</Text>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: message.isMine
                        ? "flex-end"
                        : "flex-start",
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
                      ]}
                    >
                      <Text>{message.message}</Text>
                    </View>
                    {!message.isMine && (
                      <Text
                        style={[
                          styles.time,
                          { marginLeft: 8, bottom: 18, left: 45 },
                        ]}
                      >
                        {message.time}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <Line h={1} color={"#C1C1C1"} />
        <View style={styles.inputSection}>
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

export default ChatRoom3;
