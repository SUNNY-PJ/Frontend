import axios from "axios";
import React, { useState, useEffect } from "react";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import FriendWrite from "./friendWrite";
import FriendComment from "./friendComment";

const FriendProfile = ({ openProfile, isOpenProfile, userId }) => {
  // const activeTabVal = route.params?.activeTab || "scrap";
  const route = useRoute();
  const inputURL = `/users`;
  const url = proxyUrl + inputURL;
  // const [activeTab, setActiveTab] = useState(activeTabVal);
  const [comment, setComment] = useState(false);
  const [write, setWrite] = useState(true);
  const [data, setData] = useState([]);
  const [isFriend, setIsFriend] = useState();
  const [status, setStatus] = useState();
  const [friendId, setFriendId] = useState(0);
  const [friendName, setFriendName] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const commentClick = () => {
    setComment(true);
    setWrite(false);
  };

  const writeClick = () => {
    setWrite(true);
    setComment(false);
  };

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          userId: userId,
        },
      });

      console.log("데이터1111:", response.data);
      const ProfileData = response.data;
      const ProfileId = [ProfileData].map((item) => item.id);
      const ProfileName = [ProfileData].map((item) => item.name);
      setFriendId(ProfileId);
      setFriendName(ProfileName);
      setData([ProfileData]);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 친구인지 아닌지 확인
  const confirmData = async () => {
    const inputURL = `/friends/${friendId}`;
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("데이터:??", response.data.data);
      const isFriendData = response.data.data.isFriend;
      const statusData = response.data.data.status;
      setIsFriend(isFriendData);
      setStatus(statusData);
      if (statusData === "WAIT") {
        setStatus("대기중");
      } else if (statusData === "APPROVE") {
        setStatus("친구끊기");
      } else if (statusData === null) {
        setStatus("친구맺기");
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (friendId) {
      confirmData();
    }
  }, [friendId]);

  // 친구 신청
  const postData = async () => {
    const inputURL = `/friends/${friendId}`;
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log("친구신청>>>>", response.data);

      if (response.status === 200) {
        if (response.data.status === 400) {
          Alert.alert(
            "Error",
            `서버 장애가 발생했습니다.\n관리자에게 문의 바랍니다.`
          );
        } else if (response.data.status === 500) {
          Alert.alert("친구 신청", `이미 친구 신청을 했습니다.`);
        } else {
          Alert.alert("친구 신청", `${friendName}에게 친구 신청을 했습니다.`);
          fetchData();
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        if (error.response.data.status === 500) {
          alert("이미 친구 신청을 한 사용자입니다.");
        }
      } else {
        console.error("에러:", error);
      }
    }
  };

  const handleFriend = () => {
    if (isFriend) {
      console.log("친구를 끊어볼까");
      deleteFriendData();
    } else if (!isFriend) {
      console.log("친구를 맺어볼까");
      postData();
    }
  };

  // 친구 끊기
  const deleteFriendData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const inputURL = `/friends/${friendId}`;
    const url = proxyUrl + inputURL;

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isOpenProfile}>
      <View style={styles.container}>
        <View style={{ paddingLeft: 24, marginTop: 64 }}>
          <TouchableOpacity onPress={openProfile}>
            <Image
              source={require("../../assets/close.png")}
              style={{ width: 14, height: 14 }}
            />
          </TouchableOpacity>
        </View>
        {data.map((item) => (
          <View style={styles.contentContainer} key={item.id}>
            <View style={{ alignSelf: "center", gap: 5 }}>
              <Image
                // source={require("../../assets/friend_profile.png")}
                source={{ uri: item.profile }}
                style={{ width: 92, height: 92, borderRadius: 50 }}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 60,
                alignSelf: "center",
                marginTop: 27,
              }}
            >
              {/* <TouchableOpacity style={styles.button}>
                <Text
                  style={{
                    color: "#000 ",
                    fontSize: 15,
                    fontWeight: 700,
                    alignSelf: "center",
                  }}
                >
                  대화하기
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      status === "대기중" ? "#F1F1F1" : "#FFC891",
                  },
                ]}
                onPress={handleFriend}
              >
                <Text style={styles.btnText}>{status}</Text>
              </TouchableOpacity>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {},
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  tabText: {
    fontSize: 20,
    fontFamily: "SUITE_Bold",
    color: "#C1C1C1",
  },
  activeTabText: {
    color: "#1F1F1F",
  },
  tabBar: {
    flexDirection: "row",
    // marginBottom: 12,
  },
  tabBarLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#C1C1C1",
  },
  activeTabBarLine: {
    backgroundColor: "#1F1F1F",
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  name: {
    color: "#1F1F1F",
    fontSize: 22,
    fontFamily: "SUITE_Bold",
    alignSelf: "center",
  },
  box: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, color: "#000", fontWeight: 500, padding: 4 },
  description: {
    fontSize: 12,
    color: "#000",
    fontWeight: 500,
    padding: 4,
    gap: 8,
  },
  button: {
    // backgroundColor: "#FFC891",
    paddingBottom: 6,
    paddingTop: 6,
    width: 89,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#1F1F1F",
  },
  btnText: {
    color: "#000 ",
    fontSize: 15,
    fontWeight: 700,
    alignSelf: "center",
    fontFamily: "SUITE_Bold",
  },
});

export default FriendProfile;
