import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { proxyUrl } from "../../constant/common";
import Input from "../../components/Input/input";
import LargeBtn from "../../components/Btn/largeBtn";
import LargeBtnDisable from "../../components/Btn/largeBtnDisable";
import { useNavigation } from "@react-navigation/native";

const SettingProfile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
  };

  const postData = async () => {
    const inputURL = "/auth/nickname";
    const cleanedURL = inputURL.replace(/[\u200B]/g, "");

    const url = proxyUrl + cleanedURL;
    const access_token = await AsyncStorage.getItem("access_token");
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
      alert("닉네임을 변경했습니다.");
      navigation.navigate("MyPage", { screen: "MyPage" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const handlePostApiStart = () => {
    postData();
  };

  useEffect(() => {
    if (name) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [name]);

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyPage", {
              screen: "MyPage",
            })
          }
        >
          <Image
            source={require("../../assets/prevBtn.png")}
            style={{ width: 24, height: 24, marginTop: 16 }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          color: "#1F1F1F",
          fontWeight: 700,
          alignSelf: "center",
          bottom: 17,
        }}
      >
        프로필 설정
      </Text>
      <Image
        source={require("../../assets/myPage_profile.png")}
        style={{ width: 56, height: 56, alignSelf: "center", marginBottom: 28 }}
      />
      <View style={styles.contentContainer}>
        <Text
          style={{
            paddingLeft: 12,
            fontSize: 16,
            color: "#1F1F1F",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          닉네임
        </Text>
        <Input
          placeholder={"별명"}
          inputValue={name}
          handleInputChange={handleNameChange}
        />
        <View style={{ marginTop: 323 }}>
          {isAllFieldsFilled ? (
            <LargeBtn text={"저장하기"} onClick={handlePostApiStart} />
          ) : (
            <LargeBtnDisable text={"저장하기"} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    paddingLeft: 28,
    paddingRight: 27,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  name: { fontSize: 20, color: "#1F1F1F", fontWeight: 500 },
  setting: {
    fontSize: 16,
    color: "#5C5C5C",
    fontWeight: 600,
  },
  title: {
    fontSize: 16,
    color: "#1F1F1F",
    fontWeight: 900,
    paddingLeft: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
});

export default SettingProfile;
