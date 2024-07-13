import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import apiClient from "../../api/apiClient";
import useStore from "../../store/store";
import styles from "./chatList.styles";

const ChatList = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const profile = useStore((state) => state.profile);

  const truncateText = (text) => {
    const maxLength = 20;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleChatRoomClick = () => {
    console.log("채팅방으로 이동합니다...11");
    navigation.navigate("ChatScreen", { screen: "ChatRoom3" });
  };

  // 채팅방 리스트
  const fetchData = async () => {
    const inputURL = `/chat/room`;

    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: { userId: profile.id },
      });

      const chatListData = response.data;
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
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>채팅 목록</Text>
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
                  <Text style={styles.userName}>민지</Text>
                  <Text style={styles.msg}>{truncateText("뭐하고 있니")}</Text>
                </View>
              </View>
              <View style={{ gap: 4 }}>
                <Text style={styles.time}>07:09</Text>
                <View style={styles.cntBox}>
                  <Text style={styles.cnt}>22</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
          <Line color={"#C1C1C1"} h={1} />
        </ScrollView>
      </View>
    </View>
  );
};

export default ChatList;
