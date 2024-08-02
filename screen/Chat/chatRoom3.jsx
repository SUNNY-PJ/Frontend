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
import { formatDate } from "../../utils/dateUtils";

const ChatRoom3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const scrollViewRef = useRef();

  // 친구 아이디
  const { chatRoomId } = route.params;
  console.log("채팅방 아이디 :::", chatRoomId);

  // 본인 아이디
  const profile = useStore((state) => state.profile);
  const myId = profile.id;

  const [client, setClient] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  // 대화 내용 조회
  const fetchData = async () => {
    const inputURL = `/chat/${chatRoomId}`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: { userId: myId },
      });

      const chatData = response.data;
      console.log("대화 내용 >>>", chatData);

      const updatedChatData = chatData.flatMap((group) => {
        const formattedDate = formatDate(group.createDate);
        console.log("날짜 >>>", formattedDate);
        return group.messages.map((message) => ({
          ...message,
          id: message.id,
          userId: message.userId,
          message: message.message,
          nickname: message.nickname,
          profile: message.profile,
          time: message.time,
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
  }, [chatRoomId]);

  // 소캣 연결
  useEffect(() => {
    const initializeWebSocket = async () => {
      const token = await AsyncStorage.getItem("access_token");

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
          if (chatRoomId) {
            client.subscribe(`/sub/room/${chatRoomId}`, (message) => {
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
                    profile: parsedMessage.profile,
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
  }, [chatRoomId]);

  // 이건 친구 프로필에서 채팅방 유무 확인하고 진행되어야하는 로직
  // const createRoom = () => {
  //   if (client && client.connected) {
  //     client.publish({
  //       destination: "/pub/chat/message/users",
  //       body: JSON.stringify({
  //         users: friendsId,
  //         sendUserId: myId,
  //         message: "새로운 채팅방이 생성되었습니다.",
  //       }),
  //     });
  //     console.log(`Room creation message sent for users: ${friendsId}`);
  //   } else {
  //     console.log("Client not connected");
  //   }
  // };

  // useEffect(() => {
  //   createRoom();
  // }, [client]);

  const sendMessage = () => {
    if (client && client.connected && chatRoomId) {
      client.publish({
        destination: "/pub/chat/message/room",
        body: JSON.stringify({
          roomId: chatRoomId,
          sendUserId: myId,
          message: currentMessage,
        }),
      });
      console.log(`Message sent: ${currentMessage}`);
      setCurrentMessage("");
      scrollToEnd();
    } else {
      console.log("Client not connected or chatRoomId not set");
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
                          source={{ uri: message.profile }}
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
