import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { proxyUrl } from "./common";
import { useNavigation } from "@react-navigation/native";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import InputNickName from "../components/Input/inputNickname";
import LargeBtn from "../components/Btn/largeBtn";

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
    const inputURL = "/auth/nickname";
    const cleanedURL = inputURL.replace(/[\u200B]/g, "");

    const url = proxyUrl + cleanedURL;
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    console.log("별명을 등록합니다.");
    try {
      const params = {
        name: name,
      };

      const response = await axios.post(url, null, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        params,
      });

      if (response.status === 200) {
        alert("별명을 등록했습니다.");
        // navigation.replace("MainScreen", { screen: "Spending" });
      } else if (response.status === 403) {
        alert("이미 사용중인 닉네임입니다.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.status === 403) {
          alert(error.response.data.message);
        }
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  // 디바이스 토큰 api
  const postDeviceData = async () => {
    const inputURL = "/alarm";
    const url = proxyUrl + inputURL;
    console.log("디바이스 토큰 post 실행");

    const access_token = await AsyncStorage.getItem("access_token");
    const device_token = await AsyncStorage.getItem("device_token");
    try {
      const bodyData = {
        target_token: device_token,
      };
      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("디바이스 토큰 api", response);
      navigation.replace("MainScreen", { screen: "Spending" });
    } catch (error) {
      console.error("device token 에러:", error);
    }
  };

  const handlePostApiTestStart = () => {
    postData();
    postDeviceData();
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
          marginTop: 75,
          alignSelf: "center",
          width: 120,
          height: 170,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "#1F1F1F",
          marginTop: 40,
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
          marginTop: 8,
          fontSize: 12,
          fontWeight: 500,
          color: "#5C5C5C",
          textAlign: "left",
          paddingLeft: 12,
          marginBottom: 278,
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
