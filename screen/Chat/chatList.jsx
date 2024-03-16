import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import apiClient from "../../api/apiClient";

const ChatList = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const truncateText = (text) => {
    const maxLength = 20;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleChatRoomClick = () => {
    console.log("채팅방으로 이동합니다...11");
    navigation.navigate("ChatScreen", { screen: "ChatRoom" });
  };

  // 채팅방 리스트
  const fetchData = async () => {
    const inputURL = `/chat/room`;

    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const chatListData = response.data.data;
      console.log("채팅방 목록:::", chatListData);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 채팅방 삭제
  const deleteData = async (chatRoomId) => {
    const inputURL = `/chat/${chatRoomId}`;

    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const chatData = response.data;
      console.log("채팅방 목록:::", chatData);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleChatRoomDelete = (chatRoomId) => {
    Alert.alert(
      "채팅방 나가기",
      "채팅방을 나가시겠습니까?\n대화 내용이 모두 삭제됩니다.",
      [
        {
          text: "취소",
          // onPress: () => console.log("수정을 취소했습니다."),
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => deleteData(chatRoomId),
        },
      ],
      { cancelable: false }
    );
  };

  const renderRightActions = (chatRoomId) => {
    return (
      <TouchableOpacity onPress={() => handleChatRoomDelete(chatRoomId)}>
        <View style={styles.deleteBox}>
          <Text style={styles.deleteText}>나가기</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          marginTop: 25,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1F1F1F",
            textAlign: "center",
            marginBottom: 24,
            fontFamily: "SUITE_Bold",
          }}
        >
          채팅 목록
        </Text>
        <Line color={"#C1C1C1"} h={1} />
        <ScrollView style={{ height: windowHeight - 125 - 88 }}>
          <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.chatSection}
              onPress={handleChatRoomClick}
            >
              <View style={{ flexDirection: "row", gap: 13 }}>
                <Image
                  source={require("../../assets/Avatar.png")}
                  style={styles.icon}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#1F1F1F",
                      marginBottom: 8,
                      fontFamily: "SUITE_Bold",
                    }}
                  >
                    민지
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#1F1F1F",
                      fontFamily: "SUITE",
                    }}
                  >
                    {truncateText("뭐하고 있니")}
                  </Text>
                </View>
              </View>
              <View style={{ gap: 4 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#1F1F1F",
                    fontFamily: "SUITE",
                  }}
                >
                  07:09
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 50,
                    borderColor: "#6ADCA3",
                    backgroundColor: "#6ADCA3",
                    marginLeft: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#fff",
                      textAlign: "center",
                      top: 4,
                      fontFamily: "SUITE",
                    }}
                  >
                    22
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
          <Line color={"#C1C1C1"} h={1} />
          <View style={styles.chatSection}>
            <View style={{ flexDirection: "row", gap: 13 }}>
              <Image
                source={require("../../assets/Avatar.png")}
                style={styles.icon}
              />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#1F1F1F",
                      marginBottom: 8,
                      fontFamily: "SUITE_Bold",
                    }}
                  >
                    수연
                  </Text>
                  {/* <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#1F1F1F",
                    }}
                  >
                    07:09
                  </Text> */}
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#1F1F1F",
                    fontFamily: "SUITE",
                  }}
                >
                  {truncateText(
                    "어쩌라고 무러하ㅏ로오오오오오 오아우우오오오아아ㅁ아러망러"
                  )}
                </Text>
              </View>
            </View>
            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  fontFamily: "SUITE",
                }}
              >
                07:09
              </Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 50,
                  borderColor: "#6ADCA3",
                  backgroundColor: "#6ADCA3",
                  marginLeft: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#fff",
                    textAlign: "center",
                    top: 4,
                  }}
                >
                  99
                </Text>
              </View>
            </View>
          </View>
          <Line color={"#C1C1C1"} h={1} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatSection: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 17,
    justifyContent: "space-between",
    paddingLeft: 13,
    paddingRight: 19,
    backgroundColor: "#fff",
  },
  icon: {
    width: 48,
    height: 48,
  },
  deleteBox: {
    backgroundColor: "#5C5C5C",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
  },
  deleteText: {
    color: "white",
    paddingHorizontal: 20,
    fontFamily: "SUITE",
  },
});

export default ChatList;
