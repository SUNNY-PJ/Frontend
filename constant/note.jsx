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

function Note({ navigation }) {
  const inputURL = "/consumption";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");

  const url = proxyUrl + cleanedURL;

  const [isOpenNoticeMsg, setIsOpenNoticeMsg] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const [date, setDate] = useState("");
  const [place, setPlace] = useState("의류");
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");

  const handleRadioClick = (value) => {
    setPlace(value);
  };

  const handleDateChange = (formattedDate) => {
    setDate(formattedDate); // 상태 업데이트
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

  // money 상태 변수 업데이트
  const handleMoneyChange = (text) => {
    const cleanedText = text.replace(/[^0-9,]/g, "");
    const formattedValue = formattedMoney(cleanedText);
    setMoney(formattedValue);
  };

  useEffect(() => {
    if (name && money && date) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [name, money, date]);

  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const bodyData = {
        date_field: date,
        money: money.replace(/,/g, ""),
        name: name,
        category: place,
      };

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      // 성공 시 메시지 표시 및 데이터 초기화
      if (response.status === 200) {
        alert("지출을 등록하였습니다.");
        setMoney("");
        setDate("");
        setName("");
        navigation.navigate("MainScreen", { screen: "Statistics" }); // 필요에 따라 네비게이션 이동
      }
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
            <Text style={styles.headerText}>지출 내역 추가</Text>
            <Text style={styles.label}>어떤 이름으로 기록할까요?</Text>
            <Input
              placeholder={"지출 내용"}
              inputValue={name}
              handleInputChange={handleNameChange}
            />
            <View>
              {isOpenNoticeMsg && <Notice openNoticeMsg={openNoticeMsg} />}
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>어디에 쓰셨나요?</Text>
              <TouchableOpacity activeOpacity={1} onPress={openNoticeMsg}>
                <View style={styles.noticeContainer}>
                  <Image
                    source={require("../assets/notice.png")}
                    style={styles.noticeIcon}
                  />
                  <Text style={styles.noticeText}>구분 기준</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleRadioClick("의류")}
                style={styles.radioContainer}
              >
                <Image
                  source={
                    place === "의류"
                      ? require("../assets/RadioBtnT.png")
                      : require("../assets/RadioBtnF.png")
                  }
                  style={styles.radioIcon}
                />
                <Text style={styles.radioText}>의류</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleRadioClick("식생활")}
                style={styles.radioContainer}
              >
                <Image
                  source={
                    place === "식생활"
                      ? require("../assets/RadioBtnT.png")
                      : require("../assets/RadioBtnF.png")
                  }
                  style={styles.radioIcon}
                />
                <Text style={styles.radioText}>식생활</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleRadioClick("주거")}
                style={styles.radioContainer}
              >
                <Image
                  activeOpacity={0.6}
                  source={
                    place === "주거"
                      ? require("../assets/RadioBtnT.png")
                      : require("../assets/RadioBtnF.png")
                  }
                  style={styles.radioIcon}
                />
                <Text style={styles.radioText}>주거</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleRadioClick("기타")}
                style={styles.radioContainer}
              >
                <Image
                  source={
                    place === "기타"
                      ? require("../assets/RadioBtnT.png")
                      : require("../assets/RadioBtnF.png")
                  }
                  style={styles.radioIcon}
                />
                <Text style={styles.radioText}>기타</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>얼마를 쓰셨나요?</Text>
            <Input
              placeholder={"지출 금액"}
              inputValue={money}
              handleInputChange={handleMoneyChange}
            />
            <Text style={styles.label}>언제 쓰셨나요?</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <DatePicker
                showDatePicker={showDatePicker}
                hideDatePicker={hideDatePicker}
                isDatePickerVisible={isDatePickerVisible}
                handleDateChange={handleDateChange}
                title={"지출 일자"}
                showDayOfWeek={false}
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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C5C5C",
  },
  radioIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 40,
  },
});

export default Note;
