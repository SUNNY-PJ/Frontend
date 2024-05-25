import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./friendsComponent.styles";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import FriendProfile from "./friendProfile";

const FriendsComponent1 = ({ Data, onAddFriend, onRemoveFriend }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const handleProfileClick = (id) => {
    setUserId(id);
    openProfile();
  };

  const openProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  const handleBattleStatus = (friendId, nickname, competitionId) => {
    navigation.navigate("MainScreen", {
      screen: "BattleStatus",
      params: {
        friendId: friendId,
        nickname: nickname,
        competitionId: competitionId,
      },
    });
  };

  useEffect(() => {}, [userId]);

  return (
    <ScrollView>
      {Data.map((item, index) => (
        <View key={index} style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ flexDirection: "row" }}
            onPress={() => {
              handleProfileClick(item.userFriendId);
            }}
          >
            <Image source={{ uri: item.profile }} style={styles.icon} />
            <Text style={styles.nickname}>{item.nickname}</Text>
          </TouchableOpacity>
          {/* //     NONE, PENDING, PROCEEDING, GIVE_UP, COMPLETE; */}
          {/* //   WIN("승리"), LOSE("패배"),DRAW("무승부"); */}
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleBattleStatus(
                  item.friendId,
                  item.nickname,
                  item.competitionId
                );
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

export default FriendsComponent1;
