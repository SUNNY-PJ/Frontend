import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import RegularBtnOrange from "../../Btn/regularBtnOrange";

const Goal80Msg = ({ isOpenGoalMessage, openGoalMessage }) => {
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
            <Image
              source={require("../../../assets/80bar.png")}
              style={{ width: 300, height: 32, alignSelf: "center" }}
            />
            <Text style={styles.title}>
              목표금액 150,000원까지 {"\n"}
              벌써 80%에 도달 했어요!
            </Text>
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
    width: 335,
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
    marginBottom: 22,
    fontFamily: "SUITE",
  },
  content: {
    gap: 32,
    paddingTop: 75,
    paddingBottom: 32,
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

export default Goal80Msg;
