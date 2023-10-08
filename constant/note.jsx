import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Input from "../components/Input/input";
import LargeBtnBasic from "../components/Btn/largeBtnBasic";
import axios from "axios";
import Notice from "../components/Modal/notice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../components/DatePicker/datePicker";

function Note({ navigation }) {
  const proxyUrl = "http://43.201.176.22:8080";
  const inputURL = "/consumption";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");

  const url = proxyUrl + cleanedURL;
  console.log("url:::", url);

  const [isOpenNoticeMsg, setIsOpenNoticeMsg] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [resetDate, setResetDate] = useState(true);

  const [date, setDate] = useState("");
  const [place, setPlace] = useState("의류");
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");

  console.log(date);
  console.log(name);
  console.log(money);
  console.log(place);

  const handleRadioClick = (value) => {
    setPlace(value);
  };

  const handleDateChange = (text) => {
    setDate(text);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleMoneyChange = (text) => {
    setMoney(text);
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

  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log("post 실행111");
    // console.log(access_token);
    try {
      const bodyData = {
        date_field: date,
        money: money,
        name: name,
        place: place,
      };

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("url:::::::", url);
      console.log(response);
      //   const data = await response.json();
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
    <TouchableOpacity onPress={closeNoticeMsg} activeOpacity={1}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>지출 내역 추가</Text>
          <Text style={styles.label}>어떤 이름으로 기록할까요?</Text>
          <Input placeholder={"지출 내용"} onInputChange={handleNameChange} />
          <View>
            {isOpenNoticeMsg && <Notice openNoticeMsg={openNoticeMsg} />}
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>어디에 쓰셨나요?</Text>
            <TouchableOpacity activeOpacity={1} onPress={openNoticeMsg}>
              {/* <TouchableOpacity activeOpacity={0.6} onPress={openLoserModal}> */}
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
          <Input placeholder={"지출 금액"} onInputChange={handleMoneyChange} />
          <Text style={styles.label}>언제 쓰셨나요?</Text>
          {/* <Input placeholder={"지출 일자"} onInputChange={handleDateChange} /> */}
          <TouchableOpacity onPress={showDatePicker}>
            <DatePicker
              showDatePicker={showDatePicker}
              hideDatePicker={hideDatePicker}
              isDatePickerVisible={isDatePickerVisible}
              handleDateChange={handleDateChange}
              // resetDate={resetDate}
            />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <LargeBtnBasic text={"등록하기"} onClick={handlePostApiTestStart} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
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
    // marginBottom: 8,
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
