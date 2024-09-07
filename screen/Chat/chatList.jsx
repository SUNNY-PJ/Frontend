import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import apiClient from "../../api/apiClient";
import useStore from "../../store/store";
import styles from "./chatList.styles";
import { formatTime } from "../../utils/dateUtils";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ChatList = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const profile = useStore((state) => state.profile);
  const myId = profile.id;
  const [chatListData, setChatListData] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(700).then(() => {
      setRefreshing(false);
      fetchData();
    });
  }, []);

  const truncateText = (text) => {
    const maxLength = 20;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleChatRoomClick = (chatRoomId, chatMessageId) => {
    console.log(`채팅방으로 이동합니다... ID: ${chatRoomId}`);
    console.log(`마지막 채팅 아이디... ID: ${chatMessageId}`);
    navigation.navigate("ChatScreen", {
      screen: "ChatRoom3",
      params: { chatRoomId: chatRoomId, chatMessageId: chatMessageId },
    });
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

      const chatListData = response.data;
      setChatListData(chatListData);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // 채팅방 삭제
  const deleteData = async (chatRoomId) => {
    const inputURL = `/chat/room/${chatRoomId}`;

    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      Alert.alert("채팅방이 삭제되었습니다.");
      fetchData();
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
        <ScrollView
          style={{ height: windowHeight - 275 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {chatListData.map((item, index) => (
            <React.Fragment key={index}>
              <Swipeable
                renderRightActions={() => renderRightActions(item.chatRoomId)}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.chatSection}
                  onPress={() =>
                    handleChatRoomClick(item.chatRoomId, item.chatMessageId)
                  }
                >
                  <View style={{ flexDirection: "row", gap: 13 }}>
                    <Image source={{ uri: item.profile }} style={styles.icon} />
                    <View>
                      <Text style={styles.userName}>{item.nickname}</Text>
                      <Text style={styles.msg}>
                        {truncateText(item.message)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ gap: 4 }}>
                    <Text style={styles.time}>{formatTime(item.time)}</Text>
                    {item.notReadCnt !== 0 && (
                      <View style={styles.cntBox}>
                        <Text style={styles.cnt}>{item.notReadCnt}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Swipeable>
              <Line color={"#C1C1C1"} h={1} />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ChatList;
