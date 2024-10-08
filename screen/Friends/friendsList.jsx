import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import Line from "../../components/Line";
import { useRoute } from "@react-navigation/native";
import apiClient from "../../api/apiClient";
import FriendsComponent1 from "./friendsComponent1";
import FriendsComponent2 from "./friendsComponent2";
import FriendsComponent3 from "./friendsComponent3";
import CompetitionMsg from "../../components/Modal/battle/CompetitionMsg";
import FriendsMsg from "../../components/Modal/friendsMsg";
import MatchMsg from "../../components/Modal/battle/matchMsg";
const windowWidth = Dimensions.get("window").width;
const baseWidth = 390;
const isIphone7 = windowWidth < baseWidth;

function FriendsList() {
  const route = useRoute();
  const { resultModalContent } = route.params ?? {};
  const { friendModalContent } = route.params ?? {};
  const { battleModalContent } = route.params ?? {};
  const [isFriendsComponentVisible1, setIsFriendsComponentVisible1] =
    useState(true);
  const [isFriendsComponentVisible2, setIsFriendsComponentVisible2] =
    useState(true);
  const [isFriendsComponentVisible3, setIsFriendsComponentVisible3] =
    useState(true);

  const toggleFriendsComponent1 = () => {
    setIsFriendsComponentVisible1((prev) => !prev);
  };
  const toggleFriendsComponent2 = () => {
    setIsFriendsComponentVisible2((prev) => !prev);
  };
  const toggleFriendsComponent3 = () => {
    setIsFriendsComponentVisible3((prev) => !prev);
  };
  console.log("resultModalContent::::", resultModalContent);
  console.log("friendModalContent::::", friendModalContent);
  console.log("battleModalContent::::", battleModalContent);
  const [competitionData, setCompetitionData] = useState([]);
  const [approveData, setApproveData] = useState([]);
  const [waitData, setWaitData] = useState([]);
  const [isRefuseMsgOpen, setIsRefuseMsgOpen] = useState(
    resultModalContent?.open || false
  );
  const [isFriendMsgOpen, setIsFriendMsgOpen] = useState(
    friendModalContent?.open || false
  );
  const [isMatchModalVisible, setIsMatchModalVisible] = useState(
    battleModalContent?.open || false
  );

  const fetchData = async () => {
    const inputURL = `/friends`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const Data = response.data;
      console.log("친구", Data);
      const CompetitionFriendsData = Data.competitions;
      const ApproveFriendsData = Data.approveList;
      const WaitFriendsData = Data.waitList;
      setCompetitionData(CompetitionFriendsData);
      setApproveData(ApproveFriendsData);
      setWaitData(WaitFriendsData);
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    route,
    isFriendsComponentVisible1,
    isFriendsComponentVisible2,
    isFriendsComponentVisible3,
  ]);

  // 친구 수락
  const PostData = async (friendId) => {
    const inputURL = `/friends/approve/${friendId}`;
    console.log(inputURL);
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
      console.log("친구 수락함");

      Alert.alert("", "친구가 되었습니다!");
      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert("", "이미 친구입니다.");
      } else {
        Alert.alert("error", "유효하지 않은 친구 신청입니다.");
        console.error("에러:", error);
      }
    }
  };

  // 친구 거절
  const RefuseData = async (friendId) => {
    const inputURL = `/friends/approve/${friendId}`;
    console.log(inputURL);
    try {
      const response = await apiClient.delete(
        inputURL,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      console.log("친구 거절함");
      Alert.alert("", "친구 신청을 거절했습니다.");
      fetchData();
    } catch (error) {
      Alert.alert("error", "유효하지 않은 친구 신청입니다.");
      console.error("에러:", error);
    }
  };

  const RefuseFriendData = (friendId) => {
    RefuseData(friendId);
    setIsFriendMsgOpen(false);
  };

  const AddFriendData = (friendId) => {
    PostData(friendId);
    setIsFriendMsgOpen(false);
  };

  const onRemoveFriend = (friendId) => {
    deleteData(friendId);
  };

  // 친구 삭제
  const deleteData = async (friendId) => {
    const inputURL = `/friends/${friendId}`;
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      Alert.alert("", "친구를 삭제했습니다");
      fetchData();
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("error", error);
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
        minHeight: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          marginTop: 25,
          marginBottom: 40,
        }}
      >
        <Text style={styles.mainTitle}>친구 목록</Text>
        <ScrollView style={{ marginBottom: isIphone7 ? 80 : 150 }}>
          {/* 대결 중인 친구 목록 */}
          <TouchableOpacity onPress={toggleFriendsComponent1} activeOpacity={1}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>대결 중인 친구</Text>
              <Image
                source={require("../../assets/arrowUp.png")}
                style={{
                  width: 24,
                  height: 24,
                  transform: [
                    { rotate: isFriendsComponentVisible1 ? "180deg" : "0deg" },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>
          {isFriendsComponentVisible1 ? (
            <Line color={"#C1C1C1"} h={2} />
          ) : (
            <Line color={"#1F1F1F"} h={2} />
          )}
          {isFriendsComponentVisible1 && (
            <FriendsComponent1 Data={competitionData} />
          )}
          {/* 친구 신청 목록 */}
          <TouchableOpacity onPress={toggleFriendsComponent2} activeOpacity={1}>
            <View style={{ ...styles.titleSection, paddingTop: 24 }}>
              <Text style={styles.title}>친구 신청</Text>
              <Image
                source={require("../../assets/arrowUp.png")}
                style={{
                  width: 24,
                  height: 24,
                  transform: [
                    { rotate: isFriendsComponentVisible2 ? "180deg" : "0deg" },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>
          {isFriendsComponentVisible2 ? (
            <Line color={"#C1C1C1"} h={2} />
          ) : (
            <Line color={"#1F1F1F"} h={2} />
          )}
          {isFriendsComponentVisible2 && (
            <FriendsComponent2
              Data={waitData}
              onAddFriend={AddFriendData}
              onRefuseFriend={RefuseFriendData}
            />
          )}
          {/* {isFriendsComponentVisible2 && <FriendsComponent Data={waitData} />} */}

          {/* 친구 목록 */}
          <TouchableOpacity onPress={toggleFriendsComponent3} activeOpacity={1}>
            <View style={{ ...styles.titleSection, paddingTop: 24 }}>
              <Text style={styles.title}>친구</Text>
              <Image
                source={require("../../assets/arrowUp.png")}
                style={{
                  width: 24,
                  height: 24,
                  transform: [
                    { rotate: isFriendsComponentVisible3 ? "180deg" : "0deg" },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>
          {isFriendsComponentVisible3 ? (
            <Line color={"#C1C1C1"} h={2} />
          ) : (
            <Line color={"#1F1F1F"} h={2} />
          )}
          {isFriendsComponentVisible3 && (
            <FriendsComponent3
              Data={approveData}
              onRemoveFriend={onRemoveFriend}
            />
          )}
        </ScrollView>
      </View>
      {resultModalContent !== undefined ? (
        <CompetitionMsg
          isVisible={isRefuseMsgOpen}
          toggleModal={() => setIsRefuseMsgOpen(false)}
          name={resultModalContent?.name || ""}
          result={resultModalContent?.result || ""}
        />
      ) : (
        <></>
      )}
      {friendModalContent !== undefined ? (
        <FriendsMsg
          isVisible={isFriendMsgOpen}
          toggleModal={() => setIsFriendMsgOpen(false)}
          name={friendModalContent?.name || ""}
          onAccept={() => AddFriendData(friendModalContent?.userId)}
          onRefuse={() => RefuseFriendData(friendModalContent?.userId)}
        />
      ) : (
        <></>
      )}
      {battleModalContent !== undefined ? (
        <MatchMsg
          isVisible={isMatchModalVisible}
          toggleModal={() => setIsMatchModalVisible(false)}
          friendsId={battleModalContent?.userId}
          nickname={battleModalContent?.name}
          competitionId={battleModalContent?.competitionId}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: isIphone7 ? 10 : 16,
  },
  mainTitle: {
    fontSize: isIphone7 ? 18 : 22,
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: isIphone7 ? 20 : 24,
  },
  title: {
    fontSize: isIphone7 ? 16 : 20,
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
});

export default FriendsList;
