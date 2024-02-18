import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Input from "../components/Input/input";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LargeBtn from "../components/Btn/largeBtn";
import Notice from "../components/Modal/notice";
import DatePicker from "../components/DatePicker/datePicker";
import { proxyUrl } from "./common";
import DatePicker2 from "../components/DatePicker/datePicker2";

function Goal({ navigation }) {
  const inputURL = "/save";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");
  const url = proxyUrl + cleanedURL;

  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [isOpenNoticeMsg, setIsOpenNoticeMsg] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startDateVal, setStartDateVal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateVal, setEndDateVal] = useState("");
  const [cost, setCost] = useState(0);

  console.log(startDate);

  const handleStartDateChange = (formattedDate) => {
    setStartDate(formattedDate);
  };

  const handleStartDateValChange = (formattedDate) => {
    setStartDateVal(formattedDate);
  };

  const handleEndDateChange = (formattedDate) => {
    setEndDate(formattedDate);
  };

  const handleEndDateValChange = (formattedDate) => {
    setEndDateVal(formattedDate);
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const openNoticeMsg = () => {
    setIsOpenNoticeMsg(!isOpenNoticeMsg);
  };

  const closeNoticeMsg = () => {
    setIsOpenNoticeMsg(false);
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
    if (cost && startDate && endDate) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [cost, startDate, endDate]);

  // 절약 목표 등록
  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const bodyData = {
        start_date: startDateVal,
        end_date: endDateVal,
        cost: cost.replace(/,/g, ""),
      };

      console.log("????", bodyData);

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        Alert.alert("절약 목표를 등록하였습니다.");
        navigation.goBack();
        console.log(response.data.data);
      } else {
        alert("서버에 장애가 발생하였습니다.");
      }
      console.log("목표 등록");
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handlePost = () => {
    postData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeNoticeMsg} activeOpacity={1}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>절약 목표 설정 </Text>
            <Text style={styles.label}>지출 목표 금액을 입력해주세요</Text>
            <Input
              placeholder={"지출 금액"}
              inputValue={cost}
              handleInputChange={handleMoneyChange}
            />
            <View>
              {isOpenNoticeMsg && <Notice openNoticeMsg={openNoticeMsg} />}
            </View>
            <Text style={styles.label}>절약 시작 일자를 선택해주세요</Text>
            <TouchableOpacity onPress={showStartDatePicker}>
              <DatePicker2
                showDatePicker={showStartDatePicker}
                hideDatePicker={hideStartDatePicker}
                isDatePickerVisible={isStartDatePickerVisible}
                handleDateChange={handleStartDateChange}
                handleDateValueChange={handleStartDateValChange}
                inputText={"시작 일자:"}
                title={"시작 일자"}
                showDayOfWeek={true}
              />
            </TouchableOpacity>
            <Text style={styles.label}>절약 종료 일자를 선택해주세요</Text>
            <TouchableOpacity onPress={showEndDatePicker}>
              <DatePicker2
                showDatePicker={showEndDatePicker}
                hideDatePicker={hideEndDatePicker}
                isDatePickerVisible={isEndDatePickerVisible}
                handleDateChange={handleEndDateChange}
                handleDateValueChange={handleEndDateValChange}
                title={"종료 일자"}
                inputText={"종료 일자:"}
                showDayOfWeek={true}
              />
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              {isAllFieldsFilled ? (
                <LargeBtn text={"등록하기"} onClick={handlePost} />
              ) : (
                <LargeBtnDisable text={"등록하기"} />
              )}
            </View>
            <Text style={[styles.subText, { marginTop: 8 }]}>
              절약 목표는 사용자당 한 번에 하나씩만 등록 및 진행 가능하며,{"\n"}
              종료 일자 자정 이후 자동으로 초기화됩니다.
            </Text>
          </View>
        </ScrollView>
      </TouchableOpacity>
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
    marginTop: 105,
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
  subText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#5C5C5C",
    textAlign: "center",
  },
});

export default Goal;
