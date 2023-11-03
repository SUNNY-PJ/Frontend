import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Input from "../components/Input/input";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import axios from "axios";
import Notice from "../components/Modal/notice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../components/DatePicker/datePicker";
import { proxyUrl } from "./common";
import LargeBtn from "../components/Btn/largeBtn";

function Goal({ navigation }) {
  const inputURL = "/save";
  const url = proxyUrl + inputURL;

  const [isOpenNoticeMsg, setIsOpenNoticeMsg] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  console.log(date);
  console.log(name);
  console.log(cost);

  const handleDateChange = (text) => {
    setDate(text);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const openNoticeMsg = () => {
    setIsOpenNoticeMsg(!isOpenNoticeMsg);
  };

  const closeNoticeMsg = () => {
    setIsOpenNoticeMsg(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // 콤마(,)를 제거하고 숫자 형태로 파싱
  const formattedMoney = (value) => {
    const parsedValue = parseFloat(value.replace(/,/g, ""));

    // 숫자가 유효하면 포맷팅된 문자열 반환, 그렇지 않으면 빈 문자열 반환
    if (!isNaN(parsedValue)) {
      return parsedValue.toLocaleString();
    } else {
      return "";
    }
  };

  // cost 상태 변수 업데이트
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
    console.log("post 실행111");
    try {
      const bodyData = {
        start_date: date,
        end_date: date,
        cost: cost.replace(/,/g, ""),
        // name: name,
      };
      console.log(bodyData);

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("url:::::::", url);
      console.log(response);
      console.log("데이터:", response.data);

      navigation.navigate("FriendsList", { screen: "FriendsList" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const handlePostApiTestStart = () => {
    postData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeNoticeMsg} activeOpacity={1}>
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
              {isOpenNoticeMsg && <Notice openNoticeMsg={openNoticeMsg} />}
            </View>
            <Text style={styles.label}>지출 목표 금액을 입력해주세요</Text>
            <Input
              placeholder={"지출 금액"}
              inputValue={cost}
              handleInputChange={handleMoneyChange}
            />
            <Text style={styles.label}>언제 쓰셨나요?</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <DatePicker
                showDatePicker={showDatePicker}
                hideDatePicker={hideDatePicker}
                isDatePickerVisible={isDatePickerVisible}
                handleDateChange={handleDateChange}
              />
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
    marginBottom: 40,
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
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  noticeContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    top: 17,
  },
  noticeIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    marginBottom: 9,
    marginRight: 2,
  },
  noticeText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#5C5C5C",
  },
  buttonContainer: {
    marginTop: 40,
  },
});

export default Goal;
