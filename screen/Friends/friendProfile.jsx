import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { styles } from "./friendProfile.style";
import { Client } from "@stomp/stompjs";
import FriendWrite from "./friendWrite";
import FriendComment from "./friendComment";
import apiClient from "../../api/apiClient";
import MsgModal from "../../components/Modal/msg/msgModal";
import ProfileButton from "../../components/Profile/button";
import ProfileTab from "../../components/Profile/tab";
import useStore from "../../store/store";
import { DEV_SOCKET_URI } from "../../api/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FriendProfile = ({ openProfile, isOpenProfile, userId }) => {
  const navigation = useNavigation();
  const profile = useStore((state) => state.profile);
  const myId = profile.id;
  const [comment, setComment] = useState(false);
  const [write, setWrite] = useState(true);
  const [data, setData] = useState([]);
  const [chatExists, setChatExists] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [status, setStatus] = useState();
  const [friendId, setFriendId] = useState(0);
  const [userFriendId, setUserFriendId] = useState(0);
  const [friendName, setFriendName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  // 소켓 초기화
  useEffect(() => {
    const initializeWebSocket = async () => {
      const client = new Client({
        brokerURL: `ws://${DEV_SOCKET_URI}/stomp`,
        connectHeaders: {
          Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
        },
        debug: (str) => {
          console.log(new Date(), str);
        },
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("Connected to the server");
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

      return () => {
        if (client) {
          client.deactivate();
        }
      };
    };

    initializeWebSocket();
  }, []);

  // 프로필 조회
  const fetchData = async () => {
    const inputURL = `/users`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: { userId },
      });

      if (response.status === 200) {
        const profileData = response.data;
        setChatExists(profileData.exists);
        setChatRoomId(profileData.chatRoomId);
        setUserFriendId(profileData.friendId);
        setFriendId(profileData.id);
        setFriendName(profileData.name);
        setData([profileData]);
        setStatus(getStatusLabel(profileData.friendStatus));
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const getStatusLabel = (statusData) => {
    switch (statusData) {
      case "RECEIVE":
        return "친구수락";
      case "FRIEND":
        return "친구끊기";
      case "NONE":
        return "친구맺기";
      case "SEND":
        return "대기중";
      default:
        return "";
    }
  };

  const handleTabClick = (tab) => {
    setWrite(tab === "write");
    setComment(tab === "comment");
  };

  const handleFriend = () => {
    if (status === "친구끊기") {
      confirmFriendAction("친구를 끊으시겠습니까?", deleteFriendData);
    } else if (status === "친구맺기") {
      postData();
    } else if (status === "대기중") {
      Alert.alert("", `이미 친구 신청을 했습니다.`);
    } else if (status === "친구수락") {
      confirmFriendAction("친구를 수락하시겠습니까?", approveData);
    }
  };

  const confirmFriendAction = (message, action) => {
    Alert.alert("", message, [
      { text: "취소", style: "cancel" },
      { text: "확인", onPress: action },
    ]);
  };

  // 친구 신청하기
  const postData = async () => {
    const inputURL = `/friends/${friendId}`;
    try {
      const response = await apiClient.post(
        inputURL,
        {},
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );

      handlePostResponse(response);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handlePostResponse = (response) => {
    if (response.status === 200) {
      if (response.data.status === 400) {
        showAlert(
          "error",
          "서버 장애가 발생했습니다. 관리자에게 문의 바랍니다."
        );
      } else if (response.data.status === 500) {
        showAlert("", "이미 친구 신청을 했습니다.");
      } else {
        showAlert("", `${friendName}에게 친구 신청을 했습니다.`);
        fetchData();
      }
    }
  };

  const handleErrorResponse = (error) => {
    if (error.response) {
      if (error.response.data.status === 500) {
        showAlert("", "이미 친구 신청을 한 사용자입니다.");
      }
    } else {
      showAlert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  // 친구 승인하기
  const approveData = async () => {
    const inputURL = `/friends/approve/${userFriendId}`;
    try {
      const response = await apiClient.post(
        inputURL,
        {},
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );

      handleApproveResponse(response);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleApproveResponse = (response) => {
    if (response.status === 200) {
      if (response.data.status === 401) {
        showAlert("error", "에러가 발생했습니다. 관리자에게 문의 바랍니다.");
      } else if (response.data.status === 409) {
        showAlert("", "이미 친구입니다.");
      } else {
        showAlert("", "친구가 되었습니다!");
        fetchData();
      }
    }
  };

  // 친구 삭제하기
  const deleteFriendData = async () => {
    const inputURL = `/friends/${userFriendId}`;
    try {
      const response = await apiClient.delete(inputURL, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });

      handleDeleteResponse(response);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleDeleteResponse = (response) => {
    if (response.status === 200) {
      if (response.data.status === 400) {
        showAlert(
          "error",
          "서버 장애가 발생했습니다. 관리자에게 문의 바랍니다."
        );
      } else if (response.data.status === 500) {
        showAlert("", response.message);
      } else {
        showAlert("", `${friendName}를 친구 리스트에서 삭제했습니다.`);
        fetchData();
      }
    }
  };

  const handleChatClick = () => {
    if (chatExists) {
      navigation.navigate("ChatScreen", {
        screen: "ChatRoom3",
        params: { chatRoomId: chatRoomId, friendsId: friendId },
      });
    } else {
      navigation.navigate("ChatScreen", {
        screen: "ChatRoom3",
        params: { friendsId: friendId, friendsName: friendName },
      });
    }
  };

  const handleBlockUser = () => {
    setIsModalVisible(true);
  };

  // 친구 차단하기
  const blockUser = async () => {
    const bodyData = { userId: friendId };
    try {
      const response = await apiClient.post("/users/block", bodyData, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      showAlert(
        "",
        `${friendName}님을 차단했습니다. 마이페이지 차단 관리에서 차단 해제할 수 있습니다.`
      );
      openProfile();
    } catch (error) {
      showAlert("error", error.response.data);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isOpenProfile}>
      <View style={styles.container}>
        <View style={{ paddingLeft: 24, marginTop: 64 }}>
          <TouchableOpacity onPress={openProfile}>
            <Image
              source={require("../../assets/close.png")}
              style={styles.closeBtn}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />
          </TouchableOpacity>
        </View>
        {data.map((item) => (
          <View style={styles.contentContainer} key={item.id}>
            <View style={{ alignSelf: "center", gap: 5 }}>
              <Image
                source={{ uri: item.profile }}
                style={{ width: 92, height: 92, borderRadius: 50 }}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
              {!item.owner && (
                <>
                  <ProfileButton
                    onPress={handleChatClick}
                    backgroundColor="#FFC891"
                    text="대화하기"
                  />
                  <ProfileButton
                    onPress={handleFriend}
                    backgroundColor={
                      status === "대기중"
                        ? "#F1F1F1"
                        : status === "친구끊기"
                        ? "#5C5C5C"
                        : "#FFC891"
                    }
                    text={status}
                    textColor={status === "친구끊기" ? "#fff" : "#1F1F1F"}
                  />
                  <ProfileButton
                    onPress={handleBlockUser}
                    backgroundColor="#FFFFFF"
                    text="차단하기"
                  />
                </>
              )}
            </View>
            <View style={styles.tabContainer}>
              <ProfileTab
                onPress={() => handleTabClick("write")}
                isActive={write}
                text="작성한 글"
              />
              <ProfileTab
                onPress={() => handleTabClick("comment")}
                isActive={comment}
                text="댓글단 글"
              />
            </View>
            <View style={styles.tabBar}>
              <View
                style={[styles.tabBarLine, write && styles.activeTabBarLine]}
              />
              <View
                style={[styles.tabBarLine, comment && styles.activeTabBarLine]}
              />
            </View>
            {write && (
              <FriendWrite userId={userId} closeProfile={openProfile} />
            )}
            {comment && (
              <FriendComment userId={userId} closeProfile={openProfile} />
            )}
          </View>
        ))}
      </View>
      <MsgModal
        isVisible={isModalVisible}
        toggleModal={() => setIsModalVisible(false)}
        onDelete={blockUser}
        onCancel={() => setIsModalVisible(false)}
        msgTitle="차단하시겠어요?"
        msgContent="해당 사용자가 커뮤니티에서 작성한 글과 댓글, 답글을 볼 수 없습니다."
      />
    </Modal>
  );
};

export default FriendProfile;
