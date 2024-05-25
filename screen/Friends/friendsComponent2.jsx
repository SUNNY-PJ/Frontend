import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./friendsComponent.styles";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import FriendProfile from "./friendProfile";
import FriendsMsg from "../../components/Modal/friendsMsg";

const FriendsComponent2 = ({ Data, onAddFriend, onRefuseFriend }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [friendId, setFriendId] = useState("");
  const [nickName, setNickName] = useState("");
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleProfileClick = (id) => {
    setUserId(id);
    openProfile();
  };

  const openProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  const openMsg = (nickName) => {
    setNickName(nickName);
    console.log("nickName::::", nickName);
    if (nickName) {
      setIsVisible(!isVisible);
    }
  };

  // 친구 승인
  const handleApprove = (friendId, nickName) => {
    setFriendId(friendId);
    openMsg(nickName);
  };

  const handleAccept = () => {
    onAddFriend(friendId);
    setIsVisible(false);
  };

  // 친구 거절
  const handleRefuse = () => {
    onRefuseFriend(friendId);
    setIsVisible(false);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    console.log("userId::::", userId);
    console.log("friendId::::", friendId);
  }, [userId, friendId]);

  return (
    <ScrollView>
      {Data.map((item) => (
        <View style={styles.container} key={item.friendId}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              handleProfileClick(item.userFriendId);
            }}
            style={{ flexDirection: "row" }}
          >
            <Image source={{ uri: item.profile }} style={styles.icon} />
            <Text style={styles.nickname}>{item.nickname}</Text>
          </TouchableOpacity>
          {/* {item.friendStatus === "PENDING" && ( */}
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              // onPress={() => onAddFriend(item.friendId)}
              onPress={() => handleApprove(item.friendId, item.nickname)}
            >
              <Image
                source={require("../../assets/plusIcon.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {/* )} */}
        </View>
      ))}
      <Line color={"#C1C1C1"} h={2} />
      <FriendProfile
        isOpenProfile={isOpenProfile}
        openProfile={openProfile}
        userId={userId}
      />
      <FriendsMsg
        isVisible={isVisible}
        toggleModal={toggleModal}
        name={nickName}
        onAccept={handleAccept}
        onRefuse={handleRefuse}
      />
    </ScrollView>
  );
};

export default FriendsComponent2;
