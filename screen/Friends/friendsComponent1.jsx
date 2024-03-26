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
import FriendProfile from "./friendProfile";

const FriendsComponent1 = ({ Data, onAddFriend, onRemoveFriend }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const openProfile = (friendId) => {
    setUserId(friendId);
    if (userId) {
      setIsOpenProfile(!isOpenProfile);
    }
  };

  const handleBattleStatus = (friendId, nickname) => {
    navigation.navigate("MainScreen", {
      screen: "BattleStatus",
      params: {
        friendId: friendId,
        nickname: nickname,
      },
    });
  };

  useEffect(() => {}, [userId]);

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
          {/* //     NONE, PENDING, PROCEEDING, GIVE_UP, COMPLETE; */}
          {/* //   WIN("승리"), LOSE("패배"),DRAW("무승부"); */}
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleBattleStatus(item.friendId, item.nickname);
              }}
            >
              <Image
                source={
                  item.output === "LOSE"
                    ? require("../../assets/VersusIconRed.png")
                    : item.output === "WIN"
                    ? require("../../assets/VersusIcon.png")
                    : item.output === "DRAW"
                    ? require("../../assets/VersusIconYellow.png")
                    : require("../../assets/VersusIconBlack.png")
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
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

export default FriendsComponent1;
