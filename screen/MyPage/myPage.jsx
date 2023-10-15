import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";

const MyPage = () => {
  const navigation = useNavigation();
  const handleTabClick = (tab) => {
    navigation.navigate("MyInfo", { activeTab: tab });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
            marginBottom: 16,
            paddingLeft: 20,
            gap: 24,
          }}
        >
          <Image
            source={require("../../assets/myPage_profile.png")}
            style={{ width: 56, height: 56 }}
          />
          <View style={{ gap: 8 }}>
            <Text style={styles.name}>사용자12</Text>
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
        <Text style={styles.description}>로그아웃</Text>
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
