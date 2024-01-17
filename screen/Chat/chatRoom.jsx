import React, { useState, useRef, useEffect } from "react";
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

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "오늘 저녁에 시간 어때요?", time: "18:52", isMine: false },
    {
      id: 2,
      text: "영화 보고 싶은데 같이 볼래요?",
      time: "18:55",
      isMine: true,
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const scrollViewRef = useRef();

  const sendMessage = () => {
    if (currentMessage.trim().length > 0) {
      // 새 메시지 객체를 생성하여 배열에 추가합니다.
      const newMessage = {
        id: messages.length + 1, // 임시 ID 할당
        text: currentMessage,
        time: new Date().toLocaleTimeString().slice(0, 5), // 현재 시간
        isMine: true, // 사용자가 보낸 메시지로 설정
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

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
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#5C5C5C" }}>
              "친구가 아닌 사용자입니다. 친구를 맺을까요?"
            </Text>
          </View>
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
          {messages.map((message, index) => (
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
          ))}
        </ScrollView>
        <View style={{ paddingLeft: 22, paddingRight: 22 }}>
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
    flex: 1, // 전체 화면을 사용하도록 flex 설정
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
    maxWidth: "80%",
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
    maxWidth: "80%",
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

export default ChatRoom;
