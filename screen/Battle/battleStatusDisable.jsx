import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import Progress from "../../components/progress/progress";
import apiClient from "../../api/apiClient";
import { useRoute } from "@react-navigation/native";

const BattleStatusDisable = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { friendId } = route.params;
  const { nickname } = route.params;
  const { end_date } = route.params;
  const { price } = route.params;
  const { user_percent } = route.params;
  const { friends_percent } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.boldText, { textAlign: "center", marginTop: 16 }]}>
          {/* {data.compensation}을 걸고 {"\n"} */}
          {end_date}까지 {price}원 쓰기
        </Text>
      </View>
      <Line h={2} color={"#1F1F1F"} />
      {/* <ScrollView> */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={[styles.boldSmallText, { marginBottom: 16, marginTop: 52 }]}
        >
          친구의 탈퇴로 대결이 자동 종료되었어요
        </Text>
        <Text style={[styles.boldText, { marginTop: 13, marginBottom: 10 }]}>
          나는
        </Text>
        <Progress progress={50} color={"#C1C1C1"} />
        <Text style={[styles.boldText]}>
          {user_percent}%<Text style={[styles.text]}>남았어요</Text>
        </Text>
        <Image
          source={require("../../assets/VSIconDisable.png")}
          style={{
            width: 51,
            height: 64,
            alignSelf: "center",
            marginTop: 25,
            marginBottom: 11,
          }}
        />
        <Text style={[styles.boldText, { marginBottom: 10 }]}>
          {nickname}님은
        </Text>
        <Progress progress={50} color={"#C1C1C1"} />
        <Text style={[styles.boldText]}>
          {friends_percent}% <Text style={[styles.text]}>남았어요</Text>
        </Text>
        <Text
          style={[
            styles.subText,
            { textDecorationLine: "underline", marginTop: 40 },
          ]}
        >
          포기하기
        </Text>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBF6",
    height: "100%",
  },
  section: {
    // paddingTop: 22,
    paddingBottom: 14,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  boldText: {
    fontSize: 22,
    fontWeight: 900,
    color: "#C1C1C1",
    marginTop: 14,
    fontFamily: "SUITE_ExtraBold",
  },
  boldSmallText: {
    fontSize: 16,
    fontWeight: 900,
    color: "#1F1F1F",
    marginTop: 14,
    fontFamily: "SUITE_ExtraBold",
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: "#C1C1C1",
    fontFamily: "SUITE",
  },
  subText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#5C5C5C",
    fontFamily: "SUITE_Bold",
  },
});

export default BattleStatusDisable;
