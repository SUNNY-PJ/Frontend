import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Input from "../components/Input/input";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePickerCalendar from "../components/Calendar/rangeCalendar";
import LargeBtn from "../components/Btn/largeBtn";

function Goal({ navigation }) {
  const [isOpenNoticeMsg, setIsOpenNoticeMsg] = useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  console.log("date::", date);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDateRangeSelect = (start, end) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setDate(`${start} - ${end}`);
    closeModal(); // 날짜 선택 후 모달 닫기
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const formattedMoney = (value) => {
    const parsedValue = parseFloat(value.replace(/,/g, ""));

    // 숫자가 유효하면 포맷팅된 문자열 반환, 그렇지 않으면 빈 문자열 반환
    if (!isNaN(parsedValue)) {
      return parsedValue.toLocaleString();
    } else {
      return "";
    }
  };

  const handleMoneyChange = (text) => {
    const cleanedText = text.replace(/[^0-9,]/g, "");
    const formattedValue = formattedMoney(cleanedText);
    setCost(formattedValue);
  };

  useEffect(() => {
    if (name && cost && date) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [name, cost, date]);

  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const bodyData = {
        start_date: selectedStartDate,
        end_date: selectedEndDate,
        cost: cost.replace(/,/g, ""),
      };

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      navigation.navigate("FriendsList", { screen: "FriendsList" });
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handlePostApiTestStart = () => {
    postData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsOpenNoticeMsg(false)}
        activeOpacity={1}
      >
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>절약 목표 설정 </Text>
            <Text style={styles.label}>절약 목표 내용을 입력해주세요</Text>
            <Input
              placeholder={"지출 내용"}
              inputValue={name}
              handleInputChange={handleNameChange}
            />
            <View>
              {isOpenNoticeMsg && (
                <Notice openNoticeMsg={() => setIsOpenNoticeMsg(true)} />
              )}
            </View>
            <Text style={styles.label}>지출 목표 금액을 입력해주세요</Text>
            <Input
              placeholder={"지출 금액"}
              inputValue={cost}
              handleInputChange={handleMoneyChange}
            />
            <Text style={styles.label}>절약 기간을 선택해주세요</Text>
            <TouchableOpacity
              style={[
                styles.calendar,
                {
                  borderColor: isInputFocused
                    ? "#FFA851"
                    : selectedStartDate
                    ? "#1F1F1F"
                    : "#C1C1C1",
                  borderBottomWidth: isInputFocused
                    ? 1.5
                    : selectedStartDate
                    ? 3
                    : 1.5,
                  borderRightWidth: isInputFocused
                    ? 1.5
                    : selectedStartDate
                    ? 3
                    : 1.5,
                },
              ]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPress={openModal}
            >
              <Text>
                {selectedStartDate} - {selectedEndDate}
              </Text>
              {/* <DatePickerCalendar onDateRangeSelect={handleDateRangeSelect} /> */}
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              {isAllFieldsFilled ? (
                <LargeBtn text={"등록하기"} onClick={handlePostApiTestStart} />
              ) : (
                <LargeBtnDisable text={"등록하기"} />
              )}
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>

      {/* 모달 추가 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Text>날짜를 선택하세요.</Text> */}
            <DatePickerCalendar onDateRangeSelect={handleDateRangeSelect} />
            {/* <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeModalText}>닫기</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBF6",
    height: "100%",
  },
  contentContainer: {
    marginTop: 25,
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
  buttonContainer: {
    marginTop: 125,
  },
  calendar: {
    width: "100%",
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: 11,
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: "center",
    color: "black",
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  closeModalText: {
    marginTop: 10,
    textAlign: "center",
    color: "#000",
  },
});

export default Goal;
