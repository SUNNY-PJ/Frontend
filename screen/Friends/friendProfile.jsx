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
} from "react-native";
import { useRoute } from "@react-navigation/native";
import FriendWrite from "./friendWrite";
import FriendComment from "./friendComment";

const FriendProfile = ({ openProfile, isOpenProfile, communityId }) => {
  // const activeTabVal = route.params?.activeTab || "scrap";
  const route = useRoute();
  const inputURL = `/profile/${communityId}`;
  const url = proxyUrl + inputURL;
  // const [activeTab, setActiveTab] = useState(activeTabVal);
  const [comment, setComment] = useState(false);
  const [write, setWrite] = useState(true);
  const [data, setData] = useState([]);

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
        // params: {
        //   communityId: itemId,
        // },
      });

      console.log("데이터1111:", response.data);
      const ProfileData = response.data.data;
      // const DetailCommentData = [DetailData].map((item) => item.commentList);
      setData([ProfileData]);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProfileClick = () => {};

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
              <TouchableOpacity style={styles.button}>
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
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text
                  style={{
                    color: "#000 ",
                    fontSize: 15,
                    fontWeight: 700,
                    alignSelf: "center",
                  }}
                >
                  친구맺기
                </Text>
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
            {write && <FriendWrite communityId={communityId} />}
            {comment && <FriendComment communityId={communityId} />}
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
    fontWeight: "700",
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
    fontWeight: 700,
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
    backgroundColor: "#FFC891",
    paddingBottom: 6,
    paddingTop: 6,
    width: 89,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#1F1F1F",
  },
});

export default FriendProfile;
