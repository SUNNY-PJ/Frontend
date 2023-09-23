import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Bottom from "../components/Bottom";
import Top from "../components/Top";
import Input from "../components/Input/input";
import LargeBtnBasic from "../components/Btn/largeBtnBasic";

function Note({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>지출 내역 추가</Text>
        <Text style={styles.label}>어떤 이름으로 기록할까요?</Text>
        <Input placeholder={"지출 내용"} />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>어디에 쓰셨나요?</Text>
          <View style={styles.noticeContainer}>
            <Image
              source={require("../assets/notice.png")}
              style={styles.noticeIcon}
            />
            <Text style={styles.noticeText}>구분 기준</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={styles.radioContainer}>
            <Image
              source={require("../assets/RadioBtnF.png")}
              style={styles.radioIcon}
            />
            <Text style={styles.radioText}>의류</Text>
          </View>
          <View style={styles.radioContainer}>
            <Image
              source={require("../assets/RadioBtnF.png")}
              style={styles.radioIcon}
            />
            <Text style={styles.radioText}>식생활</Text>
          </View>
          <View style={styles.radioContainer}>
            <Image
              source={require("../assets/RadioBtnF.png")}
              style={styles.radioIcon}
            />
            <Text style={styles.radioText}>주거</Text>
          </View>
          <View style={styles.radioContainer}>
            <Image
              source={require("../assets/RadioBtnF.png")}
              style={styles.radioIcon}
            />
            <Text style={styles.radioText}>기타</Text>
          </View>
        </View>
        <Text style={styles.label}>얼마를 쓰셨나요?</Text>
        <Input placeholder={"지출 금액"} />
        <Text style={styles.label}>언제 쓰셨나요?</Text>
        <Input placeholder={"지출 일자"} />
        <View style={styles.buttonContainer}>
          <LargeBtnBasic text={"등록하기"} onClick={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    marginTop: 25,
    marginBottom: 40,
    paddingLeft: 28,
    paddingRight: 27,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F1F1F",
    marginBottom: 8,
    marginTop: 32,
    paddingLeft: 10,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  noticeContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  noticeIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    marginBottom: 9,
    marginRight: 2,
  },
  noticeText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#5C5C5C",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C5C5C",
  },
  radioIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 40,
  },
});

export default Note;
