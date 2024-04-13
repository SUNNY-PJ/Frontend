import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input/input";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import Notice from "../components/Modal/notice";
import DatePicker from "../components/DatePicker/datePicker";
import LargeBtn from "../components/Btn/largeBtn";
import apiClient from "../api/apiClient";

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
        date_field: date,
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
      if (response.status === 200 || response.status === 204) {
        if (response.data.status === 400) {
          Alert.alert(
            "error",
            `서버 장애가 발생했습니다.\n관리자에게 문의 바랍니다.`
          );
        } else {
          Alert.alert("", `지출을 등록하였습니다.`);
          setMoney("");
          setDate("");
          setName("");
          navigation.navigate("MainScreen", { screen: "Spending" });
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
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
        date_field: date,
        money: moneyNumeric,
        name: name,
        category: place,
      };

      const response = await apiClient.patch(url, bodyData, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      if (response.status === 200 || response.status === 204) {
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
      } else {
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
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
        <ScrollView>
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
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "SUITE_Medium",
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
    fontFamily: "SUITE",
    color: "#5C5C5C",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioText: {
    fontSize: 16,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
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
