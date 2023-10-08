import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../Input/input";
import LargeBtnDisable from "../Btn/largeBtnDisable";
import Modal from "react-native-modal";

const MatchMsg = ({ isMatchModal, matchModal }) => {
  return (
    <Modal
      isVisible={isMatchModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onSwipeComplete={matchModal}
      swipeDirection="down"
      //   backdropColor="transparent"
      style={styles.modal} // 모달 스타일 추가
    >
      <View style={styles.modalContainer}>
        <View
          style={{
            width: 64,
            height: 4,
            backgroundColor: "#C1C1C1",
            alignSelf: "center",
            borderRadius: 12,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#1F1F1F",
            alignSelf: "center",
            marginBottom: 24,
            marginTop: 24,
          }}
        >
          민규에게 대결 신청
        </Text>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>친구를 도발해보세요!</Text>
          <Input placeholder={"도발 메세지"} />
          <Text style={styles.subText}>* 최대 20자</Text>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>무엇을 걸고 대결할까요?</Text>
          <Input placeholder={"대결 보상"} />
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>대결 기간과 금액을 설정해 주세요</Text>
          <Input placeholder={"대결 기간"} />
          <Text style={styles.subText}>
            * 상대가 승낙한 시점부터 대결이 시작됩니다
          </Text>
          <Input placeholder={"대결 금액"} />
        </View>
        <View style={{ marginBottom: 31 }}>
          <LargeBtnDisable text={"전송하기"} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    paddingTop: 20,
  },
  modalContent: {
    marginBottom: 24,
    gap: 8,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#1F1F1F",
    paddingLeft: 10,
  },
  subText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#5C5C5C",
    paddingLeft: 10,
  },
});

export default MatchMsg;
