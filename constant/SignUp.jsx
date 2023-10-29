import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { proxyUrl } from "./common";
import { useNavigation } from "@react-navigation/native";
import LargeBtnDisable from "../components/Btn/largeBtnDisable";
import Input from "../components/Input/input";
import LargeBtn from "../components/Btn/largeBtn";

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  useEffect(() => {
    if (name) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [name]);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleNavigate = () => {
    navigation.navigate("Note", { screen: "Note" });
  };
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
      console.log("url:::::::", url);
      console.log(response);
      console.log("데이터:", response.data);

      navigation.navigate("Note", { screen: "Note" });
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
      <Input
        placeholder={"별명"}
        inputValue={name}
        handleInputChange={handleNameChange}
      />
      <Text
        style={{
          marginTop: 8,
          fontSize: 12,
          fontWeight: 500,
          color: "#1F1F1F",
          textAlign: "center",
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
