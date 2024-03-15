import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { proxyUrl } from "../../constant/common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Line from "../../components/Line";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import FriendsComponent from "./friendsComponent";
import apiClient from "../../api/apiClient";

function FriendsList() {
  const route = useRoute();
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

  const [approveData, setApproveData] = useState([]);
  const [waitData, setWaitData] = useState([]);

  const fetchData = async () => {
    const inputURL = `/friends`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const Data = response.data.data;
      const ApproveFriendsData = Data.approveList;
      const WaitFriendsData = Data.waitList;
      setApproveData(ApproveFriendsData);
      setWaitData(WaitFriendsData);
      console.log("친구 목록:::", Data.approveList);
      console.log("친구 신청 목록:::", Data.waitList);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route]);

  const PostData = async (friendId) => {
    const inputURL = `/friends/approve/${friendId}`;
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
      console.log("친구 수락함", response.data);
      if (response.status === 200) {
        if (response.data.status === 401) {
          alert("에러가 발생했습니다. 관리자에게 문의 바랍니다.");
        } else {
          alert("친구가 되었습니다!");
          fetchData();
        }
      } else if (response.status === 500) {
        alert(response.message);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const AddFriendData = (friendId) => {
    Alert.alert(
      "친구 수락",
      "친구 신청을 수락하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => PostData(friendId),
        },
      ],
      { cancelable: false }
    );
  };

  const onRemoveFriend = (friendsId) => {
    Alert.alert(
      "친구 삭제",
      "친구를 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => deleteData(friendsId),
        },
      ],
      { cancelable: false }
    );
  };

  // 친구 삭제
  const deleteData = async (friendsId) => {
    const inputURL = `/friends/${friendsId}`;
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("친구 삭제함", response.data);
      if (response.status === 200) {
        if (response.data.status === 401) {
          alert("에러가 발생했습니다. 관리자에게 문의 바랍니다.");
        } else {
          alert("친구를 삭제했습니다");
          fetchData();
        }
      } else if (response.status === 500) {
        alert(response.message);
      }
    } catch (error) {
      console.error("에러:", error);
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
        {isFriendsComponentVisible1 && <FriendsComponent Data={[]} />}
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
          <FriendsComponent Data={waitData} onAddFriend={AddFriendData} />
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
          <FriendsComponent
            Data={approveData}
            onRemoveFriend={onRemoveFriend}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 16,
  },
  mainTitle: {
    fontSize: 22,
    fontFamily: "SUITE_Bold",
    fontWeight: 700,
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
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
