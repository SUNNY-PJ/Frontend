import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { styles } from "./sendMatch.styles";
import LargeBtnDisable from "../../components/Btn/largeBtnDisable";
import LargeBtn from "../../components/Btn/largeBtn";
import Input from "../../components/Input/input";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import DatePicker2 from "../../components/DatePicker/datePicker2";
import apiClient from "../../api/apiClient";

function SendMatch() {
  const navigation = useNavigation();
  const inputURL = "/competition";
  const route = useRoute();
  const { friendId } = route.params;
  const { name } = route.params;
  const windowHeight = Dimensions.get("window").height;

  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [date, setDate] = useState("");
  const [money, setMoney] = useState(0);
  const [message, setMessage] = useState("");
  const [reward, setReward] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startDateVal, setStartDateVal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateVal, setEndDateVal] = useState("");

  const handleDateChange = (text) => {
    setDate(text);
  };

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

  const handleMessageChange = (text) => {
    setMessage(text);
  };
  const handleRewardChange = (text) => {
    setReward(text);
  };

  const formattedMoney = (value) => {
    const parsedValue = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(parsedValue)) {
      return parsedValue.toLocaleString();
    } else {
      return "";
    }
  };

  const handleMoneyChange = (text) => {
    const cleanedText = text.replace(/[^0-9,]/g, "");
    const formattedValue = formattedMoney(cleanedText);
    setMoney(formattedValue);
  };

  useEffect(() => {
    // if (message && money && startDate && endDate) {
    if (message && money && startDate && endDate && reward) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [message, money, startDate, endDate, reward]);

  // 대결 신청
  const postData = async () => {
    try {
      const bodyData = {
        compensation: reward,
        // day: date,
        startDate: startDateVal,
        endDate: endDateVal,
        friendsId: friendId,
        message: message,
        price: money.replace(/,/g, ""),
      };
      const response = await apiClient.post(inputURL, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      Alert.alert("", `${name}에게 대결 신청을 했습니다.`);
      navigation.navigate("MainScreen", { screen: "FriendsList" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류: send match msg", error.response.data);
        console.error("서버 응답 메세지:", error.message);
        Alert.alert("error", error.response.data.message);
      } else {
        console.error("에러:", error);
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      }
    }
  };

  const handlePost = () => {
    postData();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 100 }}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>{name}에게 대결 신청</Text>
          <Text style={[styles.label]}>친구를 도발해보세요!</Text>
          <Input
            placeholder={"도발 메시지"}
            inputValue={message}
            handleInputChange={handleMessageChange}
          />
          <Text style={[styles.subText]}>* 최대 20자</Text>
          <Text style={styles.label}>무엇을 걸고 대결할까요?</Text>
          <Input
            placeholder={"대결 보상"}
            inputValue={reward}
            handleInputChange={handleRewardChange}
          />
          {/* <Text style={styles.label}>대결 기간과 금액을 선택해주세요</Text>
          <Input
            placeholder={"대결 기간"}
            inputValue={date}
            handleInputChange={handleDateChange}
          /> */}
          <Text style={styles.label}>대결 시작 일자를 선택해주세요</Text>
          <TouchableOpacity onPress={showStartDatePicker}>
            <DatePicker2
              showDatePicker={showStartDatePicker}
              hideDatePicker={hideStartDatePicker}
              isDatePickerVisible={isStartDatePickerVisible}
              handleDateChange={handleStartDateChange}
              handleDateValueChange={handleStartDateValChange}
              inputText={"대결 시작 일자:"}
              title={"대결 시작 일자"}
              showDayOfWeek={false}
            />
          </TouchableOpacity>
          <Text style={styles.label}>대결 종료 일자를 선택해주세요</Text>
          <TouchableOpacity onPress={showEndDatePicker}>
            <DatePicker2
              showDatePicker={showEndDatePicker}
              hideDatePicker={hideEndDatePicker}
              isDatePickerVisible={isEndDatePickerVisible}
              handleDateChange={handleEndDateChange}
              handleDateValueChange={handleEndDateValChange}
              title={"대결 종료 일자"}
              inputText={"대결 종료 일자:"}
              showDayOfWeek={false}
            />
          </TouchableOpacity>
          <Text style={[styles.subText]}>
            * 시작 일자가 지나도 상대가 수락하지 않을 경우, 대결은 무효화됩니다.
          </Text>
          <Text style={styles.label}>대결 금액을 설정해 주세요</Text>
          <Input
            placeholder={"지출 금액"}
            inputValue={money}
            handleInputChange={handleMoneyChange}
          />
          <View style={styles.buttonContainer}>
            {isAllFieldsFilled ? (
              <LargeBtn text={"전송하기"} onClick={handlePost} />
            ) : (
              <LargeBtnDisable text={"전송하기"} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default SendMatch;
