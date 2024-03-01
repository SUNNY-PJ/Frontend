import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Input from "../Input/input";
import LargeBtnDisable from "../Btn/largeBtnDisable";
import LargeBtn from "../Btn/largeBtn";
import Modal from "react-native-modal";

const MatchSendMsg = ({ isMatchModal, matchModal }) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [money, setMoney] = useState("");
  const [compensation, setCompensation] = useState("");
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const handleDateChange = (text) => {
    setDate(text);
  };

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const handleCompensationChange = (text) => {
    setCompensation(text);
  };

  const formattedMoney = (value) => {
    const parsedValue = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(parsedValue)) {
      return parsedValue.toLocaleString();
    } else {
      return "";
    }
  };

  // money 상태 변수 업데이트
  const handleMoneyChange = (text) => {
    const cleanedText = text.replace(/[^0-9,]/g, "");
    const formattedValue = formattedMoney(cleanedText);
    setMoney(formattedValue);
  };

  const handlePostApiTestStart = () => {
    alert("등록");
  };

  useEffect(() => {
    if (message && money && date) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [message, money, date, compensation]);

  return (
    <Modal
      isVisible={isMatchModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onSwipeComplete={matchModal}
      swipeDirection="down"
      style={styles.modal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
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
          <Input
            placeholder={"도발 메세지"}
            inputValue={message}
            handleInputChange={handleMessageChange}
          />
          <Text style={styles.subText}>* 최대 20자</Text>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>무엇을 걸고 대결할까요?</Text>
          <Input
            placeholder={"대결 보상"}
            inputValue={compensation}
            handleInputChange={handleCompensationChange}
          />
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>대결 기간과 금액을 설정해 주세요</Text>
          <Input
            placeholder={"대결 기간"}
            inputValue={date}
            handleInputChange={handleDateChange}
          />
          <Text style={styles.subText}>
            * 상대가 승낙한 시점부터 대결이 시작됩니다
          </Text>
          <Input
            placeholder={"대결 금액"}
            inputValue={money}
            handleInputChange={handleMoneyChange}
          />
        </View>
        <View style={{ marginBottom: 31 }}>
          {isAllFieldsFilled ? (
            <LargeBtn text={"등록하기"} onClick={handlePostApiTestStart} />
          ) : (
            <LargeBtnDisable text={"전송하기"} />
          )}
        </View>
      </KeyboardAvoidingView>
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
    fontFamily: "SUITE_Medium",
    paddingLeft: 10,
  },
  subText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
    paddingLeft: 10,
  },
});

export default MatchSendMsg;
