import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Input from "../components/Input/input";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxyUrl } from "./common";
import LargeBtn from "../components/Btn/largeBtn";

function Note({ navigation }) {
  const inputURL = "/consumption";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");
  const url = proxyUrl + cleanedURL;
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const [date, setDate] = useState("");
  const [money, setMoney] = useState(0);
  const [message, setMessage] = useState("");
  const [reward, setReward] = useState("");

  const handleDateChange = (text) => {
    setDate(text);
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
    if (message && money && date) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [message, money, date, reward]);

  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const bodyData = {
       
      };

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        alert("지출을 등록하였습니다.");
        setMoney(0);
        setDate("");
        setReward("");
        setMessage("");
        navigation.navigate("MainScreen", { screen: "FreindsList" });
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

  const handlePost = () => {
    // postData();
  };

  return (
    <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>@@에게 대결 신청</Text>
            <Text style={styles.label}>친구를 도발해보세요!</Text>
            <Input
              placeholder={"도발 메시지"}
              inputValue={message}
              handleInputChange={handleMessageChange}
            /> 
            <Text style={styles.label}>무엇을 걸고 대결할까요?</Text>
            <Input
              placeholder={"대결 보상"}
              inputValue={reward}
              handleInputChange={handleRewardChange}
            />
            <Text style={styles.label}>대결 기간과 금액을 선택해주세요</Text>
               <Input
            placeholder={"대결 기간"}
            inputValue={date}
            handleInputChange={handleDateChange}
          />
          <Text style={styles.subText}>
            * 상대가 승낙한 시점부터 대결이 시작됩니다
          </Text>
            <Input
              placeholder={"지출 금액"}
              inputValue={money}
              handleInputChange={handleMoneyChange}
            />
            <View style={styles.buttonContainer}>
              {isAllFieldsFilled ? (
                <LargeBtn text={"등록하기"} onClick={handlePost} />
              ) : (
                <LargeBtnDisable text={"등록하기"} />
              )}
            </View>
          </View>
        </ScrollView>
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
 
  buttonContainer: {
    marginTop: 40,
  },  subText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#5C5C5C",
    paddingLeft: 10,
  },
});

export default Note;
