import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const Notice = ({ openNoticeMsg }) => {
  return (
    <View style={styles.modalContainer}>
      <ImageBackground
        source={require("../../assets/noticeBackground.png")}
        style={{ width: 176, height: 91 }}
      >
        <TouchableOpacity
          onPress={openNoticeMsg}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require("../../assets/close.png")}
            style={{
              width: 8,
              height: 8,
              alignSelf: "flex-end",
              marginRight: 12,
              top: 12,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "SUITE",
            marginLeft: 16,
            marginTop: 6,
            color: "#5C5C5C",
          }}
        >
          의류: 의복{"\n"}
          식생활: 주식, 음료, 간식{"\n"}
          주거: 월세, 관리비, 생필품{"\n"}
          기타: 문화생활, 유흥, 그 외
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: -23,
    left: 17,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notice;
