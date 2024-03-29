import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import FriendProfile from "./friendProfile";
import MsgModal from "../../components/Modal/msg/msgModal";
import MatchMsg from "../../components/Modal/battle/matchMsg";

const FriendsComponent3 = ({ Data, onRemoveFriend }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [friendId, setFriendId] = useState("");
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const openProfile = (friendId) => {
    setUserId(friendId);
    console.log("userId::::", userId);
    if (userId) {
      setIsOpenProfile(!isOpenProfile);
    }
  };

  const [nickname, setNickname] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [isMatchModalVisible, setIsMatchModalVisible] = useState(false);

  const showMatchModal = () => {
    setIsMatchModalVisible(true);
  };

  const hideMatchModal = () => {
    setIsMatchModalVisible(false);
  };

  const showModal = (friendId) => {
    setSelectedFriendId(friendId);
    setIsModalVisible(true);
  };

  const handleDeleteFriend = () => {
    if (selectedFriendId) {
      onRemoveFriend(selectedFriendId);
      setIsModalVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  // 삭제 버튼
  const renderRightActions = (friendId) => {
    return (
      <TouchableOpacity onPress={() => showModal(friendId)}>
        {/* <TouchableOpacity onPress={() => onRemoveFriend(friendId)}> */}
        <View style={styles.deleteBox}>
          <Text style={styles.deleteButtonText}>삭제</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleBattle = (friendId, nickname, competitionStatus) => {
    setNickname(nickname);
    setFriendId(friendId);
    if (competitionStatus === "RECEIVE") {
      showMatchModal();
    } else if (competitionStatus === "SEND") {
      Alert.alert("알림", "이미 대결을 신청했습니다.");
    } else if (competitionStatus === "NONE") {
      navigation.navigate("MainScreen", {
        screen: "SendMatch",
        params: {
          friendId: friendId,
          name: nickname,
        },
      });
    } else {
      Alert.alert("error", "대결 상태를 확인할 수 없습니다.");
    }
  };

  useEffect(() => {
    console.log("userId::::", userId);
  }, [userId]);

  return (
    <ScrollView>
      {Data.map((item) => (
        <Swipeable
          key={item.friendId}
          renderRightActions={() =>
            item.friendStatus === "FRIEND"
              ? renderRightActions(item.friendId)
              : null
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 28,
              paddingRight: 28,
              paddingBottom: 20,
              paddingTop: 20,
              borderBottomColor: "#C1C1C1",
              borderBottomWidth: 1,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  openProfile(item.userFriendId);
                }}
              >
                <Image
                  source={{ uri: item.profile }}
                  // source={require("../../assets/Avatar.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: "#1F1F1F",
                  alignSelf: "center",
                  fontFamily: "SUITE_Medium",
                }}
              >
                {item.nickname}
              </Text>
            </View>
            {item.friendStatus === "FRIEND" && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 16,
                }}
              >
                {/* <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity> */}
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    handleBattle(
                      item.friendId,
                      item.nickname,
                      item.competitionStatus
                    );
                  }}
                >
                  <Image
                    source={require("../../assets/VersusIconBlack.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Swipeable>
      ))}
      <Line color={"#C1C1C1"} h={2} />
      <FriendProfile
        isOpenProfile={isOpenProfile}
        openProfile={openProfile}
        userId={userId}
      />
      <MsgModal
        isVisible={isModalVisible}
        toggleModal={handleCancelDelete}
        onDelete={handleDeleteFriend}
        onCancel={handleCancelDelete}
        msgTitle="친구를 삭제하시겠습니까?"
      />
      <MatchMsg
        isVisible={isMatchModalVisible}
        toggleModal={hideMatchModal}
        friendsId={friendId}
        nickname={nickname}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "SUITE_Bold",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
  },
  menuItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  deleteBox: {
    backgroundColor: "#5C5C5C",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: "#C1C1C1",
    borderBottomWidth: 1,
  },
  deleteButtonText: {
    color: "#fff",
    fontFamily: "SUITE",
  },
});

export default FriendsComponent3;
