import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import InputNickName from "../components/Input/inputNickname";
import LargeBtn from "../components/Btn/largeBtn";
import apiClient from "../api/apiClient";
const windowWidth = Dimensions.get("window").width;
const baseWidth = 390;
const isIphone7 = windowWidth < baseWidth;

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const [isValidName, setIsValidName] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleValidation = (isValid) => {
    setIsValidName(isValid);
  };

  useEffect(() => {
    setIsAllFieldsFilled(isValidName);
  }, [isValidName]);

  const postData = async () => {
    const inputURL = "/apple/auth/nickname";
    try {
      const params = {
        name: name,
      };
      const response = await apiClient.post(inputURL, null, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params,
      });

      if (response.data.status === 200) {
        Alert.alert("", "별명을 등록했습니다.");
        postDeviceData();
        navigation.replace("MainScreen", { screen: "Spending" });
      } else if (response.data.status === 403) {
        Alert.alert("", "이미 사용중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("서버 응답 오류: signUp", error.response.data);
      Alert.alert("error", "서버에 장애가 발생하였습니다.");

      if (error.response.status === 403) {
        Alert.alert("", "이미 사용중인 닉네임입니다.");
      }
    }
  };

  // 디바이스 토큰 api
  const postDeviceData = async () => {
    const inputURL = "/alarm";
    const device_token = await AsyncStorage.getItem("device_token");
    try {
      const bodyData = {
        target_token: device_token,
      };
      const response = await apiClient.post(inputURL, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("디바이스 토큰 api", response.data);
      // navigation.replace("MainScreen", { screen: "Spending" });
    } catch (error) {
      console.error("device token 에러:", error);
    }
  };

  const handlePostApiTestStart = () => {
    postData();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
        paddingLeft: 28,
        paddingRight: 27,
      }}
    >
      <Image
        source={require("../assets/SUNNY.png")}
        style={{
          marginTop: isIphone7 ? 55 : 75,
          alignSelf: "center",
          width: isIphone7 ? 100 : 120,
          height: isIphone7 ? 150 : 170,
        }}
      />
      <Text
        style={{
          fontSize: isIphone7 ? 14 : 16,
          color: "#1F1F1F",
          fontFamily: "SUITE_Medium",
          marginTop: isIphone7 ? 30 : 40,
          alignSelf: "center",
          marginBottom: 16,
        }}
      >
        써니에서 사용할 별명을 설정해주세요
      </Text>
      <InputNickName
        placeholder={"별명"}
        inputValue={name}
        handleInputChange={handleNameChange}
        onValidation={handleValidation}
      />
      <Text
        style={{
          marginTop: isIphone7 ? 6 : 8,
          fontSize: isIphone7 ? 10 : 12,
          fontFamily: "SUITE_Medium",
          color: "#5C5C5C",
          textAlign: "left",
          paddingLeft: 12,
          marginBottom: isIphone7 ? 180 : 278,
        }}
      >
        * 2~10자 이내, 특수문자 및 숫자 사용 가능, 이모지 사용 불가
      </Text>
      {isAllFieldsFilled ? (
        <LargeBtn text={"시작하기"} onClick={handlePostApiTestStart} />
      ) : (
        <LargeBtnDisable text={"시작하기"} />
      )}
    </View>
  );
};

export default SignUp;
