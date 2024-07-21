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
import FriendWrite from "./friendWrite";
import FriendComment from "./friendComment";
import apiClient from "../../api/apiClient";
import MsgModal from "../../components/Modal/msg/msgModal";

const FriendProfile = ({ openProfile, isOpenProfile, userId }) => {
  const navigation = useNavigation();
  const [comment, setComment] = useState(false);
  const [write, setWrite] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState();
  const [friendId, setFriendId] = useState(0);
  const [userFriendId, setUserFriendId] = useState(0);
  const [friendName, setFriendName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const commentClick = () => {
    setComment(true);
    setWrite(false);
  };

  const writeClick = () => {
    setWrite(true);
    setComment(false);
  };

  const fetchData = async () => {
    const inputURL = `/users`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: {
          userId: userId,
        },
      });
      if (response.status === 200) {
        // console.log("데이터1111:", response.data);
        const ProfileData = response.data;
        const ProfileId = ProfileData.id;
        const ProfileFriendId = ProfileData.friendId;
        const ProfileName = ProfileData.name;
        const ProfileOwner = ProfileData.owner;
        const statusData = ProfileData.friendStatus;
        setUserFriendId(ProfileFriendId);
        setFriendId(ProfileId);
        setFriendName(ProfileName);
        setData([ProfileData]);
        setStatus(statusData);
        if (statusData === "RECEIVE") {
          setStatus("친구수락");
        } else if (statusData === "FRIEND") {
          setStatus("친구끊기");
        } else if (statusData === "NONE") {
          setStatus("친구맺기");
        } else if (statusData === "SEND") {
          setStatus("대기중");
        }
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  // 친구 신청
  const postData = async () => {
    const inputURL = `/friends/${friendId}`;
    try {
      const response = await apiClient.post(
        inputURL,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      console.log("친구신청>>>>", response.data);

      if (response.status === 200) {
        if (response.data.status === 400) {
          Alert.alert(
            "error",
            `서버 장애가 발생했습니다.\n관리자에게 문의 바랍니다.`
          );
        } else if (response.data.status === 500) {
          Alert.alert("", `이미 친구 신청을 했습니다.`);
        } else {
          Alert.alert("", `${friendName}에게 친구 신청을 했습니다.`);
          fetchData();
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류: friend post", error.response.data);
        if (error.response.data.status === 500) {
          Alert.alert("", "이미 친구 신청을 한 사용자입니다.");
        }
      } else {
        console.error("에러:", error);
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      }
    }
  };

  const handleFriend = () => {
    if (status === "친구끊기") {
      onRemoveFriend();
    } else if (status === "친구맺기") {
      postData();
    } else if (status === "대기중") {
      Alert.alert("", `이미 친구 신청을 했습니다.`);
    } else if (status === "친구수락") {
      onApproveFriend();
    }
  };

  // 친구 수락
  const approveData = async () => {
    const inputURL = `/friends/approve/${userFriendId}`;
    try {
      const response = await apiClient.post(
        inputURL,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      if (response.status === 200) {
        if (response.data.status === 401) {
          Alert.alert(
            "error",
            "에러가 발생했습니다.\n관리자에게 문의 바랍니다."
          );
        } else if (response.data.status === 409) {
          Alert.alert("", "이미 친구입니다.");
        } else {
          Alert.alert("", "친구가 되었습니다!");
          fetchData();
        }
      } else if (response.status === 500) {
        Alert.alert(response.message);
      } else {
        Alert.alert("error", "에러가 발생했습니다.\n관리자에게 문의 바랍니다.");
      }
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  // 친구 끊기
  const deleteFriendData = async () => {
    const inputURL = `/friends/${userFriendId}`;
    console.log(inputURL);
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("친구삭제>>>>", response.data);
      if (response.status === 200) {
        if (response.data.status === 400) {
          Alert.alert(
            "error",
            `서버 장애가 발생했습니다.\n관리자에게 문의 바랍니다.`
          );
        } else if (response.data.status === 500) {
          Alert.alert("", response.message);
        } else {
          Alert.alert("", `${friendName}를 친구 리스트에서 삭제했습니다.`);
          fetchData();
        }
      } else {
        Alert.alert(
          "error",
          `서버 장애가 발생했습니다.\n관리자에게 문의 바랍니다.`
        );
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const onApproveFriend = () => {
    Alert.alert(
      "",
      "친구를 수락하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => approveData(),
        },
      ],
      { cancelable: false }
    );
  };

  const onRemoveFriend = () => {
    Alert.alert(
      "",
      "친구를 끊으시겠습니까??",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => deleteFriendData(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleChatClick = () => {
    console.log("채팅방 이동 >>>", friendId);
    navigation.navigate("ChatScreen", {
      screen: "ChatRoom3",
      params: {
        friendsId: friendId,
      },
    });
  };

  const blockUser = async () => {
    const bodyData = {
      userId: friendId,
    };
    try {
      const response = await apiClient.post("/users/block", bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log(response.data);
      Alert.alert(
        "",
        `${friendName}님을 차단했습니다.\n마이페이지 차단 관리에서 차단 해제할 수 있습니다.`
      );
      openProfile();
    } catch (error) {
      Alert.alert("error", error.response.data);
    }
  };

  const handleBlockUser = () => {
    setIsModalVisible(true);
    console.log("차단", friendId, friendName);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const handleBlockFriend = () => {
    blockUser();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isOpenProfile}>
      <View style={styles.container}>
        <View style={{ paddingLeft: 24, marginTop: 64 }}>
          <TouchableOpacity onPress={openProfile}>
            <Image
              source={require("../../assets/close.png")}
              style={{ width: 14, height: 14 }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />
          </TouchableOpacity>
        </View>
        {data.map((item, index) => (
          <View style={styles.contentContainer} key={item.index}>
            <View style={{ alignSelf: "center", gap: 5 }}>
              <Image
                source={{ uri: item.profile }}
                style={{ width: 92, height: 92, borderRadius: 50 }}
              />
              <Text style={[styles.name]}>{item.name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignSelf: "center",
                marginTop: 27,
              }}
            >
              {item.owner ? (
                <View style={{ height: 12 }} />
              ) : (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, { backgroundColor: "#FFC891" }]}
                    onPress={handleChatClick}
                  >
                    <Text style={[styles.btnText]}>대화하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          status === "대기중"
                            ? "#F1F1F1"
                            : status === "친구끊기"
                            ? "#5C5C5C"
                            : "#FFC891",
                      },
                    ]}
                    onPress={handleFriend}
                  >
                    <Text
                      style={[
                        styles.btnText,
                        {
                          color: status === "친구끊기" ? "#fff" : "#1F1F1F",
                        },
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, { backgroundColor: "#FFFFFF" }]}
                    onPress={handleBlockUser}
                  >
                    <Text style={[styles.btnText]}>차단하기</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 40,
                marginBottom: 6,
              }}
            >
              <TouchableOpacity onPress={writeClick} activeOpacity={0.6}>
                <Text style={[styles.tabText, write && styles.activeTabText]}>
                  작성한 글
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={commentClick} activeOpacity={0.6}>
                <Text style={[styles.tabText, comment && styles.activeTabText]}>
                  댓글단 글
                </Text>
              </TouchableOpacity>
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
        toggleModal={handleCancelDelete}
        onDelete={handleBlockFriend}
        onCancel={handleCancelDelete}
        msgTitle="차단하시겠어요?"
        msgContent="해당 사용자가 커뮤니티에서 작성한 글과 댓글, 답글을 볼 수 없습니다."
      />
    </Modal>
  );
};

export default FriendProfile;
