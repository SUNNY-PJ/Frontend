import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import MyScrap from "./myScrap";
import MyWrite from "./myWrite";
import MyComment from "./myComment";
import Line from "../../components/Line";
import ToggleSwitch from "../../components/Btn/toggleBtn";
import ToggleBtn from "../../components/Btn/toggleBtn";

const SettingAlarm = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <View style={{}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyPage", {
              screen: "MyPage",
            })
          }
        >
          <Image
            source={require("../../assets/prevBtn.png")}
            style={{ width: 24, height: 24, marginTop: 16, marginLeft: 20 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            color: "#1F1F1F",
            fontWeight: 700,
            alignSelf: "center",
            bottom: 20,
          }}
        >
          알림 설정
        </Text>
      </View>
      <ScrollView style={{ height: windowHeight - 125 - 88 }}>
        <Text style={[styles.title, {}]}>커뮤니티</Text>
        <View style={styles.section}>
          <Text style={styles.description}>댓글 알림</Text>
          <ToggleBtn />
        </View>
        <Line color={"#C1C1C1"} h={1} />
        <View style={styles.section}>
          <Text style={styles.description}>답글 알림</Text>
          <ToggleBtn />
        </View>
        <Line color={"#C1C1C1"} h={4} />
        <Text style={[styles.title, {}]}>대결</Text>
        <View style={styles.section}>
          <Text style={styles.description}>대결 신청 알림</Text>
          <ToggleBtn />
        </View>
        <Line color={"#C1C1C1"} h={1} />
        <View style={styles.section}>
          <Text style={styles.description}>대결 신청 승낙 여부 알림</Text>
          <ToggleBtn />
        </View>
        <Line color={"#C1C1C1"} h={1} />
        <View style={styles.section}>
          <Text style={styles.description}>대결 결과 알림</Text>
          <ToggleBtn />
        </View>
        <Line color={"#C1C1C1"} h={4} />
        <Text style={[styles.title, {}]}>대화</Text>
        <View style={styles.section}>
          <Text style={styles.description}>새로운 메시지 알림</Text>
          <ToggleBtn />
        </View>
        <Line color={"#C1C1C1"} h={4} />
        <Text style={[styles.title, {}]}>친구</Text>
        <View style={styles.section}>
          <Text style={styles.description}>친구 신청 수신 알림</Text>
          <ToggleBtn />
        </View>
        <Line color={"#C1C1C1"} h={1} />
        <View style={styles.section}>
          <Text style={styles.description}>친구 신청 결과 알림</Text>
          <ToggleBtn />
        </View>
        <Line color={"#C1C1C1"} h={1} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUIT_ExtraBold",

    paddingLeft: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
});

export default SettingAlarm;
