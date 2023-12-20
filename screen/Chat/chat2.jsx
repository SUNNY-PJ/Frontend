import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const Chat2 = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      fromMe: true, // 여기서는 사용자의 메시지로 가정
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={item.fromMe ? styles.fromMe : styles.fromOthers}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="메시지를 입력하세요..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "60%",
    justifyContent: "space-between",
  },
  contentContainer: {
    marginBottom: 40,
    flex: 1,
    paddingRight: 22,
    paddingLeft: 22,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  fromMe: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  fromOthers: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 150,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#B0B0B0",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#61B329",
    borderRadius: 4,
    padding: 8,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Chat2;
