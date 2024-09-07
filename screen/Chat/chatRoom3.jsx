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

  const { chatRoomId, friendsId, friendsName, chatMessageId } = route.params;

  const profile = useStore((state) => state.profile);
  const myId = profile.id;

  const [client, setClient] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [roomId, setRoomId] = useState(chatRoomId);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [friendId, setFriendId] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldestMessageId, setOldestMessageId] = useState(null);
  const [hasMoreMessages, setHasMoreMessages] = useState(true); // 더 불러올 메시지가 있는지 확인하는 상태

  const handleProfileClick = (id) => {
    setFriendId(id);
    openProfile();
  };

  const openProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  // 대화 내용 조회 (최신 또는 이전 메시지)
  const fetchData = async (loadMore = false) => {
    if (!hasMoreMessages || loading) return; // 불러올 메시지가 없거나 로딩 중일 경우 중복 호출 방지
    setLoading(true);

    const inputURL = `/chat/${roomId}`;
    const params = { size: 30 };

    if (loadMore && oldestMessageId) {
      params.chatMessageId = oldestMessageId; // 이전 메시지를 불러오기 위해 가장 오래된 메시지 ID를 파라미터로 보냄
    }

    try {
      const previousScrollHeight =
        scrollViewRef.current?.contentSize?.height || 0;

      const response = await apiClient.get(inputURL, { params });

      const chatData = response.data;
      const updatedChatData = chatData.flatMap((group) => {
        const formattedDate = formatDate(group.createDate);
        return group.messages.map((message) => ({
          ...message,
          isMine: message.userId === myId,
          formattedDate,
          formattedTime: formatTime(`2024-08-04T${message.time}:00`),
          showDate: true,
        }));
      });

      if (updatedChatData.length > 0) {
        if (loadMore) {
          setReceivedMessages((prevMessages) => [
            ...updatedChatData,
            ...prevMessages,
          ]);
          setOldestMessageId(updatedChatData[0].id);

          // 스크롤 위치 조정
          const newScrollHeight =
            scrollViewRef.current?.contentSize?.height || 0;
          const scrollHeightDifference = newScrollHeight - previousScrollHeight;
          scrollViewRef.current?.scrollTo({
            y: scrollHeightDifference,
            animated: false,
          });
        } else {
          setReceivedMessages(updatedChatData);
          scrollToEnd(); // 최신 메시지를 불러온 후에만 스크롤을 끝으로 이동
        }
      } else {
        setHasMoreMessages(false); // 더 이상 불러올 메시지가 없을 경우
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 새로운 채팅방 생성
  const createChatRoom = async () => {
    const inputURL = `/chat/room`;
    try {
      const response = await apiClient.post(inputURL, {
        users: [myId, friendsId],
        message: currentMessage,
      });

      setRoomId(response.data.chatRoomId);
      setReceivedMessages([
        {
          message: currentMessage,
          isMine: true,
          formattedDate: formatDate(new Date().toISOString().split("T")[0]),
          formattedTime: formatTime(new Date().toISOString()),
          showDate: true,
        },
      ]);
      scrollToEnd();
      initializeWebSocket(response.data.chatRoomId);
      setCurrentMessage("");
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  useEffect(() => {
    // 채팅방 ID가 있을 경우
    if (chatRoomId) {
      // 기존 데이터 세팅 후 소켓 연결
      fetchData(); // 최신 메시지를 불러옴
      initializeWebSocket(chatRoomId);
    }
  }, [chatRoomId]);

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 해제
      if (client) {
        client.deactivate();
        console.log("WebSocket connection closed");
      }
    };
  }, [client]);

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
                    formattedTime: formatTime(new Date().toISOString()),
                    showDate: false, // 소켓으로 받은 메시지의 경우 날짜를 표시하지 않도록 설정
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
  const sendMessage = async () => {
    if (!roomId) {
      await createChatRoom();
    }

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
      console.log("WebSocket 연결 해제 :::");
    }
    // 이전 페이지로 돌아가기
    navigation.goBack();
  };

  // 스크롤 마지막으로 이동
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // 스크롤 업 이벤트 처리
  const handleScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y <= 0 && hasMoreMessages && !loading) {
      // 스크롤이 상단에 도달했고, 더 불러올 메시지가 있으며, 현재 로딩 중이 아닌 경우
      fetchData(true); // 이전 메시지를 불러옴
    }
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
          onScroll={handleScroll} // 스크롤 업 이벤트 핸들러 추가
          scrollEventThrottle={16}
        >
          {receivedMessages.map((message, index) => {
            const showProfileAndName =
              index === 0 ||
              receivedMessages[index - 1].userId !== message.userId;

            const showDate =
              message.showDate &&
              (index === 0 ||
                receivedMessages[index - 1].formattedDate !==
                  message.formattedDate);

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
                      <View style={{ alignSelf: "flex-end", gap: 4 }}>
                        <Text style={styles.notReadCnt}>
                          {message.notReadCnt === 2 ? 1 : null}
                        </Text>
                        <Text style={styles.time}>{message.formattedTime}</Text>
                      </View>
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
