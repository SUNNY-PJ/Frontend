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

const FriendsComponent = ({ Data, onAddFriend, onRemoveFriend }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const openProfile = (friendsId) => {
    setUserId(friendsId);
    console.log("userId::::", userId);
    if (userId) {
      setIsOpenProfile(!isOpenProfile);
    }
  };

  // 삭제 버튼
  const renderRightActions = (friendsId) => {
    return (
      <TouchableOpacity onPress={() => onRemoveFriend(friendsId)}>
        <View style={styles.deleteBox}>
          <Text style={styles.deleteButtonText}>삭제</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleBattle = (friendsId, nickname) => {
    navigation.navigate("MainScreen", {
      screen: "SendMatch",
      params: {
        friendsId: friendsId,
        name: nickname,
      },
    });
  };

  const handleBattleStatus = (friendsId) => {
    navigation.navigate("MainScreen", {
      screen: "SendMatch",
      params: {
        friendsId: friendsId,
        name: nickname,
      },
    });
  };

  useEffect(() => {
    console.log("userId::::", userId);
  }, [userId]);

  return (
    <ScrollView>
      {Data.map((item) => (
        <Swipeable
          key={item.friendsId}
          renderRightActions={() =>
            item.friendStatus === "APPROVE"
              ? renderRightActions(item.friendsId)
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
            {item.friendStatus === "BATTLE" && (
              <View style={{ flexDirection: "row", gap: 16 }}>
                {/* <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity> */}
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    handleBattleStatus(item.friendsIdß);
                  }}
                >
                  <Image
                    source={require("../../assets/VersusIcon.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
            {item.friendStatus === "WAIT" && (
              <View style={{ flexDirection: "row", gap: 16 }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => onAddFriend(item.friendsId)}
                >
                  <Image
                    source={require("../../assets/plusIcon.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
            {item.friendStatus === "APPROVE" && (
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
                    handleBattle(item.friendsId, item.nickname);
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

export default FriendsComponent;
