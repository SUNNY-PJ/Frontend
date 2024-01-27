import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";
import { proxyUrl } from "../../constant/common";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Line from "../../components/Line";

const Alarm = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const fetchData = async () => {
    const inputURL = "/alarm/list";
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("알림 데이터:", response.data.data);
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
            style={{ width: 24, height: 24, marginTop: 25 }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 22,
          color: "#1F1F1F",
          fontWeight: 700,
          alignSelf: "center",
          bottom: 22,
        }}
      >
        알림
      </Text>
      <ScrollView style={{ height: windowHeight - 125 - 88 }}>
        <View style={{ backgroundColor: "#fff" }}>
          <Text style={styles.dayText}>오늘</Text>
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.section}>
            <Image
              source={require("../../assets/myPage_profile.png")}
              style={{ width: 60, height: 60 }}
            />
            <View>
              <Text style={styles.titleText}>새로운 댓글이 달렸어요</Text>
              <Text style={styles.contentText}>댓글 내용입니다아아ㅏㅏ</Text>
              <View style={styles.bottomSection}>
                <Text style={styles.nameText}>닉네임</Text>
                <Text style={styles.dateText}>2023.09.10</Text>
              </View>
            </View>
          </View>
          <Line h={1} color={"#C1C1C1"} />
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.section}>
            <Image
              source={require("../../assets/myPage_profile.png")}
              style={{ width: 60, height: 60 }}
            />
            <View>
              <Text style={styles.titleText}>새로운 댓글이 달렸어요</Text>
              <Text style={styles.contentText}>댓글 내용입니다아아ㅏㅏ</Text>
              <View style={styles.bottomSection}>
                <Text style={styles.nameText}>닉네임</Text>
                <Text style={styles.dateText}>2023.09.10</Text>
              </View>
            </View>
          </View>
          <Line h={1} color={"#C1C1C1"} />
        </View>
        <Line h={2} color={"#C1C1C1"} />
        <View style={{ backgroundColor: "#fff" }}>
          <Text style={styles.dayText}>지난 30일</Text>
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.section}>
            <Image
              source={require("../../assets/myPage_profile.png")}
              style={{ width: 60, height: 60 }}
            />
            <View>
              <Text style={styles.titleText}>새로운 댓글이 달렸어요</Text>
              <Text style={styles.contentText}>댓글 내용입니다아아ㅏㅏ</Text>
              <View style={styles.bottomSection}>
                <Text style={styles.nameText}>닉네임</Text>
                <Text style={styles.dateText}>2023.09.10</Text>
              </View>
            </View>
          </View>
          <Line h={1} color={"#C1C1C1"} />
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.section}>
            <Image
              source={require("../../assets/myPage_profile.png")}
              style={{ width: 60, height: 60 }}
            />
            <View>
              <Text style={styles.titleText}>새로운 댓글이 달렸어요</Text>
              <Text style={styles.contentText}>댓글 내용입니다아아ㅏㅏ</Text>
              <View style={styles.bottomSection}>
                <Text style={styles.nameText}>닉네임</Text>
                <Text style={styles.dateText}>2023.09.10</Text>
              </View>
            </View>
          </View>
          <Line h={1} color={"#C1C1C1"} />
        </View>
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
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 12,
  },
  dayText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1F1F1F",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  dateText: { fontSize: 12, fontWeight: 500, color: "#1F1F1F" },
  nameText: { fontSize: 12, fontWeight: 500, color: "#1F1F1F" },
  contentText: { fontSize: 16, fontWeight: 500, color: "#1F1F1F" },
  titleText: { fontSize: 12, fontWeight: 700, color: "#5C5C5C" },
  bottomSection: { flexDirection: "row", gap: 8, marginTop: 6 },
});

export default Alarm;
