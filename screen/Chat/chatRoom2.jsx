import React, { useState, useRef, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";

const ChatRoom2 = () => {
  const navigation = useNavigation();
  const access_token = AsyncStorage.getItem("access_token");

  useEffect(() => {
    // 웹소켓 연결을 위한 SockJS 클라이언트 생성
    const sock = new SockJS("http://localhost:8080/stomp/chat");
    const stompClient = Stomp.over(sock);

    // STOMP 연결 설정
    stompClient.connect({ Authorization: access_token }, function (frame) {
      console.log("Connected: " + frame);

      // 메시지 수신을 위한 구독 설정
      stompClient.subscribe("/topic/messages", function (messageOutput) {
        // 수신된 메시지 처리
        console.log(JSON.parse(messageOutput.body));
      });
    });

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const [messages, setMessages] = useState([
    { id: 1, text: "오늘 저녁에 시간 어때요?", time: "18:52", isMine: false },
    {
      id: 2,
      text: "안돼 이놈아",
      time: "18:55",
      isMine: true,
    },
    {
      id: 2,
      text: "푸하항",
      time: "18:57",
      isMine: true,
    },
    {
      id: 1,
      text: "때리깡 쾈그냥 아아아아아아앙 자고 싶다아ㅏㄹ아랑라아아ㅏㅇ 아아아아아 피곤해",
      time: "22:57",
      isMine: false,
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const scrollViewRef = useRef();

  // const sendMessage = () => {
  //   if (currentMessage.trim().length > 0) {
  //     // 새 메시지 객체를 생성하여 배열에 추가합니다.
  //     const newMessage = {
  //       id: messages.length + 1, // 임시 ID 할당
  //       text: currentMessage,
  //       time: new Date().toLocaleTimeString().slice(0, 5), // 현재 시간
  //       isMine: true, // 사용자가 보낸 메시지로 설정
  //     };
  //     setMessages([...messages, newMessage]);
  //     setCurrentMessage("");
  //   }
  // };

  const sendMessage = (message) => {
    if (stompClient && message) {
      const chatMessage = {
        chatRoomId: 0,
        sendUserId: "친구 userId",
        message: message,
      };

      stompClient.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleChatList = () => {
    navigation.navigate("MainScreen", { screen: "ChatList" });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.container}>
        {/* <ScrollView style={styles.messagesContainer} ref={scrollViewRef}>
          {messages.map((message, index) => (
            <View key={index} style={styles.message}>
              <Text>{message}</Text>
            </View>
          ))}
        </ScrollView> */}
        <ScrollView
          style={[
            styles.messagesContainer,
            // hasFriendMessages && { paddingLeft: 69 },
          ]}
          ref={scrollViewRef}
        >
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
              <Text style={{ fontSize: 15, fontWeight: 700, color: "#1F1F1F" }}>
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

          {messages.map((message, index) => (
            <View>
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
                key={index}
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

export default ChatRoom2;
