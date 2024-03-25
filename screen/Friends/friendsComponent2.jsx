import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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

  const openProfile = (friendId) => {
    setUserId(friendId);
    console.log("userId::::", userId);
    if (userId) {
      setIsOpenProfile(!isOpenProfile);
    }
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
    console.log("클릭함:::");
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
          key={item.friendId} // Add key prop for optimization
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                openProfile(item.userFriendId);
              }}
            >
              <Image
                source={require("../../assets/Avatar.png")}
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
          {item.friendStatus === "PENDING" && (
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
          )}
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

export default FriendsComponent2;
