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
  Keyboard,
} from "react-native";
import apiClient from "../../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Client } from "@stomp/stompjs";
import Line from "../../components/Line";
import { DEV_SOCKET_URI, SOCKET_URI } from "../../api/common";
import styles from "./chatRoom3.styles";
import useStore from "../../store/store";

const ChatRoom3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { friendsId } = route.params.params;
  console.log("친구 아이디다 :::", friendsId);
  const profile = useStore((state) => state.profile);
  const [client, setClient] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [roomId, setRoomId] = useState(2);
  const [userIds, setUserIds] = useState(1);
  const sendUserId = profile.id;
  const scrollViewRef = useRef();
  const myId = profile.id;

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const dateParts = dateString.split("-");
    if (dateParts.length !== 3) return dateString;

    const isoDateString = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T00:00:00Z`;
    const date = new Date(isoDateString);
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    const [month, day] = formattedDate.split(".");
    return `${month}월 ${day}일`;
  };

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

      const updatedChatData = chatData.flatMap((group) => {
        const formattedDate = formatDate(group.createDate);
        return group.messages.map((message) => ({
          ...message,
          isMine: message.userId === myId,
          formattedDate,
        }));
      });

      setReceivedMessages(updatedChatData);
      scrollToEnd();
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [roomId]);

  useEffect(() => {
    const initializeWebSocket = async () => {
      const token = await AsyncStorage.getItem("access_token");
      setAccessToken(token);

      const client = new Client({
        brokerURL: `ws://${DEV_SOCKET_URI}/stomp`,
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
                console.log("Parsed message:", parsedMessage);
                const formattedDate = formatDate(
                  new Date().toISOString().split("T")[0]
                );
                setReceivedMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    id: parsedMessage.id,
                    message: parsedMessage.message,
                    userId: parsedMessage.userId,
                    nickname: parsedMessage.nickname,
                    time: parsedMessage.time,
                    isMine: parsedMessage.userId === myId,
                    formattedDate,
                  },
                ]);
                console.log("Updated received messages:", receivedMessages);
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
      client.publish({
        destination: "/pub/chat/message/users",
        body: JSON.stringify({
          users: userIds,
          sendUserId: sendUserId,
          message: "새로운 채팅방이 생성되었습니다.",
        }),
      });
      console.log(`Room creation message sent for users: ${userIds}`);
    } else {
      console.log("Client not connected");
    }
  };

  useEffect(() => {
    createRoom();
  }, [client]);

  const sendMessage = () => {
    if (client && client.connected && roomId) {
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
      scrollToEnd();
    } else {
      console.log("Client not connected or roomId not set");
    }
  };

  const handleChatList = () => {
    navigation.navigate("MainScreen", { screen: "ChatList" });
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      scrollToEnd
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      scrollToEnd
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [receivedMessages]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleChatList}>
        <Image
          source={require("../../assets/prevBtn.png")}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          style={[styles.messagesContainer]}
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: 70 }}
        >
          {receivedMessages.map((message, index) => {
            const showProfileAndName =
              index === 0 ||
              receivedMessages[index - 1].userId !== message.userId;

            const showDate =
              index === 0 ||
              receivedMessages[index - 1].formattedDate !==
                message.formattedDate;

            return (
              <View key={index} style={styles.messageContainer}>
                {showDate && message.formattedDate && (
                  <View style={styles.dateSection}>
                    <Text style={styles.date}>{message.formattedDate}</Text>
                  </View>
                )}
                {message.isMine ? (
                  <View style={{ alignItems: "flex-end" }}>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                      <View style={styles.message}>
                        <Text style={styles.msgText}>{message.message}</Text>
                      </View>
                      <Text style={[styles.time]}>{message.time}</Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    {showProfileAndName && (
                      <View style={styles.friendMessageContainer}>
                        <Image
                          source={require("../../assets/Avatar.png")}
                          style={styles.avatar}
                        />
                        <Text style={styles.friendsName}>
                          {message.nickname}
                        </Text>
                      </View>
                    )}
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      <View style={styles.friendMessage}>
                        <Text style={styles.msgText}>{message.message}</Text>
                      </View>
                      <Text
                        style={[
                          styles.time,
                          { marginLeft: 8, bottom: 18, left: 45 },
                        ]}
                      >
                        {message.time}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
        <Line h={1} color={"#C1C1C1"} />
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={currentMessage}
              onChangeText={setCurrentMessage}
              placeholder="메시지를 입력해주세요"
              onFocus={scrollToEnd}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Image
                source={require("../../assets/chatSend.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom3;
