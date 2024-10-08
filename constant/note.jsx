import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { styles } from "./note.styles";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input/input";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import Notice from "../components/Modal/notice";
import DatePicker from "../components/DatePicker/datePicker";
import LargeBtn from "../components/Btn/largeBtn";
import apiClient from "../api/apiClient";

const { width } = Dimensions.get("window");
const isLargeScreen = width > 375;

const Note = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { consumptionId } = route.params?.params ?? {};
  const { screen } = route.params?.params ?? {};
  console.log(consumptionId);
  console.log(screen);
  const inputURL = "/consumption";
  const [exists, setExists] = useState(false);
  const [buttonText, setButtonText] = useState("등록하기");
  const [isOpenNoticeMsg, setIsOpenNoticeMsg] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const [date, setDate] = useState("");
  const [place, setPlace] = useState("의류");
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const [moneyNumeric, setMoneyNumeric] = useState(0);

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

  // money 상태 변수 업데이트
  const handleMoneyChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    const numericValue = parseInt(cleanedText, 10) || 0;

    const formattedValue = numericValue.toLocaleString();
    setMoney(formattedValue);
    setMoneyNumeric(numericValue);
  };

  useEffect(() => {
    if (name && money && date) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [name, money, date]);

  // 절약 목표 세부 조회
  const fetchData = async () => {
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: {
          consumptionId: consumptionId,
        },
      });
      if (response.status === 200) {
        const Data = response.data.data[0];
        console.log("절약 목표 세부 조회", Data);
        const formattedValue = Data.money.toLocaleString();
        setExists(true);
        setButtonText("수정하기");
        setMoney(formattedValue);
        setMoneyNumeric(Data.money);
        setDate(Data.dateField);
        setPlace(Data.category);
        setName(Data.name);
      } else {
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      }
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  useEffect(() => {
    if (consumptionId) {
      fetchData();
    }
  }, [consumptionId]);

  const postData = async () => {
    try {
      const bodyData = {
        dateField: date,
        money: moneyNumeric,
        name: name,
        category: place,
      };
      console.log(bodyData);
      const response = await apiClient.post(inputURL, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log(response.data);

      // 성공 시 메시지 표시 및 데이터 초기화
      Alert.alert("", `지출을 등록하였습니다.`);
      setMoney("");
      setDate("");
      setName("");
      navigation.navigate("MainScreen", { screen: "Spending" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류: note", error.response.data);
        console.error("서버 응답 메세지:", error.message);
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      } else {
        console.error("에러:", error);
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      }
    }
  };

  // 지출 내역 수정
  const updateData = async () => {
    const url = `/consumption/${consumptionId}`;
    try {
      const bodyData = {
        dateField: date,
        money: moneyNumeric,
        name: name,
        category: place,
      };

      const response = await apiClient.put(url, bodyData, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      Alert.alert("", "지출 내역이 수정되었습니다.");
      // navigation.goBack();
      if (screen === "history") {
        navigation.replace("Spending", {
          screen: "Spending",
          params: {
            historyVal: true,
          },
        });
      } else {
        navigation.replace("Spending");
      }
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  const handlePost = () => {
    if (exists && consumptionId) {
      updateData();
    } else {
      postData();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeNoticeMsg} activeOpacity={1}>
        <ScrollView style={{ marginBottom: isLargeScreen ? 0 : 80 }}>
          <View style={styles.contentContainer}>
            {exists ? (
              <Text style={styles.headerText}>지출 내역 수정</Text>
            ) : (
              <Text style={styles.headerText}>지출 내역 추가</Text>
            )}
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
                initialDate={date}
                showDayOfWeek={false}
              />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              {isAllFieldsFilled ? (
                <LargeBtn text={buttonText} onClick={handlePost} />
              ) : (
                <LargeBtnDisable text={buttonText} />
              )}
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>
    </View>
  );
};

export default Note;
