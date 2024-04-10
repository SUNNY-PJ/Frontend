import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import RegularBtnOrange from "../../Btn/regularBtnOrange";
import Progress2 from "../../progress/progress2";

const GoalMsg = ({
  isOpenGoalMessage,
  openGoalMessage,
  percentage,
  cost,
  fail,
}) => {
  let backgroundColor = "#FFA851";

  useEffect(() => {
    if (percentage <= 0) {
      backgroundColor = "#F97B7B"; // 음수일 때 색상
    } else if (percentage <= 20) {
      backgroundColor = "#F97B7B"; // 20 이하일 때 색상
    } else if (percentage <= 49) {
      backgroundColor = "#FAC337"; // 49 이하일 때 색상
    } else if (percentage <= 100) {
      backgroundColor = "#6ADCA3"; // 100 이하일 때 색상
    }
  }, []);

  return (
    <Modal animationType="none" transparent={true} visible={isOpenGoalMessage}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            {fail ? (
              <Image
                source={require("../../../assets/logo/bad_large.png")}
                style={{ width: 120, height: 120, alignSelf: "center" }}
              />
            ) : (
              <Progress2 progress={percentage} color={backgroundColor} />
            )}
            {fail ? (
              <Text style={styles.title}>
                목표 금액 {cost}원을 {"\n"}다 썼어요... {"\n"}그렇다고 마음껏
                낭비하시면 안 돼요!
              </Text>
            ) : (
              <Text style={styles.title}>
                목표금액 {cost}원까지 {"\n"}
                벌써 {percentage}%에 도달 했어요!
              </Text>
            )}
            <TouchableOpacity onPress={openGoalMessage} activeOpacity={0.6}>
              <RegularBtnOrange text={"확인"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 315,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    backgroundColor: "#fff",
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
    fontFamily: "SUITE_Medium",
  },
  content: {
    gap: 26,
    paddingTop: 35,
    paddingBottom: 26,
  },
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#FFA851",
    borderRadius: 29,
  },
});

export default GoalMsg;
