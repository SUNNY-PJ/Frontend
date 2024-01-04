import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { proxyUrl } from "../../constant/common";

const MyPage = () => {
  const navigation = useNavigation();
  const handleTabClick = (tab) => {
    navigation.navigate("MyInfo", { activeTab: tab });
  };
  const [profile, setProfile] = useState([]);

  // 프로필 정보
  const fetchData = async () => {
    const inputURL = `/mypage`;
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");

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

  // 로그아웃
  const postData = async () => {
    const lououtUrl = "http://43.201.176.22:8080/mypage/auth/kakao/logout";
    const inputURL = "/mypage/auth/kakao/logout";
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const params = {
        client_id: "7ff971db2010c97a3e191dd319ec45cd",
        logout_redirect_uri: lououtUrl,
      };

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        params,
      });
      console.log("데이터:", response.data);
      alert("로그아웃 되었습니다.");

      navigation.navigate("KakaoScreen", { screen: "Login" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const handleLogoutClick = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            postData();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
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
              // source={require("../../assets/myPage_profile.png")}
              source={{ uri: item.profile }}
              style={{ width: 56, height: 56 }}
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
        <Line color={"#C1C1C1"} h={4} />
        <Text
          style={{
            fontSize: 16,
            color: "#1F1F1F",
            fontWeight: 900,
            paddingLeft: 20,
            paddingTop: 16,
            marginBottom: 8,
          }}
        >
          커뮤니티
        </Text>
        {/* <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate("MyInfo", {
              screen: "MyInfo",
            })
          }
        > */}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleTabClick("scrap")}
        >
          <Text style={styles.description}>스크랩</Text>
        </TouchableOpacity>
        <Line color={"#C1C1C1"} h={1} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleTabClick("write")}
        >
          <Text style={styles.description}>작성글</Text>
        </TouchableOpacity>
        <Line color={"#C1C1C1"} h={1} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleTabClick("comment")}
        >
          <Text style={styles.description}>작성 댓글</Text>
        </TouchableOpacity>
        <Line color={"#C1C1C1"} h={4} />
        <Text
          style={{
            fontSize: 16,
            color: "#1F1F1F",
            fontWeight: 900,
            paddingLeft: 20,
            paddingTop: 16,
            marginBottom: 8,
          }}
        >
          알림
        </Text>
        <Text style={styles.description}>알림 설정</Text>
        <Line color={"#C1C1C1"} h={4} />
        <Text
          style={{
            fontSize: 16,
            color: "#1F1F1F",
            fontWeight: 900,
            paddingLeft: 20,
            paddingTop: 16,
            marginBottom: 8,
          }}
        >
          회원
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={handleLogoutClick}>
          <Text style={styles.description}>로그아웃</Text>
        </TouchableOpacity>
        <Line color={"#C1C1C1"} h={1} />
        <Text style={styles.description}>회원 탈퇴</Text>
        <Line color={"#C1C1C1"} h={4} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 80,
          marginTop: 16,
        }}
      >
        <Image
          source={require("../../assets/myPage_notice.png")}
          style={{ width: 56, height: 84 }}
        />
        <Image
          source={require("../../assets/myPage_center.png")}
          style={{ width: 56, height: 84 }}
        />
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
  title: {
    fontSize: 16,
    color: "#1F1F1F",
    fontWeight: 900,
    paddingLeft: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#1F1F1F",
    fontWeight: 500,
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 20,
  },
});

export default MyPage;
