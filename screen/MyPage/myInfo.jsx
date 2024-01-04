import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyScrap from "./myScrap";
import MyWrite from "./myWrite";
import MyComment from "./myComment";

const MyInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const inputURL = `/mypage`;
  const url = proxyUrl + inputURL;
  const activeTabVal = route.params?.activeTab || "scrap";

  const [activeTab, setActiveTab] = useState(activeTabVal);
  const [profile, setProfile] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
      });

      console.log("프로필 정보:::", response.data);
      const profileData = response.data.data;
      setProfile([profileData]);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyPage", {
              screen: "MyPage",
            })
          }
        >
          <Image
            source={require("../../assets/prevBtn.png")}
            style={{ width: 24, height: 24, marginTop: 16 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {profile.map((item) => (
          <View
            style={{
              flexDirection: "row",
              marginTop: 24,
              marginBottom: 16,
              paddingLeft: 20,
              gap: 24,
            }}
            key={item.id}
          >
            <Image
              source={{ uri: item.profile }}
              style={{ width: 56, height: 56, borderRadius: 50 }}
            />
            <View style={{ gap: 8 }}>
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate("SettingProfile", {
                    screen: "SettingProfile",
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.setting}>프로필 설정</Text>
                  <Image
                    source={require("../../assets/myPage_setting.png")}
                    style={{ width: 16, height: 16, padding: 2, top: 2 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 29,
            marginBottom: 6,
          }}
        >
          <TouchableOpacity
            onPress={() => handleTabClick("scrap")}
            activeOpacity={0.6}
            style={{ paddingLeft: 34 }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "scrap" && styles.activeTabText,
              ]}
            >
              스크랩
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabClick("write")}
            activeOpacity={0.6}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "write" && styles.activeTabText,
              ]}
            >
              작성글
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabClick("comment")}
            activeOpacity={0.6}
            style={{ paddingRight: 34 }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "comment" && styles.activeTabText,
              ]}
            >
              작성 댓글
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabBar}>
          <View
            style={[
              styles.tabBarLine,
              activeTab === "scrap" && styles.activeTabBarLine,
            ]}
          />
          <View
            style={[
              styles.tabBarLine,
              activeTab === "write" && styles.activeTabBarLine,
            ]}
          />
          <View
            style={[
              styles.tabBarLine,
              activeTab === "comment" && styles.activeTabBarLine,
            ]}
          />
        </View>
        {activeTab === "scrap" && <MyScrap />}
        {activeTab === "write" && <MyWrite />}
        {activeTab === "comment" && <MyComment />}
      </View>
    </View>
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
  name: { fontSize: 20, color: "#1F1F1F", fontWeight: 900 },
  setting: {
    fontSize: 16,
    color: "#5C5C5C",
    fontWeight: 600,
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
});

export default MyInfo;
