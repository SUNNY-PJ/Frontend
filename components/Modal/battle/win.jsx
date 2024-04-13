import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
} from "react-native";
import Line from "../../Line";
import LottieView from "lottie-react-native";

const WinModal = ({ isOpenProfile, openProfile }) => {
  const windowWidth = Dimensions.get("window").width;
  const animation = useRef(null);

  return (
    <View style={styles.container}>
      <Modal animationType="none" transparent={true} visible={isOpenProfile}>
        <View style={styles.modalContainer}>
          {/* 모달 닫기 버튼 */}
          <TouchableOpacity onPress={openProfile} style={styles.closeButton}>
            <View style={{ padding: 24 }}>
              <Image
                source={require("../../../assets/close.png")}
                style={{ width: 14, height: 14 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 70, marginBottom: 24 }}>
            <View
              style={{
                backgroundColor: "#B9F4D6",
                borderRadius: 80,
                paddingTop: 8,
                paddingBottom: 8,
                borderWidth: 1.5,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                width: 130,
                alignSelf: "center",
                marginBottom: 16,
              }}
            >
              <Text style={[styles.resultText, { marginTop: 0 }]}>
                대결 결과
              </Text>
            </View>
            <Text style={[styles.topText, { marginTop: 0 }]}>
              **과
              {"\n"}oo을 걸고
              {"\n"}MM월 DD일까지 NNN,NNN원 쓰기
            </Text>
          </View>
          <Line h={2} color={"#1F1F1F"} />
          <View style={{ marginTop: 40 }}>
            <View style={styles.imageContainer}>
              {/* <Image
                source={require("../../../assets/winnerAnimation.gif")}
                style={{
                  width: windowWidth - 35,
                  height: windowWidth - 80,
                  position: "absolute",
                }}
              /> */}
              <Image
                source={require("../../../assets/winIcon.png")}
                style={{
                  width: 184,
                  height: 184,
                  marginBottom: 60,
                  marginTop: 120,
                  zIndex: 10,
                  // position: "absolute",
                }}
              />
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: windowWidth - 35,
                  height: windowWidth - 80,
                  position: "absolute",
                }}
                source={require("../../../data/battle_win.json")}
              />
            </View>
            <Text style={[styles.text, { marginTop: 80 }]}>
              @@님이 대결에서 이겼어요!
              {"\n"}축하드려요!
            </Text>
            {/* <View
              style={{
                backgroundColor: "#FFA851",
                borderRadius: 8,
                paddingTop: 15,
                paddingBottom: 15,
                borderWidth: 1.5,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                width: 300,
                marginTop: 40,
              }}
            >
              <Text style={[styles.buttonText, {}]}>**에게 메세지 보내기</Text>
            </View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  resultText: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
  },
  topText: {
    textAlign: "center",
    fontSize: 20,
    color: "#1F1F1F",
    fontFamily: "SUITE_Heavy",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default WinModal;
