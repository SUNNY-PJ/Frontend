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
import { DEV_SOCKET_URI } from "../../api/common";
import styles from "./chatRoom3.styles";
import useStore from "../../store/store";
import { formatDate, formatTime } from "../../utils/dateUtils";
import FriendProfile from "../Friends/friendProfile";

const ChatRoom3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const scrollViewRef = useRef();

  const { chatRoomId, friendsId, friendsName } = route.params;
  console.log("채팅방 아이디 >>", chatRoomId);
  console.log("친구 아이디 >>", friendsId);
  console.log("친구 이름 >>", friendsName);

  const profile = useStore((state) => state.profile);
  const myId = profile.id;

  const [client, setClient] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [roomId, setRoomId] = useState(chatRoomId);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [friendId, setFriendId] = useState("");

  const handleProfileClick = (id) => {
    setFriendId(id);
    openProfile();
  };

  const openProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  // 대화 내용 조회
  const fetchData = async () => {
    const inputURL = `/chat/${roomId}`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        // params: { userId: myId },
      });

      const chatData = response.data;
      const updatedChatData = chatData.flatMap((group) => {
        const formattedDate = formatDate(group.createDate);
        return group.messages.map((message) => ({
          ...message,
          isMine: message.userId === myId,
          formattedDate,
          formattedTime: formatTime(`2024-08-04T${message.time}:00`),
        }));
      });

      setReceivedMessages(updatedChatData);
      scrollToEnd();
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  // 새로운 채팅방 생성
  const createChatRoom = async () => {
    const inputURL = `/chat/room`;
    try {
      const response = await apiClient.post(inputURL, {
        users: [myId, friendsId],
        sendUserId: myId,
        message: currentMessage,
      });

      setRoomId(response.data.chatRoomId);
      setReceivedMessages([
        {
          message: currentMessage,
          isMine: true,
          formattedDate: formatDate(new Date().toISOString().split("T")[0]),
          formattedTime: formatTime(new Date().toISOString()), // Ensure time is properly formatted
        },
      ]);
      scrollToEnd();
      initializeWebSocket(response.data.chatRoomId);
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  useEffect(() => {
    // 채팅방id가 있을 경우
    if (chatRoomId) {
      // 기존 데이터 세팅 후 소켓 연결
      fetchData();
      initializeWebSocket(chatRoomId);
    } else {
      // 없을 경우 채팅방 생성
      createChatRoom();
    }
  }, [chatRoomId]);

  // 소켓 연결
  const initializeWebSocket = async (chatRoomId) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token found");
      }

      const newClient = new Client({
        brokerURL: `ws://${DEV_SOCKET_URI}/stomp`,
        connectHeaders: {
          Authorization: `${token}`,
        },
        debug: (str) => console.log("WebSocket debug:", str),
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("Connected to the server");
          if (chatRoomId) {
            newClient.subscribe(`/sub/room/${chatRoomId}`, (message) => {
              try {
                const parsedMessage = JSON.parse(message.body);
                setReceivedMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    ...parsedMessage,
                    isMine: parsedMessage.userId === myId,
                    formattedDate: formatDate(
                      new Date().toISOString().split("T")[0]
                    ),
                    formattedTime: formatTime(new Date().toISOString()),
                  },
                ]);
                scrollToEnd();
              } catch (error) {
                console.error("Failed to parse message:", message.body);
              }
            });
          }
        },
        onStompError: (frame) => {
          console.error("STOMP error:", frame.headers["message"]);
          console.error("Additional details:", frame.body);
        },
        onWebSocketError: (evt) => {
          console.error("WebSocket error:", evt);
        },
        onWebSocketClose: (evt) => {
          console.log("WebSocket closed:", evt);
        },
      });

      newClient.activate();
      setClient(newClient);
    } catch (error) {
      console.error("Error initializing WebSocket:", error);
    }
  };

  // 메세지 전송
  const sendMessage = () => {
    if (client && client.connected && roomId) {
      client.publish({
        destination: "/pub/chat/message/room",
        body: JSON.stringify({
          roomId: roomId,
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
    // 소켓 연결 끊음
    if (client) {
      client.deactivate();
    }
    navigation.navigate("MainScreen", { screen: "ChatList" });
  };

  // 스크롤 마지막으로 이동
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
                      <Text style={[styles.time]}>{message.formattedTime}</Text>
                      <View style={styles.message}>
                        <Text style={styles.msgText}>{message.message}</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    {showProfileAndName && (
                      <TouchableOpacity
                        style={styles.friendMessageContainer}
                        onPress={() => {
                          handleProfileClick(message.userId);
                        }}
                      >
                        <Image
                          source={{ uri: message.profile }}
                          style={styles.avatar}
                        />
                        <Text style={styles.friendsName}>
                          {message.nickname}
                        </Text>
                      </TouchableOpacity>
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
                        {message.formattedTime}
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
      <FriendProfile
        isOpenProfile={isOpenProfile}
        openProfile={openProfile}
        userId={friendId}
      />
    </View>
  );
};

export default ChatRoom3;
