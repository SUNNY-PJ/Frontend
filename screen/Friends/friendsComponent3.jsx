import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { styles } from "./friendsComponent.styles";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import FriendProfile from "./friendProfile";
import MsgModal from "../../components/Modal/msg/msgModal";
import MatchMsg from "../../components/Modal/battle/matchMsg";

const FriendsComponent3 = ({ Data, onRemoveFriend }) => {
  const windowHeight = Dimensions.get("window").height;

  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [friendId, setFriendId] = useState("");
  // const [competitionId, setCompetitionId] = useState(0);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const handleProfileClick = (id) => {
    setUserId(id);
    openProfile();
  };

  const openProfile = () => {
    setIsOpenProfile(!isOpenProfile);
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

  const handleBattle = (
    friendId,
    nickname,
    competitionStatus,
    competitionId
  ) => {
    setNickname(nickname);
    setFriendId(friendId);
    // setCompetitionId(competitionId);
    if (competitionStatus === "RECEIVE") {
      showMatchModal();
    } else if (competitionStatus === "SEND") {
      Alert.alert("", "이미 대결을 신청했습니다.");
    } else if (
      competitionStatus === "NONE" ||
      competitionStatus === undefined
    ) {
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
    <ScrollView style={{ height: windowHeight - 300 }}>
      {Data.map((item) => (
        <Swipeable
          key={item.friendId}
          renderRightActions={() =>
            item.friendStatus === "FRIEND"
              ? renderRightActions(item.friendId)
              : null
          }
          overshootRight={false}
        >
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleProfileClick(item.userFriendId);
              }}
              style={{ flexDirection: "row" }}
            >
              <Image
                source={{ uri: item.profile }}
                // source={require("../../assets/Avatar.png")}
                style={styles.icon}
              />
              <Text style={styles.nickname}>{item.nickname}</Text>
            </TouchableOpacity>
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
                      // item.competitionId
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
        // competitionId={competitionId}
      />
    </ScrollView>
  );
};

export default FriendsComponent3;
