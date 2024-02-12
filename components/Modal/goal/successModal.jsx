import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Line from "../../Line";

const SuccessModal = ({ isOpenSuccess, openSuccess }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpenSuccess}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: "rgba(0, 0, 0, 0.3)",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          {/* 모달 닫기 버튼 */}
          <TouchableOpacity onPress={openSuccess} style={styles.closeButton}>
            <View style={{ padding: 10 }}>
              <Image
                source={require("../../../assets/close.png")}
                style={{ width: 16, height: 16 }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 40, marginBottom: 24 }}>
            <View
              style={{
                backgroundColor: "#B9F4D6",
                borderRadius: 80,
                paddingTop: 8,
                paddingBottom: 8,
                borderWidth: 1.5,
                borderRightWidth: 3,
                borderBottomWidth: 3,
                alignSelf: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={[
                  styles.resultText,
                  { paddingRight: 20, paddingLeft: 20 },
                ]}
              >
                절약 목표 달성 성공
              </Text>
            </View>
            <Text style={[styles.topText, { marginTop: 0 }]}>
              00월 00일까지 000,000원 쓰기
            </Text>
          </View>
          <Line h={2} color={"#1F1F1F"} />
          <View
            style={{
              paddingTop: 40,
              paddingBottom: 40,
              backgroundColor: "#FFFBF6",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/success.png")}
                style={{
                  width: 233,
                  height: 204,
                }}
              />
            </View>
            <Text style={[styles.text, { marginTop: 24 }]}>
              목표 달성에 성공했어요!
              {"\n"}축하드려요!
            </Text>
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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    // zIndex: 1,
  },
  resultText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    color: "#1F1F1F",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 700,
    color: "#1F1F1F",
  },
  topText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 900,
    color: "#1F1F1F",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 700,
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

export default SuccessModal;
